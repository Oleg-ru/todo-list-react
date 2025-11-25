import type {FilterValuesType, TodolistType} from "../../App.tsx";
import {v1} from "uuid";

export type RemoveTodolistActionType = {
    type: "REMOVE-TODOLIST"
    id: string
}

export type AddTodolistActionType = {
    type: "ADD-TODOLIST"
    title: string
    id: string
}

export type ChangeTodolistTitleActionType = {
    type: "CHANGE-TODOLIST-TITLE"
    id: string
    title: string
}

export type ChangeTodolistFilterActionType = {
    type: "CHANGE-TODOLIST-FILTER"
    id: string
    filter: FilterValuesType
}

type ActionsType = RemoveTodolistActionType | AddTodolistActionType
    | ChangeTodolistTitleActionType | ChangeTodolistFilterActionType

export const todoList1 = v1();
export const todoList2 = v1();

const initState: Array<TodolistType> = [
    {id: todoList1, title: "What to learn", filter: "all"},
    {id: todoList2, title: "What to buy", filter: "all"},
];

export const todolistReducer = (state: Array<TodolistType> = initState, action: ActionsType): Array<TodolistType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(todoList => todoList.id !== action.id)
        }

        case 'ADD-TODOLIST': {
            return [
                ...state,
                {
                    id: action.id,
                    filter: "all",
                    title: action.title,
                }
            ]
        }

        case 'CHANGE-TODOLIST-TITLE': {
            return state.map(todoList =>
                todoList.id === action.id
                    ? {...todoList, title: action.title}
                    : todoList)
        }

        case 'CHANGE-TODOLIST-FILTER': {
            return state.map(todoList =>
                todoList.id === action.id
                    ? {...todoList, filter: action.filter}
                    : todoList)
        }

        default:
            return state;
    }
};

//Action Creators:
export const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return {type: "REMOVE-TODOLIST", id: todolistId}
};

export const addTodolistAC = (title: string): AddTodolistActionType => {
    return {type: "ADD-TODOLIST", title: title, id: v1()}
};

export const changeTodolistTitleAC = (id: string, title: string): ChangeTodolistTitleActionType => {
    return {type: "CHANGE-TODOLIST-TITLE", id: id, title: title}
};

export const changeTodolistFilterAC = (id: string, filter: FilterValuesType): ChangeTodolistFilterActionType => {
    return {type: "CHANGE-TODOLIST-FILTER", id: id, filter: filter}
};