import dayjs from "dayjs";
import { extname, join, relative, sep } from "path";
import {
    ExtInfoProcessor,
    CopyFileProcessor,
    HTMLProcessor,
    MarkdownProcessor,
    MinifyCSSProcessor,
    MinifyJSProcessor,
    ReadFileProcessor,
    TemplateProcessor,
    WriteFileProcessor,
    BuildTypeScript
} from "./processors/_index";

import { AsyncIdentityFunc } from "./utils";

let config = {
    srcDir: "./wwwroot",
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
const unix0 = dayjs(0);
let procs = {
    HTML: HTMLProcessor({
        minify: true,
    }),
    CopyFile: CopyFileProcessor(),
    ReadFile: ReadFileProcessor(),
    Markdown: MarkdownProcessor({
        path() { return join(this.base, this.file); },
        base: "./wwwroot/template",
        file: "templates.json",
    }),
    Template: TemplateProcessor({
        base: "./wwwroot",
    }),
    WriteFile: WriteFileProcessor(),
    MinifyJS: MinifyJSProcessor(),
    MinifyCSS: MinifyCSSProcessor(),
    BuildTypeScript: BuildTypeScript(),
    BeginTime: ExtInfoProcessor(e => ({ ...e, time: dayjs().diff(unix0, "ms") }))
};

let rules: ProcessRules = [
    {
        test: path => extname(path) === ".md",
        use: [
            procs.BeginTime,
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
            procs.BeginTime,
            procs.ReadFile,
            procs.Template,
            procs.HTML,
            procs.WriteFile,
        ]
    },
    {
        test: path => [".htm", ".html"].includes(extname(path)),
        use: [
            procs.BeginTime,
            procs.ReadFile,
            procs.HTML,
            procs.WriteFile,
        ],
    },
    {
        test: path => extname(path) === ".js",
        use: [
            procs.BeginTime,
            procs.ReadFile,
            procs.MinifyJS,
            procs.WriteFile,
        ],
    },
    {
        test: path => extname(path) === ".ts",
        use: [
            procs.BeginTime,
            procs.ReadFile,
            procs.BuildTypeScript,
        ],
    },
    {
        test: path => extname(path) === ".css",
        use: [
            procs.BeginTime,
            procs.ReadFile,
            procs.MinifyCSS,
            procs.WriteFile,
        ],
    },
    {
        test: _path => true,
        use: [
            procs.BeginTime,
            procs.CopyFile,
        ],
    },
];

export default {
    ...config,
    rules,
};