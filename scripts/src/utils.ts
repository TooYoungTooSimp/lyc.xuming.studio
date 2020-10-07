import { promises as fs, constants as fs_constants, readFileSync } from "fs";
import path from "path";
import { glob } from "glob";
import { promisify } from "util";

export const readFileText = async (file: string) => fs.readFile(file, { encoding: "utf-8" });
export const readFileTextSync = (file: string) => readFileSync(file, { encoding: "utf-8" });
export const pathExist = async (pth: string) =>
    fs.access(pth, fs_constants.F_OK).then(() => true).catch(() => false);

export const changeExt = (file: string, newExt: string) =>
    path.join(path.dirname(file), path.basename(file, path.extname(file)) + newExt);

export const getCachedReaderSync = (cache: Object) =>
    new Proxy(cache, {
        get: (obj: any, prop: string) =>
            obj[prop] ??= readFileTextSync(prop)
    });

export const getCachedReaderAsync = (cache: Object) =>
    new Proxy(cache, {
        get: async (obj: any, prop: string) =>
            obj[prop] ??= await readFileText(prop)
    });

export async function mkdirSafe(pth: string) {
    if (!await pathExist(pth))
        await fs.mkdir(pth, { recursive: true });
}

export async function ensureFileWrite(pth: string) {
    await mkdirSafe(path.dirname(pth));
}

export const AsyncIdentityFunc = async <T>(arg: T) => arg;

export const IdentityFunc = <T>(arg: T) => arg;

export const globAsync = promisify(glob);

export const numPadStart = (x: number, padding: number) => x.toString().padStart(padding);