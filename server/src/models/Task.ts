export interface ITask {
    name: string;
    description: string;
    dueDate: string;
}

export interface ITaskModel extends ITask{

}

export class Task implements ITask{

    name: string;
    description: string;
    dueDate: string;

    constructor(name: string, description: string, dueDate: string) {
        this.name = name;
        this.description = description;
        this.dueDate = dueDate;
    }
}
