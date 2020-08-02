import { readFileText } from "../utils";

export default function ReadFileProcessor(config: any = {}) {
    return async function (stat: FileState) {
        stat.content = await readFileText(stat.path);
        return stat;
    }
}