import type {FilterValuesType, TodolistType} from "../App.tsx";
import {v1} from "uuid";

export type RemoveTodolistActionType = {
    type: "REMOVE-TODOLIST"
    id: string
}

export type AddTodolistActionType = {
    type: "ADD-TODOLIST"
    title: string
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

type ActionsType = RemoveTodolistActionType | AddTodolistActionType | ChangeTodolistTitleActionType | ChangeTodolistFilterActionType

export const todolistReducer = (state: Array<TodolistType>, action: ActionsType): Array<TodolistType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(todoList => todoList.id !== action.id)
        }

        case 'ADD-TODOLIST': {
            return [
                ...state,
                {
                    id: v1(),
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
            throw new Error("I do not understand this action type")
    }
};

export const RemoveTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return {type: "REMOVE-TODOLIST", id: todolistId}
};

//Action Creators:
export const AddTodolistAC = (title: string): AddTodolistActionType => {
    return {type: "ADD-TODOLIST", title: title}
};

export const ChangeTodolistTitleAC = (id: string, title: string): ChangeTodolistTitleActionType => {
    return {type: "CHANGE-TODOLIST-TITLE", id: id, title: title}
};

export const ChangeTodolistFilterAC = (id: string, filter: FilterValuesType): ChangeTodolistFilterActionType => {
    return {type: "CHANGE-TODOLIST-FILTER", id: id, filter: filter}
};