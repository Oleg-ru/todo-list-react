import {useDispatch} from "react-redux";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks/tasks-reducer.ts";
import {type ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@mui/material";
import {EditableSpan} from "./EditableSpan.tsx";
import Delete from "@mui/icons-material/Delete";
import type {TaskType} from "./Todolist.tsx";
import * as React from "react";

type TaskPropsType = {
    todolistId: string
    task: TaskType
}

export const Task = React.memo((props: TaskPropsType) => {
    const dispatch = useDispatch();

    const onRemoveHandler = () => {
        dispatch(removeTaskAC(props.task.id, props.todolistId));
    }

    const onChangeStatusHandler = (event: ChangeEvent<HTMLInputElement>) => {
        dispatch(changeTaskStatusAC(props.task.id, event.target.checked, props.todolistId));
    };

    const onChangeTitleHandler = useCallback((newValue: string) => {
        dispatch(changeTaskTitleAC(props.task.id, newValue, props.todolistId))
    }, [dispatch, props.task.id, props.todolistId]);

    return (
        <div key={props.task.id}
             className={props.task.isDone ? 'is-done' : ''}
        >
            <Checkbox onChange={onChangeStatusHandler}
                      checked={props.task.isDone}
            />
            <EditableSpan title={props.task.title}
                          onChange={onChangeTitleHandler}
            />
            <IconButton onClick={onRemoveHandler}>
                <Delete/>
            </IconButton>
        </div>
    );
});