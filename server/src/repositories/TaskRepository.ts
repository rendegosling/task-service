import { ITask } from "../models/Task";
import { ITaskService } from "../service/TaskService";
import axios from 'axios';
import { response } from "express";
import Logging from "../library/Logging";
import { config } from "../config/config";

export interface ITaskRepository {
    createTask(task: ITask): any;
    readAllTasks(): any;
    updateTask(id: string, task: ITask): any;
}

export class TaskRepository implements ITaskRepository {

    constructor(private taskService: ITaskService) {

    }

    public async createTask(task: ITask) {
        return axios.post(`${config.microservice.url}/tasks`, {
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
        return axios.put(`${config.microservice.url}/tasks/${id}`, {
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
            baseURL: `${config.microservice.url}`
        }).then(res => {
            Logging.info(res.data);
            Logging.info(res.status);
            return res.data;
        });
    }
}