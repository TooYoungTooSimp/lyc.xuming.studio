import { promises as fs, constants as fs_constants } from "fs"
import path from "path";
import yaml from "js-yaml";
import { readFileSync } from "fs";
import { async } from "q";

export const readFileText = async (file: string) => fs.readFile(file, { encoding: "utf-8" });
export const readFileTextSync = (file: string) => readFileSync(file, { encoding: "utf-8" });
export const pathExist = async (pth: string) =>
    fs.access(pth, fs_constants.F_OK)
        .then(() => true)
        .catch(() => false)

export const changeExt = (file: string, newExt: string) =>
    path.join(path.dirname(file), path.basename(file, path.extname(file)) + newExt);
export async function splitMarkdown(file: string) {
    let content = await readFileText(file);
    const yaml_block_matcher = /^[-+*]{3}\r?\n(.*?)\r?\n[-+*]{3}$\r?\n/gsm;
    let result = yaml_block_matcher.exec(content);
    return result
        ? {
            meta: yaml.safeLoad(result[1]) as any,
            content: content.slice(result.index + result[0].length)
        }
        : {
            meta: null,
            content
        };
}

export function getCachedReaderSync(cache: Object) {
    const handler = {
        get(obj: any, prop: string) {
            if (!obj[prop])
                obj[prop] = readFileTextSync(prop);
            return obj[prop];
        }
    };
    return new Proxy(cache, handler);
}

export async function mkdirSafe(pth: string) {
    if (!await pathExist(pth))
        await fs.mkdir(pth, { recursive: true });
}