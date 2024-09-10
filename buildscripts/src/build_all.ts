import config from "./config";
import { join } from "path";
import { numPadStart } from "./utils";
import { glob } from "glob";
import { dispatchWorks } from "./dispatcher";
import dayjs from 'dayjs';
import { getLogger } from "./logger";

async function main() {
    let logger = getLogger();
    let fileList = await glob("**/*", {
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
    let startTime = dayjs();
    const unix0 = dayjs(0);
    await dispatchWorks(
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
            logger.info(`[${numPadStart(++fileIndex, numDispIdent)} / ${fileCount}] Thread[${numPadStart(m.extInfo.tid, 2)}] processed file ${m.extInfo.item} (${dayjs().diff(unix0, "ms") - m.extInfo.time}ms)`);
        },
        (e) => {
            logger.error(`[${numPadStart(++fileIndex, numDispIdent)} / ${fileCount}] Thread[${numPadStart(e.tid, 2)}] throws:\n${e.stack}`);
        }
    );
    logger.info(`Build finished. Used ${dayjs().diff(startTime, "ms") / 1000}s`);
}

main();