import { promises as fs, constants as fs_constants } from "fs"
import path from "path";
import yaml from "js-yaml";
import { readFileSync } from "fs";

export const readFileText = async (file: string) => fs.readFile(file, { encoding: "utf-8" });
export const readFileTextSync = (file: string) => readFileSync(file, { encoding: "utf-8" });
export const pathExist = async (pth: string) =>
    fs.access(pth, fs_constants.F_OK)
        .then(() => true)
        .catch(() => false)

export const changeExt = (file: string, newExt: string) =>
    path.join(path.dirname(file), path.basename(file, path.extname(file)) + newExt);

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

export function getCachedReaderAsync(cache: Object) {
    const handler = {
        async get(obj: any, prop: string) {
            if (!obj[prop])
                obj[prop] = await readFileText(prop);
            return obj[prop];
        }
    };
    return new Proxy(cache, handler);
}



export async function mkdirSafe(pth: string) {
    if (!await pathExist(pth))
        await fs.mkdir(pth, { recursive: true });
}

export async function ensureFileCopy(pth: string) {
    await mkdirSafe(path.dirname(pth));
}

export const AsyncIdentityFunc = async (arg: any) => arg;
