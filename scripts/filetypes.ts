import path from "path";

const ExtLists: any = {
    js: [".js"],
    css: [".css"],
    html: [".htm", ".html"],
    json: [".json"],
}

export default new Proxy({}, {
    get(obj: any, prop: string) {
        if (prop.startsWith("is")) {
            let type = prop.slice(2).toLowerCase()
            if (type in ExtLists)
                return (file: string) => ExtLists[type].includes(path.extname(file));
        }
        return obj[prop];
    }
});