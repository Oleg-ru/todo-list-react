import {expect, test} from "vitest";
import type {TaskStateType, TodolistType} from "../App.tsx";
import {addTodolistAC, todolistReducer} from "./todolists/todolists-reducer.ts";
import {taskReducer} from "./tasks/tasks-reducer.ts";

test("ids should be equals", () => {
    const startTaskState: TaskStateType = {};
    const startTodolistState: Array<TodolistType> = [];

    const action = addTodolistAC("new todolist");

    const endTaskState = taskReducer(startTaskState, action);
    const endTodolistState = todolistReducer(startTodolistState, action);

    const keys = Object.keys(endTaskState);
    const idFromTasks = keys[0];
    const idFromTodolist = endTodolistState[0].id;

    expect(idFromTasks).toBe(action.id);
    expect(idFromTodolist).toBe(action.id)
})