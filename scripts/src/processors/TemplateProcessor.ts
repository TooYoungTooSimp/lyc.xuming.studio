import path from "path";
import mustache from "mustache";
import { getCachedReaderSync, readFileText, readFileTextSync } from "../utils";
import marked from "marked";


export function TemplateProcessor(config: any = {}) {
    const md_matcher = /^:md\((?<path>.*)\)$/;
    const __resolv = (p: string) => path.join(config.base, p);
    let readerCache = {};
    let reader = getCachedReaderSync(readerCache);
    const part_resolver = (part_name: string) => {
        let result = md_matcher.exec(part_name);
        if (result) {
            return marked(reader[__resolv(result.groups!["path"])]);
        }
        return reader[__resolv(part_name)];
    };
    return async function (state: FileState) {
        state.content = mustache.render(state.content!, state.extInfo.viewData, part_resolver);
        return state;
    };
}