import CleanCSS from "clean-css";

export function MinifyCSSProcessor(config: any = {}): FileProcessor {
    const minifier = new CleanCSS({ level: 2 });
    return async function (stat: FileState) {
        stat.content = minifier.minify(stat.content!).styles;
        return stat;
    };
}