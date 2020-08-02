type FileState = {
    path: string,
    target: string,
    content?: string,
    extInfo: any,
};
type FileProcessor = AsyncIdentityFuncType<FileState>;
type ProcessRules = {
    test: (path: string) => boolean;
    use: FileProcessor[];
}[];