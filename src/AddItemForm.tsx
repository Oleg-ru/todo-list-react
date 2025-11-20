import {type ChangeEvent, type KeyboardEvent, useState} from "react";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export function AddItemForm(props: AddItemFormPropsType) {

    const [title, setTitle] = useState("");
    const [error, setError] = useState<string | null>(null);

    const onNewTitleChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    }

    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (event.key === "Enter") {
            props.addItem(title);
            setTitle("");
        }
    }

    const addTask = () => {
        if (title.trim() === "") {
            setError("Field is required");
            setTitle("");
            return;
        }
        props.addItem(title.trim());
        setTitle("");
    }

    return (
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
    );
}