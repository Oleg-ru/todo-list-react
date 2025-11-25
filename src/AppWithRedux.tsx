import './App.css'
import {type TaskType, Todolist} from "./Todolist.tsx";
import {AddItemForm} from "./AddItemForm.tsx";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from '@mui/icons-material';
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC
} from "./state/todolists/todolists-reducer.ts";
import {useDispatch, useSelector} from "react-redux";
import type {AppRootState} from "./state/store.ts";

export type FilterValuesType = "all" | "completed" | "active";

export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TaskStateType = {
    [key: string]: Array<TaskType>
}

function AppWithRedux() {

    const dispatch = useDispatch();
    const todoLists = useSelector<AppRootState, Array<TodolistType>>(state => state.todolists);



    function changeFilter(value: FilterValuesType, todoListId: string) {
        dispatch(changeTodolistFilterAC(todoListId, value));
    }

    function removeTodolist(todoListId: string) {
        const action = removeTodolistAC(todoListId);
        dispatch(action);
    }

    function changeTodolistTitle(id: string, newTitle: string) {
        dispatch(changeTodolistTitleAC(id, newTitle));
    }

    function addTodolist(title: string) {
        const action = addTodolistAC(title);
        dispatch(action);
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

                        return (
                            <Grid>
                                <Paper style={{padding: "10px"}}>
                                    <Todolist key={todoList.id}
                                              id={todoList.id}
                                              title={todoList.title}
                                              changeFilter={changeFilter}
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

export default AppWithRedux
