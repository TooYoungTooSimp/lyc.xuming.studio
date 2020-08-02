import fs from "fs/promises"
export default function CopyFileProcessor(config: any = {}) {
    return async function (file: FileState) {
        await fs.copyFile(file.path, file.target);
        return file;
    }
}