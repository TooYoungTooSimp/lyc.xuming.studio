import path from "path";
import mustache from "mustache";
import { getCachedReaderSync, readFileText, readFileTextSync } from "../utils";


export default function TemplateProcessor(config: any = {}) {
    let readerCache = {};
    let reader = getCachedReaderSync(readerCache);
    const part_resolver = (part_name: string) => reader[path.join(config.base, part_name)];
    return async function (state: FileState) {
        state.content = mustache.render(state.content!, state.extInfo.viewData, part_resolver);
        return state;
    }
}