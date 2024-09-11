import { createContext } from "react";
import { User } from "../../types/User";
import { Step } from "../../types/Step";
import { Task } from "../../types/Task";

export type AuthContextType = {
    user: User | null;
    signin: (email: string, password: string) => Promise<boolean>;
    register: (newUser: User) => Promise<User>;
    signout: () => void;
    updateUser: (updatedUser: User) => void;
    stepsByTask: (taskName: string) => Promise<Step[]>;
    tasksByUser: (userID: number) => Promise<Task[]>;
    addStep: (newStep: Step) => Promise<Step>;
    addTask: (newTask: Task) => Promise<Task>;
    updateStep: (updatedStep: Step) => Promise<Step>;
    updatePassword: (user: User, oldPassword: String, newPassword: String) => Promise<User>;
    deleteStep: (step: Step) => void;
}

export const AuthContext = createContext<AuthContextType>(null!);