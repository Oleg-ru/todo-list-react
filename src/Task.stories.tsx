import {Task} from "./Task.tsx";
import {ReduxStoreProviderDecorator} from "../.storybook/ReduxStoreProviderDecorator.tsx";

export default {
    title: "Task Component",
    component: Task,
    decorators: [ReduxStoreProviderDecorator]
}

export const TaskBaseExample = () => {
    return (
        <>
            <Task todolistId={"1_1"} task={{id: '1', isDone: true, title: 'CSS'}}/>
            <Task todolistId={"1_1"} task={{id: '2', isDone: false, title: 'React'}}/>
        </>
    )
};