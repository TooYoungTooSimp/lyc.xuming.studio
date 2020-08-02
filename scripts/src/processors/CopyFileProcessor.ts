import fs from "fs/promises"
import { ensureFileWrite } from "../utils";
export default function CopyFileProcessor(config: any = {}) {
    return async function (file: FileState) {
        await ensureFileWrite(file.target);
        await fs.copyFile(file.path, file.target);
        return file;
    }
}