import config from "./config";
import { join } from "path";
import { globAsync, numPadStart } from "./utils";
import winston from "winston";
import { dispatchWorks } from "./dispatcher";

async function main() {
    let logger = winston.createLogger({
        level: "info",
        transports: [
            new winston.transports.Console({
                format: winston.format.combine(
                    winston.format.timestamp({
                        format: "YYYY-MM-DD HH:mm:ss"
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
    let fileList = await globAsync("**/*", {
        cwd: config.srcDir,
        nodir: true,
        ignore: config.internalPaths,
    });
    let fileIndex = 0, fileCount = fileList.length;
    let numDispIdent = Math.ceil(Math.log10(fileList.length));
    /*await Promise.all(fileList.map(async item => {
        await processFile({
            path: path.join(config.srcDir, item),
            target: path.join(config.dstDir, item),
            extInfo: {},
            drop: false,
        });
        logger.info(`[${numPadStart(++fileIndex, numDispIdent)} / ${fileCount}] processed file ${item}`);
    }));*/
    dispatchWorks(
        join(__dirname, "processFileWorker.js"),
        fileList.map(item => ({
            path: join(config.srcDir, item),
            target: join(config.dstDir, item),
            extInfo: {
                item
            },
            drop: false,
        })),
        (m) => {
            logger.info(`[${numPadStart(++fileIndex, numDispIdent)} / ${fileCount}] Thread[${numPadStart(m.extInfo.tid, 2)}] processed file ${m.extInfo.item}`);
        },
        (e) => {
            logger.error(`[${numPadStart(++fileIndex, numDispIdent)} / ${fileCount}] throws:\n${e}`);
        }
    );
}

main();