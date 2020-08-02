import config from "./config";
export default async function processFile(stat: FileState) {
    let matchedRule = config.rules.find(rule => rule.test(stat.path));
    for (const rule of matchedRule?.use ?? [])
        stat = await rule(stat);
    return stat;
}