import type {TaskStateType} from "../../App.tsx";
import {v1} from "uuid";
import {
    type AddTodolistActionType,
    type RemoveTodolistActionType,
} from "../todolists/todolists-reducer.ts";

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


const initalState: TaskStateType = {/*
    [todoList1]: [
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "React", isDone: false},
        {id: v1(), title: "Redux", isDone: false},
    ],
    [todoList2]: [
        {id: v1(), title: "Robot", isDone: false},
        {id: v1(), title: "Tomas", isDone: true},
        {id: v1(), title: "Kastryla", isDone: true},
    ] */
};

export const taskReducer = (state: TaskStateType = initalState, action: ActionsType): TaskStateType => {
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
            stateCopy[action.todolistId] = tasks.map(task => task.id === action.taskId ? {...task, isDone: action.isDone} : task)

            return stateCopy;
        }

        case 'CHANGE-TASK-TITLE': {
            //тут делается поверхностное копирование т.е объекты внутри имеют те же ссылки
            const stateCopy = {...state};
            const tasks = [...stateCopy[action.todolistId]];//1я правка, что нужно сделать копию внутрянки

            const task = tasks.find(task => task.id === action.taskId);
            if (task) {
                task.title = action.newTitle;
            }

            stateCopy[action.todolistId] = tasks; //2я правка, заменяю на свой измененный массив тасок

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
            return state
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