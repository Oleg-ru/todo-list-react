import {expect, test} from "vitest";
import {v1} from "uuid";
import type {TodolistType} from "../../App.tsx";
import {
    addTodolistAC, changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistReducer
} from "./todolists-reducer.ts";


test('correct todolist should be removed', () => {
    const todolistId1 = v1();
    const todolistId2 = v1();

    const startState: Array<TodolistType> = [
        {id: todolistId1, title: 'What to learn', filter: "all"},
        {id: todolistId2, title: 'What to buy', filter: "all"},
    ];

    const endState = todolistReducer(startState, removeTodolistAC(todolistId1));

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
})

test('correct todolist should be added', () => {
    const todolistId1 = v1();
    const todolistId2 = v1();

    const newTodolistTitle = "New todolist";

    const startState: Array<TodolistType> = [
        {id: todolistId1, title: 'What to learn', filter: "all"},
        {id: todolistId2, title: 'What to buy', filter: "all"},
    ];

    const endState = todolistReducer(startState, addTodolistAC(newTodolistTitle));

    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe(newTodolistTitle);
    expect(endState[2].filter).toBe("all");
})

test('correct todolist should change its name', () => {
    const todolistId1 = v1();
    const todolistId2 = v1();

    const newTitle = "New rename todolist title";

    const startState: Array<TodolistType> = [
        {id: todolistId1, title: 'What to learn', filter: "all"},
        {id: todolistId2, title: 'What to buy', filter: "all"},
    ];

    const endState = todolistReducer(startState, changeTodolistTitleAC(todolistId2, newTitle));

    expect(endState[0].title).toBe('What to learn');
    expect(endState[1].title).toBe(newTitle);
})

test('correct filter of todolist should be change', () => {
    const todolistId1 = v1();
    const todolistId2 = v1();

    const newFilter = "completed";

    const startState: Array<TodolistType> = [
        {id: todolistId1, title: 'What to learn', filter: "all"},
        {id: todolistId2, title: 'What to buy', filter: "all"},
    ];

    const endState = todolistReducer(startState, changeTodolistFilterAC(todolistId2, newFilter));

    expect(endState[0].filter).toBe('all');
    expect(endState[1].filter).toBe(newFilter);
})