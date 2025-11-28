import {AddItemForm} from "./AddItemForm.tsx";
import {action} from "storybook/actions";

export default {
    title: "AddItemForm Component",
    component: AddItemForm
}

const callback =  action("Button add was pressed inside the form")

export const AddItemFormBaseExample = () => {
    return <AddItemForm addItem={callback}/>
};