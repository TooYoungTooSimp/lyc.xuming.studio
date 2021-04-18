import config from "./config";
import { join } from "path";
import { numPadStart } from "./utils";
import { dispatchWorks } from "./dispatcher";
import dayjs from 'dayjs';
import { argv } from "process";
import assert from "assert";
import { getLogger } from "./logger";


async function main() {
    assert(argv.length >= 3);
    let logger = getLogger();
    let fileList = argv.slice(2);
    let startTime = dayjs();
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
            logger.info(`Thread[${numPadStart(m.extInfo.tid, 2)}] processed file ${m.extInfo.item}`);
        },
        (e) => {
            logger.error(`Thread[${numPadStart(e.tid, 2)}] throws:\n${e.stack}`);
        }
    );
    logger.info(`Build finished. Used ${dayjs().diff(startTime, "ms") / 1000}s`);
}

main()