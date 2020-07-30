import mustache from "mustache";
import config from "./config"
import fs from "fs/promises"
import path from "path";
import marked from "marked";
import { changeExt, getCachedReaderSync, readFileText, splitMarkdown } from "./utils";
import { minifyHTML, minifyJS, minifyJSON } from "./minify";
import winston, { loggers } from "winston";
import { minify } from "uglify-js";
import filetypes from "./filetypes";

let global: any = {};

async function main() {
    global.logger = winston.createLogger({
        level: "info",
        transports: [
            new winston.transports.Console({
                format: winston.format.combine(
                    winston.format.timestamp({
                        format: 'YYYY-MM-DD HH:mm:ss'
                    }),
                    winston.format.errors({ stack: true }),
                    winston.format.colorize(),
                    winston.format.splat(),
                    winston.format.printf(({ level, message, timestamp }) =>
                        `${timestamp} [${level}] : ${message}`
                    )
                )
            })
        ]
    });
    global.tmplConfig = JSON.parse(await readFileText(config.tmplConfig.path()));
    Object.keys(global.tmplConfig).forEach(k => {
        global.tmplConfig[k] = path.join(config.tmplConfig.base, global.tmplConfig[k])
    });
    global.reader = getCachedReaderSync({});
    await walkDir(config.srcDir);
}


async function walkDir(curDir: string) {
    let content = (await fs.readdir(curDir)).map(i => path.join(curDir, i));
    content.forEach(async item => {
        let itemStat = await fs.lstat(item);
        let target = path.join(config.dstDir, path.relative(config.srcDir, item));
        if (itemStat.isDirectory()) {
            if (config.internalPaths.includes(path.basename(item))) return;
            await fs.mkdir(target, { recursive: true });
            walkDir(item);
        }
        if (itemStat.isFile()) {
            let copyThisFile = true;
            let forceTransform = config.forceTransformList.includes(path.relative(config.srcDir, item));
            if (path.extname(item) === ".md" || forceTransform) {
                global.logger.info(`transform markdown ${item}`);
                copyThisFile = config.preserveMarkdown && !forceTransform;
                target = changeExt(target, ".html");
                await fs.writeFile(target, minifyHTML(await processMarkdown(item)));
            }
            if (filetypes.isHTML(item) && !forceTransform) {
                global.logger.info(`compress html ${item}`);
                copyThisFile = false;
                await fs.writeFile(target, minifyHTML(await readFileText(item)));
            }
            if (filetypes.isJS(item)) {
                global.logger.info(`compress js ${item}`);
                copyThisFile = false;
                await fs.writeFile(target, minifyJS(await readFileText(item)));
            }
            if (filetypes.isJSON(item)) {
                global.logger.info(`compress json ${item}`);
                copyThisFile = false;
                await fs.writeFile(target, minifyJSON(await readFileText(item)));
            }
            if (copyThisFile) {
                global.logger.info(`copy file ${item}`);
                await fs.copyFile(item, target);
            }
            global.logger.info(`processed file ${item}`);
        }
    });
}

async function processMarkdown(file: string) {
    const part_resolver = (part_name: string) => reader[path.join(config.srcDir, part_name)];
    let reader = global.reader;
    let result = await splitMarkdown(file);
    if (!result.meta) {
        return mustache.render(result.content, null, part_resolver);
    }
    let tmpl = reader[global.tmplConfig[result.meta.template]];
    return mustache.render(tmpl, {
        title: result.meta.title,
        body: marked(result.content),
    }, part_resolver);
}

main();