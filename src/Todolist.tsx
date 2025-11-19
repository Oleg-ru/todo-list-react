import type {FilterValuesType} from "./App.tsx";
import {type ChangeEvent, type KeyboardEvent, useState} from "react";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean) => void
    filter: FilterValuesType
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
            props.addTask(title);
            setTitle("");
        }
    }
    const addTask = () => {
        if (title.trim() === "") {
            setError("Field is required");
            setTitle("");
            return;
        }
        props.addTask(title.trim());
        setTitle("");
    }

    const onAllClickHandler = () => {
        props.changeFilter("all")
    }
    const onActiveClickHandler = () => {
        props.changeFilter("active")
    }
    const onCompletedClickHandler = () => {
        props.changeFilter("completed")
    }

    return (
        <div>
            <h3>{props.title}</h3>
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
                        props.removeTask(task.id)
                    }
                    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
                        console.log(task.id + event.target.checked);
                        props.changeTaskStatus(task.id, event.target.checked);
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