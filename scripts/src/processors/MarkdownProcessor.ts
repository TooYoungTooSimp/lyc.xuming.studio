import config from "../config";
import { changeExt, getCachedReaderAsync, getCachedReaderSync, readFileText, readFileTextSync } from "../utils";
import yaml from "js-yaml";
import path from "path";
import marked from "marked";

function readTmplConfig(config: any) {
    let cfg = JSON.parse(readFileTextSync(config.path()));
    Object.keys(cfg).forEach(k => {
        cfg[k] = path.join(config.base, cfg[k]);
    });
    return cfg;
}


async function splitMarkdown(content: string) {
    const yaml_block_matcher = /^[-+*]{3}\r?\n(.*?)\r?\n[-+*]{3}$\r?\n/gsm;
    let result = yaml_block_matcher.exec(content);
    return result
        ? {
            meta: yaml.load(result[1]) as any,
            content: content.slice(result.index + result[0].length)
        }
        : {
            meta: null,
            content
        };
}


export function MarkdownProcessor(config: any = {}): FileProcessor {
    let readerCache = {};
    let reader = getCachedReaderAsync(readerCache);
    let tmplConfig = readTmplConfig(config);
    return async function (stat: FileState) {
        stat.target = changeExt(stat.target, ".html");
        let res = await splitMarkdown(stat.content!);
        if (!res.meta) return {
            ...stat,
            drop: true,
        };
        stat.extInfo.meta = res.meta;
        stat.extInfo.viewData = {
            ...res.meta,
            body: marked(res.content)
        };
        stat.content = await reader[tmplConfig[res.meta.template]];
        return stat;
    };
}