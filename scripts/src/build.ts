import config from "./config"
import fs from "fs/promises"
import path from "path";
import { getCachedReaderSync, mkdirSafe, readFileText } from "./utils";
import winston from "winston";
import processFile from "./process";


async function main() {
    global.ext = {
        logger: winston.createLogger({
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
        })
    };


    await mkdirSafe(config.dstDir);
    await walkDir(config.srcDir);
}


async function walkDir(curDir: string) {
    let content = (await fs.readdir(curDir)).map(i => path.join(curDir, i));
    content.forEach(async item => {
        let itemStat = await fs.lstat(item);
        let target = path.join(config.dstDir, path.relative(config.srcDir, item));
        if (itemStat.isDirectory()) {
            if (config.internalPaths.includes(path.basename(item))) return;
            await mkdirSafe(target);
            walkDir(item);
        }
        if (itemStat.isFile()) {
            let curFile: FileState = {
                path: item,
                extInfo: {},
                target,
            };
            await processFile(curFile);
            global.ext.logger.info(`processed file ${item}`);
        }
    });
}


main();