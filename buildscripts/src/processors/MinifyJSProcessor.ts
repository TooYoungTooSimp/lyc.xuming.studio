import { minify } from "terser";

export function MinifyJSProcessor(config: any = {}): FileProcessor {
    return async function (stat: FileState) {
        stat.content = await minify(stat.content!).then(x => x.code);
        return stat;
    };
}