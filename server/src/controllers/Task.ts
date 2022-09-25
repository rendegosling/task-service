import { NextFunction, Request, Response } from 'express';
import Logging from '../library/Logging';
import { Task } from '../models/Task';
import { TaskRepository } from '../repositories/TaskRepository';
import { TaskService } from '../service/TaskService';


const createTask = (req: Request, res: Response, next: NextFunction) => {
    Logging.info("create Task");
    const { name, description, due_date } = req.body;
    const task = new Task(name, description, due_date);
    const repo = new TaskRepository(new TaskService());
    repo.createTask(task)
    .then((result) => {
        res.status(200);
        res.send(result);
    });
};
const readTask = (req: Request, res: Response, next: NextFunction) => {
    Logging.info('readTask');
    const repo = new TaskRepository(new TaskService());
    const result = repo.readAllTasks();
    res.status(200);
    res.send(result);
};
const readAllTask = (req: Request, res: Response, next: NextFunction) => {
    Logging.info('readAllTask');
    const repo = new TaskRepository(new TaskService());
    repo.readAllTasks()
    .then((result) => {
        res.status(200);
        Logging.info(result.map((task:Task) => {
            task.name
        }));
        res.send(result);
    });
};
const updateTask = (req: Request, res: Response, next: NextFunction) => {
    Logging.info("update Task");
    const { name, description, due_date } = req.body;
    const taskId = req.params.taskId
    const task = new Task(name, description, due_date);
    const repo = new TaskRepository(new TaskService());
    repo.updateTask(taskId, task)
    .then((result) => {
        res.status(200);
        res.send(result);
    });
};
const deleteTask = (req: Request, res: Response, next: NextFunction) => {
    Logging.info('deleteTask');
    res.status(200);
    return {
        tasks: []
    }
};


export default { createTask, readTask, readAllTask, updateTask, deleteTask };

