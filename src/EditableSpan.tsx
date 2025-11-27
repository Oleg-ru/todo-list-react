import {type ChangeEvent, useState} from "react";
import {TextField} from "@mui/material";
import * as React from "react";

type EditableSpanPropsType = {
    title: string
    onChange: (newValue: string) => void
}

export const EditableSpan = React.memo( (props: EditableSpanPropsType) => {
    console.log("✏ EditableSpan")
    const [editMode, setEditMode] = useState(false);
    const [title, setTitle] = useState("")

    function activateEditMode() {
        setEditMode(true);
        setTitle(props.title);
    }

    function activateViewMode() {
        setEditMode(false);
        props.onChange(title)
    }

    function onChangeTitleHandler(event: ChangeEvent<HTMLInputElement>) {
        setTitle(event.target.value)
    }

    return (
        <>
            {
                editMode
                ? <TextField variant="standard" value={title} onBlur={activateViewMode} onChange={onChangeTitleHandler} autoFocus/>
                : <span onDoubleClick={activateEditMode}>{props.title}</span>
            }
        </>
    );
})