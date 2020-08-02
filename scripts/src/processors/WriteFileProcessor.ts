import { writeFile } from "fs/promises";
export default function WriteFileProcessor(config: any = {}) {
    return async function (stat: FileState) {
        await writeFile(stat.target, stat.content!);
        return stat;
    }
}