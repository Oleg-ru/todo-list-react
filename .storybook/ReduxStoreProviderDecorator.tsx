import {Provider} from "react-redux";
import {type AppRootState, store} from "../src/state/store.ts";
import {combineReducers, createStore} from "redux";
import {taskReducer} from "../src/state/tasks/tasks-reducer.ts";
import {todolistReducer} from "../src/state/todolists/todolists-reducer.ts";
import { v1 } from "uuid";

const rootReducer = combineReducers({
    tasks: taskReducer,
    todolists: todolistReducer
});

const initialGlobalState = {
    todolists: [
        {id: "todoList1", title: "What to learn", filter: "all"},
        {id: "todoList2", title: "What to buy", filter: "all"},
    ],
    tasks: {
        ["todoList1"]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "React", isDone: false},
            {id: v1(), title: "Redux", isDone: false},
        ],
        ["todoList2"]: [
            {id: v1(), title: "Robot", isDone: false},
            {id: v1(), title: "Tomas", isDone: true},
            {id: v1(), title: "Kastryla", isDone: true},
        ]
    }
};

export const storyBookStore = createStore(rootReducer, initialGlobalState as AppRootState);

export const ReduxStoreProviderDecorator = (storyFn: any) => {
    return (
        <Provider store={storyBookStore}>
            {storyFn()}
        </Provider>
    )
};