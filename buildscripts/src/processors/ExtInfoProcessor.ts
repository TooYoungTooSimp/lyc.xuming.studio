export function ExtInfoProcessor(fn: IdentityFuncType<any>): FileProcessor {
    return async function (stat: FileState) {
        stat.extInfo = fn(stat.extInfo);
        return stat;
    };
}