import { join } from "path";
export default {
    srcDir: "./src",
    dstDir: "./dist",
    preserveMarkdown: false,
    tmplConfig: {
        path() { return join(this.base, this.file); },
        base: "./src/template",
        file: "templates.json",
    },
    internalPaths: [
        "template"
    ],
    forceTransformList: [
        "index.html"
    ],
    minify: {
        js: true,
        css: true,
        html: true,
    }
};