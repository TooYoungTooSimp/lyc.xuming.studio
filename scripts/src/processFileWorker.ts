import { exit } from "process";
import { parentPort, threadId } from "worker_threads";
import config from "./config";
import { WorkerMsg } from "./dispatcher";

parentPort!.on("message", (msg: WorkerMsg) => {
    if (msg.type === "newTask")
        addNewTask(msg.payload);
    if (msg.type === "suicide")
        exit(0);
});

function addNewTask(task: any) {
    let stat: FileState = task;
    let matchedRule = config.rules.find(rule => rule.test(stat.path));
    (async () => {
        for (const rule of matchedRule?.use ?? []) {
            if (stat.drop) break;
            stat = await rule(stat);
        }
        stat.extInfo.tid = threadId;
        delete stat.content;
        return stat;
    })()
        .then(v => parentPort!.postMessage({
            type: "taskFinished",
            payload: v,
        }))
        .catch(e => parentPort!.postMessage({
            type: "taskFailed",
            payload: e.toString(),
        }));
}