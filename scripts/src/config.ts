import { extname, join, relative, sep } from "path";
import { CopyFileProcessor, HTMLProcessor, MarkdownProcessor, ReadFileProcessor, TemplateProcessor, WriteFileProcessor } from "./processors/index";

import { AsyncIdentityFunc } from "./utils";

let config = {
    srcDir: "./src",
    dstDir: "./dist",
    preserveMarkdown: false,
    internalPaths: [
        "template/**/*"
    ],
};

let htmlWithTmplList = [
    "index.html",
    "index/index.html",
];

let procs = {
    HTML: HTMLProcessor({
        minify: true,
    }),
    CopyFile: CopyFileProcessor(),
    ReadFile: ReadFileProcessor(),
    Markdown: MarkdownProcessor({
        path() { return join(this.base, this.file); },
        base: "./src/template",
        file: "templates.json",
    }),
    Template: TemplateProcessor({
        base: "./src",
    }),
    WriteFile: WriteFileProcessor(),
};

let rules: ProcessRules = [
    {
        test: path => extname(path) === ".md",
        use: [
            config.preserveMarkdown ? procs.CopyFile : AsyncIdentityFunc,
            procs.ReadFile,
            procs.Markdown,
            procs.Template,
            procs.HTML,
            procs.WriteFile,
        ],
    },
    {
        test: path => htmlWithTmplList.includes(relative(config.srcDir, path).replace(sep, "/")),
        use: [
            procs.ReadFile,
            procs.Template,
            procs.HTML,
            procs.WriteFile,
        ]
    },
    {
        test: path => [".htm", ".html"].includes(extname(path)),
        use: [
            procs.ReadFile,
            procs.HTML,
            procs.WriteFile,
        ],
    },
    {
        test: path => extname(path) === ".js",
        use: [
            procs.ReadFile,
            procs.WriteFile,
        ],
    },
    {
        test: _path => true,
        use: [
            procs.CopyFile,
        ],
    },
];

export default {
    ...config,
    rules,
};