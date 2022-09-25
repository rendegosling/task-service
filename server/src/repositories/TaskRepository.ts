import { ITask } from "../models/Task";
import { ITaskService } from "../service/TaskService";
import axios from 'axios';
import { response } from "express";
import Logging from "../library/Logging";

export interface ITaskRepository {
    createTask(task: ITask): any;
    readAllTasks(): any;
    updateTask(id: string, task: ITask): any;
}

export class TaskRepository implements ITaskRepository {

    constructor(private taskService: ITaskService) {

    }

    public async createTask(task: ITask) {
        return axios.post('http://localhost:3003/tasks', {
            name: task.name,
            description: task.description,
            due_date: task.dueDate
        }).then(res => {
            Logging.info(res.data);
            Logging.info(res.status);
            return res.data;
        });
    }

    public async updateTask(id: string, task: ITask) {
        return axios.put(`http://localhost:3003/tasks/${id}`, {
            name: task.name,
            description: task.description,
            due_date: task.dueDate
        }).then(res => {
            Logging.info(res.data);
            Logging.info(res.status);
            return res.data;
        });
    }
    
    public async readAllTasks(): Promise<any> {
        return axios.get<ITask[]>('/tasks', {
            baseURL: 'http://localhost:3003'
        }).then(res => {
            Logging.info(res.data);
            Logging.info(res.status);
            return res.data;
        });
    }
}