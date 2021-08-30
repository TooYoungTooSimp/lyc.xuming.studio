import * as esbuild from "esbuild";
import { changeExt } from "../utils";
export function BuildTypeScript(config: any = { }): FileProcessor {
    return async function (stat: FileState) {
        stat.drop = true;
        if (stat.content!.startsWith("// @entrypoint")) {
            stat.target = changeExt(stat.target, ".js");
            await esbuild.build({
                entryPoints: [stat.path],
                bundle: true,
                minify: true,
                outfile: stat.target
            });
        }
        return stat;
    };
}