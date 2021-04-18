import { Worker } from "worker_threads";
import { cpus } from "os";

type WorkerInfo = {
    worker: Worker,
    workload: number,
};
export type WorkerMsg = {
    type: "newTask" | "taskFinished" | "taskFailed" | "suicide",
    payload?: any,
};
export function dispatchWorks<TTask>(
    worker_path: string,
    task_list: TTask[],
    succ_callback: (msg: any) => void,
    fail_callback: (err: any) => void,
    parallel_degrees: number = Math.min(task_list.length, Math.max(1, cpus().length - 1)),
    default_capacity: number = task_list.length,
) {
    return new Promise<void>((resolve, reject) => {
        try {
            let addTask = (worker_info: WorkerInfo, task: TTask) => {
                worker_info.workload++;
                let msg: WorkerMsg = { type: "newTask", payload: task };
                worker_info.worker.postMessage(msg);
            };
            let killWorker = (worker_info: WorkerInfo) => {
                let msg: WorkerMsg = { type: "suicide" };
                worker_info.worker.postMessage(msg);
            };
            let curTaskIdx = 0;
            let restTaskNum = task_list.length;
            let worker_message_proc = (worker_info: WorkerInfo, msg: WorkerMsg) => {
                if (msg.type === "taskFinished" || msg.type === "taskFailed") {
                    if (msg.type === "taskFinished")
                        restTaskNum--, succ_callback(msg.payload);
                    if (msg.type === "taskFailed")
                        restTaskNum--, fail_callback(msg.payload);
                    worker_info.workload--;
                    if (curTaskIdx < task_list.length)
                        addTask(worker_info, task_list[curTaskIdx++]);
                    else {
                        if (worker_info.workload <= 0)
                            killWorker(worker_info);
                    }
                    if (restTaskNum <= 0)
                        resolve();
                }
            };
            let createWorkerInfo = () => {
                let worker = new Worker(worker_path);
                let worker_info = {
                    worker,
                    workload: 0,
                };
                worker.on("message", v => worker_message_proc(worker_info, v));
                worker.on("error", fail_callback);
                return worker_info;
            };
            // TODO: add task self-adaptive load dispatch
            let workers: WorkerInfo[] = [...Array(parallel_degrees)].map(_ => createWorkerInfo());
            // stage1: dispatch tasks to workers' capacity.
            let stage1_limit = Math.min(parallel_degrees * default_capacity, task_list.length);
            for (; curTaskIdx < stage1_limit; curTaskIdx++) {
                let current_worker = workers[curTaskIdx % workers.length];
                addTask(current_worker, task_list[curTaskIdx]);
            }
        } catch (error) {
            reject(error);
        }
    });
}