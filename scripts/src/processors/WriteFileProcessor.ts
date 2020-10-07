import { writeFile } from "fs/promises";
import { ensureFileWrite } from "../utils";
export function WriteFileProcessor(config: any = {}) {
    return async function (stat: FileState) {
        await ensureFileWrite(stat.target);
        await writeFile(stat.target, stat.content!);
        return stat;
    };
}