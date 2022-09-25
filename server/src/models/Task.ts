export interface ITask {
    name: string;
    description: string;
    dueDate: string;
    readonly status: string;
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
    
    get status(): string {
        if (typeof(this.dueDate != 'undefined')) {
            const dueDateValue = new Date(this.dueDate);
        }
        return "Not Urgent";
    }

}
