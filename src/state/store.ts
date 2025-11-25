import {combineReducers, createStore} from "redux";
import {taskReducer} from "./tasks/tasks-reducer.ts";
import {todolistReducer} from "./todolists/todolists-reducer.ts";


export const rootReducer = combineReducers({
    todolists: todolistReducer,
    tasks: taskReducer
});

//Это вручную описанный тип, он статичный и при изменении описанных типов, пришлось бы менять и тут
// type AppRootState = {
//     todolists: Array<TodolistType>
//     tasks: TaskStateType
// }

//TS автоматом вычисляет тип
export type AppRootState = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer);

// @ts-ignore
window.store = store;