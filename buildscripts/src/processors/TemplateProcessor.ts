import path from "path";
import { getCachedReaderSync, readFileTextSync } from "../utils";
import marked from "marked";
import handlebars, { SafeString } from "handlebars";

const compile_template = (path: string, cache: { [key: string]: any }) =>
    cache[path] ??= handlebars.compile(readFileTextSync(path));
const safe_str = (s: string) => new SafeString(s);

export function TemplateProcessor(config: any = {}) {
    const md_matcher = /^:md\((?<path>.*)\)$/;
    const __resolv = (p: string) => path.join(config.base, p);
    let readerCache = {};
    let templateCache = {};
    let reader = getCachedReaderSync(readerCache);
    const part_resolver = (part_name: string) => {
        let result = md_matcher.exec(part_name);
        if (result)
            return marked(reader[__resolv(result.groups!["path"])]);
        return reader[__resolv(part_name)];
    };

    return async function (state: FileState) {
        const handlebars_helpers = {
            md(path: string) {
                return safe_str(marked(reader[__resolv(path)]));
            },
            inc(path: string) {
                let tmpl = compile_template(__resolv(path), templateCache);
                return safe_str(tmpl(state.extInfo.viewData, {
                    helpers: handlebars_helpers
                }));
            },
        };
        let tmpl = handlebars.compile(state.content)
        state.content = tmpl(state.extInfo.viewData, {
            helpers: handlebars_helpers
        });
        return state;
    };
}