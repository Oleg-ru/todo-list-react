import {type ChangeEvent, useState} from "react";

type EditableSpanPropsType = {
    title: string
    onChange: (newValue: string) => void
}

export function EditableSpan(props: EditableSpanPropsType) {

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
                ? <input type="text" value={title} onBlur={activateViewMode} onChange={onChangeTitleHandler} autoFocus/>
                : <span onDoubleClick={activateEditMode}>{props.title}</span>
            }
        </>
    );
}