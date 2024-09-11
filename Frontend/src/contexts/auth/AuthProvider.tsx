import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { User } from "../../types/User";
import { useApi } from "../../hooks/useApi";
import { Step } from "../../types/Step";
import { Task } from "../../types/Task";

export const AuthProvider = ({ children }: {children: JSX.Element}) => {
    const [user, setUser] = useState<User |  null>(() => {
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    });

    const api = useApi();

    useEffect(() => {
        const validateToken = async () => {
            const storageData = localStorage.getItem('authToken');
            if (storageData) {
                const data = await api.validateToken(storageData);
                if (data.user) {
                    setUser(data.user);
                }
            }
        }
        validateToken();
    }, [api]);

    const signin = async (email: string, password: string) => {
        const data = await api.signin(email, password);
        if(data.user && data.token){
            setUser(data.user);
            localStorage.setItem('user', JSON.stringify(data.user));
            localStorage.setItem('authToken', data.token);
            return true;
        }
        return false;
    }

    const register = async(newUser: User) => {
        const data = await api.register(newUser);
        if(data.user && data.token){
            setUser(data.user);
            localStorage.setItem('user', JSON.stringify(data.user));
            localStorage.setItem('authToken', data.token);
        }
        return data.user;
    }

    const signout = () => {
        localStorage.clear();
        setUser(null);
    }

    const updateUser = async(updatedUser: User) => {
        const data = await api.updateUser(updatedUser);
        setUser(data);
        localStorage.setItem('user', JSON.stringify(data));
    }

    const updatePassword = async(updatedUser: User, oldPassword: String, newPassword: String) => {
        const data = await api.updatePassword(updatedUser, oldPassword, newPassword);
        setUser(data);
        localStorage.setItem('user', JSON.stringify(data));
        return data;
    }

    const stepsByTask = async(taskname: string) => {
        const data = await api.stepsByTask(taskname);
        localStorage.setItem('steps', JSON.stringify(data));
        return data;
    }

    const tasksByUser = async(userID: number) => {
        const data = await api.tasksByUser(userID);
        localStorage.setItem('tasks', JSON.stringify(data));
        return data;
    }

    const addStep = async(newStep: Step) => {
        const data = await api.addStep(newStep);
        const tasks = JSON.parse(localStorage.getItem('steps')!);
        tasks.push(data);
        localStorage.setItem('steps', JSON.stringify(tasks));
        return data;
    }

    const addTask = async(newTask: Task) => {
        const data = await api.addTask(newTask);
        const tasks = JSON.parse(localStorage.getItem('tasks')!);
        tasks.push(data);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        return data;
    }

    const updateStep = async(updatedStep: Step) => {
        const data = await api.updateStep(updatedStep);
        await stepsByTask(updatedStep.task.name!);
        return data;
    }

    const deleteStep = async(task: Step) => {
        await api.deleteStep(task.id!);
        await stepsByTask(task.task.name!);
    }

    return (
        <AuthContext.Provider value={{user, signin, register, signout, updateUser, stepsByTask, tasksByUser, addStep, addTask, updateStep, deleteStep, updatePassword}}>
            {children}
        </AuthContext.Provider>
    );
}