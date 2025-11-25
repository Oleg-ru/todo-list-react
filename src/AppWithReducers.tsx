import './App.css'
import {type TaskType, Todolist} from "./Todolist.tsx";
import {useReducer} from "react";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm.tsx";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from '@mui/icons-material';
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistReducer
} from "./state/todolists/todolists-reducer.ts";
import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    taskReducer
} from "./state/tasks/tasks-reducer.ts";

export type FilterValuesType = "all" | "completed" | "active";

export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TaskStateType = {
    [key: string]: Array<TaskType>
}

function AppWithReducers() {
    const todoList1 = v1();
    const todoList2 = v1();

    const [todoLists, dispatchTodolistsReducer] = useReducer(todolistReducer, [
        {id: todoList1, title: "What to learn", filter: "all"},
        {id: todoList2, title: "What to buy", filter: "all"},
    ]);
    const [tasksObj, dispatchTasksReducer] = useReducer(taskReducer ,{
        [todoList1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "React", isDone: false},
            {id: v1(), title: "Redux", isDone: false},
        ],
        [todoList2]: [
            {id: v1(), title: "Robot", isDone: false},
            {id: v1(), title: "Tomas", isDone: true},
            {id: v1(), title: "Kastryla", isDone: true},
        ]
    });

    function removeTask(id: string, todolistId: string) {
        const action = removeTaskAC(id, todolistId);
        dispatchTasksReducer(action);
    }

    function addTask(title: string, todolistId: string) {
        const action = addTaskAC(title, todolistId);
        dispatchTasksReducer(action);
    }

    function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
        const action = changeTaskStatusAC(taskId, isDone, todolistId);
        dispatchTasksReducer(action);
    }

    function changeTaskTitle(taskId: string, newTitle: string, todolistId: string) {
        const action = changeTaskTitleAC(taskId, newTitle, todolistId);
        dispatchTasksReducer(action);
    }


    function changeFilter(value: FilterValuesType, todoListId: string) {
        dispatchTodolistsReducer(changeTodolistFilterAC(todoListId, value));
    }

    function removeTodolist(todoListId: string) {
        const action = removeTodolistAC(todoListId);
        dispatchTasksReducer(action);
        dispatchTodolistsReducer(action);
    }

    function changeTodolistTitle(id: string, newTitle: string) {
        dispatchTodolistsReducer(changeTodolistTitleAC(id, newTitle));
    }

    function addTodolist(title: string) {
        const action = addTodolistAC(title);
        dispatchTasksReducer(action);
        dispatchTodolistsReducer(action);
    }

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed style={{padding: "20px"}}>
                <Grid container>
                    <AddItemForm addItem={addTodolist} />
                </Grid>

                <Grid container spacing={3}>
                    {todoLists.map((todoList) => {

                        let tasksForTodoList = tasksObj[todoList.id];

                        if (todoList.filter === "completed") {
                            tasksForTodoList = tasksForTodoList.filter(task => task.isDone);
                        }
                        if (todoList.filter === "active") {
                            tasksForTodoList = tasksForTodoList.filter(task => !task.isDone);
                        }

                        return (
                            <Grid>
                                <Paper style={{padding: "10px"}}>
                                    <Todolist key={todoList.id}
                                              id={todoList.id}
                                              title={todoList.title}
                                              tasks={tasksForTodoList}
                                              removeTask={removeTask}
                                              changeFilter={changeFilter}
                                              addTask={addTask}
                                              changeTaskStatus={changeStatus}
                                              changeTaskTitle={changeTaskTitle}
                                              filter={todoList.filter}
                                              removeTodolist={removeTodolist}
                                              changeTodolistTitle={changeTodolistTitle}
                                    />
                                </Paper>
                            </Grid>
                        );
                    })}
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithReducers
