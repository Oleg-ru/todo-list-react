import type {FilterValuesType} from "./App.tsx";
import {type ChangeEvent, type KeyboardEvent, useState} from "react";

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
    filter: FilterValuesType
    removeTodolist: (todoList: string) => void
}

export function Todolist(props: PropsType) {

    const [title, setTitle] = useState("");
    const [error, setError] = useState<string | null> (null)

    const onNewTitleChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    }
    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (event.key === "Enter") {
            props.addTask(title, props.id);
            setTitle("");
        }
    }
    const addTask = () => {
        if (title.trim() === "") {
            setError("Field is required");
            setTitle("");
            return;
        }
        props.addTask(title.trim(), props.id);
        setTitle("");
    }

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

    return (
        <div>
            <h3>{props.title} <button onClick={removeTodolist}>X</button> </h3>
            <div>
                <input type="text"
                       value={title}
                       onChange={onNewTitleChangeHandler}
                       onKeyDown={onKeyPressHandler}
                       className={error ? 'error' : ''}
                />
                <button onClick={addTask}>+</button>
                {error && <div className="error-message">{error}</div>}
            </div>
            <ul>
                {props.tasks.map((task) => {

                    const onRemoveHandler = () => {
                        props.removeTask(task.id, props.id)
                    }
                    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
                        console.log(task.id + event.target.checked);
                        props.changeTaskStatus(task.id, event.target.checked, props.id);
                    };

                    return (
                        <li key={task.id}
                            className={task.isDone ? 'is-done' : ''}
                        >
                            <input type="checkbox"
                                   onChange={onChangeHandler}
                                   checked={task.isDone}
                            />
                            <span>{task.title}</span>
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