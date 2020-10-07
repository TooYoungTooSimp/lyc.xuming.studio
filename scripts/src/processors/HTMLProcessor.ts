import { changeExt } from "../utils";
import { minify as html_minify } from "html-minifier-terser";

const minifyHTML = (content: string) =>
    html_minify(content, {
        caseSensitive: true,
        collapseBooleanAttributes: true,
        collapseInlineTagWhitespace: true,
        collapseWhitespace: true,
        minifyCSS: true,
        minifyJS: true,
        minifyURLs: true,
        removeAttributeQuotes: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        removeTagWhitespace: true,
        sortAttributes: true,
        sortClassName: true,
        trimCustomFragments: true,
        useShortDoctype: true,

    });

export function HTMLProcessor(config: any = {}) {
    return async function (state: FileState) {
        if (config.minify)
            state.content = minifyHTML(state.content!);
        return state;
    };
}