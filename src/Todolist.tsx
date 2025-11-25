import type {FilterValuesType} from "./App.tsx";
import {type ChangeEvent} from "react";
import {AddItemForm} from "./AddItemForm.tsx";
import {EditableSpan} from "./EditableSpan.tsx";
import {Button, Checkbox, IconButton} from "@mui/material";
import Delete from "@mui/icons-material/Delete";
import {useDispatch, useSelector} from "react-redux";
import type {AppRootState} from "./state/store.ts";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks/tasks-reducer.ts";

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

export function Todolist(props: PropsType) {

    const dispatch = useDispatch();

    const tasks = useSelector<AppRootState, Array<TaskType>>(state => state.tasks[props.id]);

    const onAllClickHandler = () => {
        props.changeFilter("all", props.id)
    }
    const onActiveClickHandler = () => {
        props.changeFilter("active", props.id)
    }
    const onCompletedClickHandler = () => {
        props.changeFilter("completed", props.id)
    }

    const removeTodolist = () => {
        props.removeTodolist(props.id);
    };
    const addTask = (title: string) => {
        dispatch(addTaskAC(title, props.id));
    };
    const changeTodolistTitle = (newTitle: string) => {
        props.changeTodolistTitle(props.id, newTitle);
    };

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
                {tasksForTodoList.map((task) => {

                    const onRemoveHandler = () => {
                        dispatch(removeTaskAC(task.id, props.id));
                    }

                    const onChangeStatusHandler = (event: ChangeEvent<HTMLInputElement>) => {
                        dispatch(changeTaskStatusAC(task.id, event.target.checked, props.id));
                    };

                    const onChangeTitleHandler = (newValue: string) => {
                        dispatch(changeTaskTitleAC(task.id, newValue, props.id))
                    };

                    return (
                        <div key={task.id}
                            className={task.isDone ? 'is-done' : ''}
                        >
                            <Checkbox onChange={onChangeStatusHandler}
                                      checked={task.isDone}
                            />
                            <EditableSpan title={task.title}
                                          onChange={onChangeTitleHandler}
                            />
                            <IconButton onClick={onRemoveHandler}>
                                <Delete/>
                            </IconButton>
                        </div>
                    );
                })}
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
}

