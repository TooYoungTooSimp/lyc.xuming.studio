import { extname, join, relative } from "path";
import HTMLProcessor from "./processors/HTMLProcessor";
import CopyFileProcessor from "./processors/CopyFileProcessor";
import MarkdownProcessor from "./processors/MarkdownProcessor";
import ReadFileProcessor from "./processors/ReadFileProcessor";
import WriteFileProcessor from "./processors/WriteFileProcessor";
import TemplateProcessor from "./processors/TemplateProcessor";
import { AsyncIdentityFunc } from "./utils";

let config = {
    srcDir: "./src",
    dstDir: "./dist",
    preserveMarkdown: false,
    internalPaths: [
        "template"
    ],
};

let htmlWithTmplList = [
    "index.html"
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
}

let rules: ProcessRules = [
    {
        test: path => extname(path) === '.md',
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
        test: path => htmlWithTmplList.includes(relative(config.srcDir, path)),
        use: [
            procs.ReadFile,
            procs.Template,
            procs.HTML,
            procs.WriteFile,
        ]
    },
    {
        test: path => ['.htm', '.html'].includes(extname(path)),
        use: [
            procs.ReadFile,
            procs.HTML,
            procs.WriteFile,
        ],
    },
    {
        test: path => extname(path) === '.js',
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
}