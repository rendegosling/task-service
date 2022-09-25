import { ITask } from "../models/Task";

export interface ITaskService {
    createTask(task: ITask) : Promise<any>;
    readAllTasks() : Promise<[any]>;
}

export class TaskService implements ITaskService {
    createTask(task: ITask): Promise<any> {
        throw new Error("Method not implemented.");
    }
    readAllTasks(): Promise<[any]> {
        throw new Error("Method not implemented.");
    }
}