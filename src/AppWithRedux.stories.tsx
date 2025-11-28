import AppWithRedux from "./AppWithRedux.tsx";
import {ReduxStoreProviderDecorator} from "../.storybook/ReduxStoreProviderDecorator.tsx";

export default {
    title: "AppWithRedux Component",
    component: AppWithRedux,
    decorators: [ReduxStoreProviderDecorator]
}

export const AppWithReduxBaseExample = () => {
    return (
            <AppWithRedux/>
    )
};