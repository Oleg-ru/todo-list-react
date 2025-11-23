import type {TaskStateType} from "../../App.tsx";
import {v1} from "uuid";
import type {AddTodolistActionType, RemoveTodolistActionType} from "../todolists/todolists-reducer.ts";

export type RemoveTaskActionType = {
    type: "REMOVE-TASK"
    taskId: string
    todolistId: string
}

export type AddTaskActionType = {
    type: "ADD-TASK"
    title: string
    todolistId: string
}

export type ChangeTaskStatusActionType = {
    type: "CHANGE-TASK-STATUS"
    taskId: string
    isDone: boolean
    todolistId: string
}

export type ChangeTaskTitleActionType = {
    type: "CHANGE-TASK-TITLE"
    taskId: string
    newTitle: string
    todolistId: string
}

type ActionsType = RemoveTaskActionType | AddTaskActionType
    | ChangeTaskStatusActionType | ChangeTaskTitleActionType
    | AddTodolistActionType | RemoveTodolistActionType

export const taskReducer = (state: TaskStateType, action: ActionsType): TaskStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            const copyState = {...state};
            const tasks = state[action.todolistId];
            const filteredTask = tasks.filter(task => task.id !== action.taskId);

            copyState[action.todolistId] = filteredTask;
            return copyState;
        }

        case 'ADD-TASK': {
            const copyState = {...state};
            const newTask = {
                id: v1(),
                title: action.title,
                isDone: false
            };
            const tasks = state[action.todolistId];

            copyState[action.todolistId] = [
                ...tasks,
                newTask
            ];

            return copyState;
        }

        case 'CHANGE-TASK-STATUS': {
            const stateCopy = {...state};
            const tasks = stateCopy[action.todolistId];
            const task = tasks.find(task => task.id === action.taskId);
            if (task) {
                task.isDone = action.isDone;
            }

            stateCopy[action.todolistId] = tasks;

            return stateCopy;
        }

        case 'CHANGE-TASK-TITLE': {
            const stateCopy = {...state};
            const tasks = stateCopy[action.todolistId];

            const task = tasks.find(task => task.id === action.taskId);
            if (task) {
                task.title = action.newTitle;
            }

            return stateCopy;
        }

        case 'ADD-TODOLIST': {
            const stateCopy = {...state};

            stateCopy[action.id] = [];
            return stateCopy;
        }

        case "REMOVE-TODOLIST": {
            const stateCopy = {...state};
            delete stateCopy[action.id]

            return stateCopy;
        }

        default:
            throw new Error("I do not understand this action type")
    }
};

//Action Creators:

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return {type: "REMOVE-TASK", taskId: taskId, todolistId: todolistId}
};

export const addTaskAC = (title: string, todolistId: string): AddTaskActionType => {
    return {type: "ADD-TASK", title: title, todolistId: todolistId}
};

export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string): ChangeTaskStatusActionType => {
    return {type: "CHANGE-TASK-STATUS", taskId: taskId, isDone: isDone, todolistId: todolistId}
};

export const changeTaskTitleAC = (taskId: string, newTitle: string, todolistId: string): ChangeTaskTitleActionType => {
    return {type: "CHANGE-TASK-TITLE", taskId, newTitle, todolistId}
};