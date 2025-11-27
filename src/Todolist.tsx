import type {FilterValuesType} from "./App.tsx";
import * as React from "react";
import {useCallback} from "react";
import {AddItemForm} from "./AddItemForm.tsx";
import {EditableSpan} from "./EditableSpan.tsx";
import {Button, IconButton} from "@mui/material";
import Delete from "@mui/icons-material/Delete";
import {useDispatch, useSelector} from "react-redux";
import type {AppRootState} from "./state/store.ts";
import {addTaskAC} from "./state/tasks/tasks-reducer.ts";
import {Task} from "./Task.tsx";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    changeFilter: (value: FilterValuesType, todoListId: string) => void
    filter: FilterValuesType
    removeTodolist: (todoList: string) => void
    changeTodolistTitle: (id: string, newTitle: string) => void
}

export const Todolist = React.memo((props: PropsType) => {
    console.log("📚 Todolist called")

    const dispatch = useDispatch();

    const tasks = useSelector<AppRootState, Array<TaskType>>(state => state.tasks[props.id]);

    // eslint-disable-next-line react-hooks/preserve-manual-memoization
    const onAllClickHandler = useCallback(() => {
        props.changeFilter("all", props.id)
    },[props.changeFilter, props.id])
    // eslint-disable-next-line react-hooks/preserve-manual-memoization
    const onActiveClickHandler = useCallback(() => {
        props.changeFilter("active", props.id)
    },[props.changeFilter, props.id])
    // eslint-disable-next-line react-hooks/preserve-manual-memoization
    const onCompletedClickHandler = useCallback(() => {
        props.changeFilter("completed", props.id)
    },[props.changeFilter, props.id])
    // eslint-disable-next-line react-hooks/preserve-manual-memoization
    const removeTodolist = useCallback(() => {
        props.removeTodolist(props.id);
    }, [props.removeTodolist, props.id]);
    const addTask = useCallback((title: string) => {
        dispatch(addTaskAC(title, props.id));
    }, [props.id, dispatch]);
    // eslint-disable-next-line react-hooks/preserve-manual-memoization
    const changeTodolistTitle = useCallback((newTitle: string) => {
        props.changeTodolistTitle(props.id, newTitle);
    }, [props.changeTodolistTitle, props.id]);

    let tasksForTodoList = tasks;

    if (props.filter === "completed") {
        tasksForTodoList = tasksForTodoList.filter(task => task.isDone);
    }
    if (props.filter === "active") {
        tasksForTodoList = tasksForTodoList.filter(task => !task.isDone);
    }

    return (
        <div>
            <h3><EditableSpan title={props.title} onChange={changeTodolistTitle}/>
                <IconButton onClick={removeTodolist}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>
            <div>
                {tasksForTodoList.map((task) => <Task key={task.id} todolistId={props.id} task={task}/>)}
            </div>
            <div>
                <Button variant={props.filter === 'all' ? 'contained' : 'text'} onClick={onAllClickHandler}>All</Button>
                <Button variant={props.filter === 'active' ? 'contained' : 'text'}
                        onClick={onActiveClickHandler}>Active</Button>
                <Button variant={props.filter === 'completed' ? 'contained' : 'text'} color={"secondary"}
                        onClick={onCompletedClickHandler}>Completed</Button>
            </div>
        </div>
    );
})

