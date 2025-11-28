import {action} from "storybook/actions";
import {EditableSpan} from "./EditableSpan.tsx";

export default {
    title: "EditableSpan Component",
    component: EditableSpan
}

const callback =  action("EditableSpan was been changed")

export const EditableSpanBaseExample = () => {
    return <EditableSpan title={"Todolist покупок"} onChange={callback} />
};