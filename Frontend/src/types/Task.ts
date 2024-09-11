import { User } from "./User";

export type Task = {
    id?: number;
    name?: string;
    user?: User;
}