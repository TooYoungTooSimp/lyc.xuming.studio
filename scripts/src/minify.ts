import { minify as html_minify } from "html-minifier-terser";
import { minify as js_minify } from "uglify-js";

export const minifyHTML = (content: string) =>
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

export const minifyJS = (js: string) =>
    js_minify(js, {
    }).code ?? "";

export const minifyJSON = (json: string) => JSON.stringify(JSON.parse(json));