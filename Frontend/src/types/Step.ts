import { Task } from "./Task";

export type Step = {
    id?: number;
    name: string;
    description: string;
    task: Task;
    priority: boolean;
}