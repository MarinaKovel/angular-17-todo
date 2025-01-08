import { TaskPriorityTypes } from "../types/task-priority.types";
import { TaskTypeTypes } from "../types/task-type.types";

export interface Task {
    task: string;
    type: TaskTypeTypes;
    priority: TaskPriorityTypes;
    worker: string;
    creator: string;
    date: Date;
    isDone: boolean;
}