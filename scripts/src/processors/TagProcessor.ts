function mergeTagData(tagData: any, markdownMetadata: any) {
    tagData = {
        ...tagData,
        ...markdownMetadata,
    };
}

export function TagProcessor(config: any = {}): FileProcessor {
    return async function (stat: FileState) {
        mergeTagData(config.tagData, stat.extInfo.meta ?? {});
        return stat;
    };
}