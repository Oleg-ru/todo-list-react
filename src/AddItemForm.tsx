import {type ChangeEvent, type KeyboardEvent, useState} from "react";
import { IconButton, TextField} from "@mui/material";
import ControlPointIcon from '@mui/icons-material/ControlPoint';

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
            <TextField value={title}
                       variant="outlined"
                       label="Type value"
                       onChange={onNewTitleChangeHandler}
                       onKeyDown={onKeyPressHandler}
                       error={!!error}
                       helperText={error}
            />
            <IconButton onClick={addTask} color="primary">
                <ControlPointIcon/>
            </IconButton>
        </div>
    );
}