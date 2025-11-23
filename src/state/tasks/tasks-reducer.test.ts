import {expect, test} from "vitest";
import type {TaskStateType} from "../../App.tsx";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, taskReducer} from "./tasks-reducer.ts";
import {addTodolistAC, removeTodolistAC} from "../todolists/todolists-reducer.ts";

test("correct task should be deleted from correct array", () => {
    const startState: TaskStateType = {
        "todoListId1" : [
            {id: "1", title: "HTML&CSS", isDone: true},
            {id: "2", title: "JS", isDone: true},
            {id: "3", title: "React", isDone: false},
        ],
        "todoListId2" : [
            {id: "1", title: "Robot", isDone: false},
            {id: "2", title: "Tomas", isDone: true},
            {id: "3", title: "Kastryla", isDone: true},
        ]
    };

    const action = removeTaskAC("2", "todoListId2");
    const endState = taskReducer(startState, action);

    expect(endState["todoListId1"].length).toBe(3);
    expect(endState["todoListId2"].length).toBe(2);
    expect(endState["todoListId2"].every(task => task.id != "2")).toBeTruthy();
})

test("correct task should be added to correct array", () => {
    const startState: TaskStateType = {
        "todoListId1" : [
            {id: "1", title: "HTML&CSS", isDone: true},
            {id: "2", title: "JS", isDone: true},
            {id: "3", title: "React", isDone: false},
        ],
        "todoListId2" : [
            {id: "1", title: "Robot", isDone: false},
            {id: "2", title: "Tomas", isDone: true},
            {id: "3", title: "Kastryla", isDone: true},
        ]
    };

    const action = addTaskAC("New task", "todoListId1")
    const endState = taskReducer(startState, action);

    expect(endState["todoListId1"].length).toBe(4);
    expect(endState["todoListId1"][3].title).toBe("New task");
    expect(endState["todoListId1"][3].id).toBeDefined();
})

test("status of specified task should be changed", () => {
    const startState: TaskStateType = {
        "todoListId1" : [
            {id: "1", title: "HTML&CSS", isDone: true},
            {id: "2", title: "JS", isDone: true},
            {id: "3", title: "React", isDone: false},
        ],
        "todoListId2" : [
            {id: "1", title: "Robot", isDone: false},
            {id: "2", title: "Tomas", isDone: true},
            {id: "3", title: "Kastryla", isDone: true},
        ]
    };

    const action = changeTaskStatusAC("2", false, "todoListId2")
    const endState = taskReducer(startState, action);

    expect(endState["todoListId2"].length).toBe(3);
    expect(endState["todoListId2"][1].isDone).toBeFalsy();
    expect(endState["todoListId1"][1].isDone).toBeTruthy()
})

test("title of specified task should be changed", () => {
    const startState: TaskStateType = {
        "todoListId1" : [
            {id: "1", title: "HTML&CSS", isDone: true},
            {id: "2", title: "JS", isDone: true},
            {id: "3", title: "React", isDone: false},
        ],
        "todoListId2" : [
            {id: "1", title: "Robot", isDone: false},
            {id: "2", title: "Tomas", isDone: true},
            {id: "3", title: "Kastryla", isDone: true},
        ]
    };

    const action = changeTaskTitleAC("3", "new task title", "todoListId2")
    const endState = taskReducer(startState, action);

    expect(endState["todoListId2"].length).toBe(3);
    expect(endState["todoListId2"][2].title).toBe("new task title");
    expect(endState["todoListId2"][2].id).toBe("3");
})

test("new property with new array should be added when new todolist is added", () => {
    const startState: TaskStateType = {
        "todoListId1" : [
            {id: "1", title: "HTML&CSS", isDone: true},
            {id: "2", title: "JS", isDone: true},
            {id: "3", title: "React", isDone: false},
        ],
        "todoListId2" : [
            {id: "1", title: "Robot", isDone: false},
            {id: "2", title: "Tomas", isDone: true},
            {id: "3", title: "Kastryla", isDone: true},
        ]
    };

    const action = addTodolistAC("new todolist");

    const endState = taskReducer(startState, action);

    const keys = Object.keys(endState);
    const newKey = keys.find(key => key != 'todoListId1' && key != 'todoListId2');
    if (!newKey) {
        throw new Error("new key should be added")
    }

    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([]);

})

test("property with todolistId should be deleted", () => {
    const startState: TaskStateType = {
        "todoListId1" : [
            {id: "1", title: "HTML&CSS", isDone: true},
            {id: "2", title: "JS", isDone: true},
            {id: "3", title: "React", isDone: false},
        ],
        "todoListId2" : [
            {id: "1", title: "Robot", isDone: false},
            {id: "2", title: "Tomas", isDone: true},
            {id: "3", title: "Kastryla", isDone: true},
        ]
    };

    const action = removeTodolistAC("todoListId2");

    const endState = taskReducer(startState, action);

    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState["todoListId2"]).toBeUndefined();
})