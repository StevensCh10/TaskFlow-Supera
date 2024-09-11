import axios from "axios";
import { User } from "../types/User";
import { Step } from "../types/Step";
import { Task } from "../types/Task";

const api = axios.create({
    baseURL: "http://localhost:8080/"
})

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export const useApi = () => ({
    validateToken: async (token: string) => {
        const response = await api.post('auth/validate', { token });
        return response.data;
    },
    signin: async (email: string, password: string) => {
        var user = {email: email, password: password}
        return await api.post(`auth/login`, user)
            .then((response) => response.data)
            .catch((e) => {throw e.response.data});
    },
    register: async(newUser: User) => {
        return await api.post(`auth/register`, newUser)
            .then((response) => response.data)
            .catch((e) => {throw e.response.data});
    },
    updateUser: async(updatedUser: User) => {
        return await api.put('/user', updatedUser)
        .then((response) => response.data)
        .catch((e) => {throw e.response.data})
    },
    updatePassword: async(updatedUser: User, oldPassword:String, newPassword: String) => {
        var data = {
            user: updatedUser,
            oldPassword: oldPassword,
            newPassword: newPassword
        }
        return await api.put('/user/password', data)
        .then((response) => response.data)
        .catch((e) => {throw e.response.data})
    },
    stepsByTask: async(taskname: string) => {
        return await api.get(`/step/steps/${taskname}`)
        .then((response) => response.data)
        .catch(() => null)
    },
    tasksByUser: async(userID: number) => {
        return await api.get(`/task/tasks/${userID}`)
        .then((response) => response.data)
        .catch(() => null)
    },
    addStep: async(newStep: Step) => {
        return await api.post(`/step`, newStep)
        .then((response) => response.data)
        .catch((e) => {throw e.response.data})
    },
    addTask: async(newTask: Task) => {
        return await api.post(`/task`, newTask)
        .then((response) => response.data)
        .catch((e) => {throw e.response.data})
    },
    updateStep: async(updatedStep: Step) => {
        return await api.put('/step', updatedStep)
        .then((response) => response.data)
        .catch((e) => {throw e.response.data})
    },
    deleteStep: async(stepID: number) => {
        await api.delete(`/step/${stepID}`)
        .catch((e) => {throw e.response.data})
    }
})