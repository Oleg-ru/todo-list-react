import type {FilterValuesType} from "./App.tsx";
import {type ChangeEvent} from "react";
import {AddItemForm} from "./AddItemForm.tsx";
import {EditableSpan} from "./EditableSpan.tsx";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todoListId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
    filter: FilterValuesType
    removeTodolist: (todoList: string) => void
    changeTodolistTitle: (id: string, newTitle: string) => void
}

export function Todolist(props: PropsType) {

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
        props.addTask(title, props.id)
    };
    const changeTodolistTitle = (newTitle: string) => {
        props.changeTodolistTitle(props.id, newTitle);
    };

    return (
        <div>
            <h3> <EditableSpan title={props.title} onChange={changeTodolistTitle} />
            <button onClick={removeTodolist}>X</button> </h3>
            <AddItemForm addItem={addTask} />
            <ul>
                {props.tasks.map((task) => {

                    const onRemoveHandler = () => {
                        props.removeTask(task.id, props.id)
                    }

                    const onChangeStatusHandler = (event: ChangeEvent<HTMLInputElement>) => {
                        console.log(task.id + event.target.checked);
                        props.changeTaskStatus(task.id, event.target.checked, props.id);
                    };

                    const onChangeTitleHandler = (newValue: string) => {
                        props.changeTaskTitle(task.id, newValue, props.id);
                    };

                    return (
                        <li key={task.id}
                            className={task.isDone ? 'is-done' : ''}
                        >
                            <input type="checkbox"
                                   onChange={onChangeStatusHandler}
                                   checked={task.isDone}
                            />
                            <EditableSpan title={task.title}
                                          onChange={onChangeTitleHandler}
                            />
                            <button onClick={onRemoveHandler}>X
                            </button>
                        </li>
                    );
                })}
            </ul>
            <div>
                <button className={props.filter === 'all' ? 'active-filter' : ''} onClick={onAllClickHandler}>All</button>
                <button className={props.filter === 'active' ? 'active-filter' : ''} onClick={onActiveClickHandler}>Active</button>
                <button className={props.filter === 'completed' ? 'active-filter' : ''} onClick={onCompletedClickHandler}>Completed</button>
            </div>
        </div>
    );
}

