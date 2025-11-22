import './App.css'
import {type TaskType, Todolist} from "./Todolist.tsx";
import {useState} from "react";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm.tsx";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from '@mui/icons-material';

export type FilterValuesType = "all" | "completed" | "active";

export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

type TaskStateType = {
    [key: string]: Array<TaskType>
}

function App() {

    const todoList1 = v1();
    const todoList2 = v1();

    const [todoLists, setTodoLists] = useState<Array<TodolistType>>([
        {id: todoList1, title: "What to learn", filter: "all"},
        {id: todoList2, title: "What to buy", filter: "all"},
    ]);

    function removeTodolist(todoListId: string) {
        setTodoLists(todoLists.filter(todoList => todoList.id !== todoListId));

        delete tasksObj[todoListId];
        setTasksObj({...tasksObj});
    };

    function removeTask(id: string, todolistId: string) {

        const tasks = tasksObj[todolistId];

        const filteredTasks = tasks.filter(task => task.id !== id);
        tasksObj[todolistId] = filteredTasks;
        setTasksObj({...tasksObj});
    }

    function addTask(title: string, todolistId: string) {
        const newTask = {id: v1(), title: title, isDone: false};
        const tasks = tasksObj[todolistId];
        const newTasks = [newTask, ...tasks]
        tasksObj[todolistId] = newTasks;

        setTasksObj({...tasksObj});
    }

    function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
        const tasks = tasksObj[todolistId];
        const task = tasks.find(task => task.id === taskId);
        if (task) {
            task.isDone = isDone;
            setTasksObj({...tasksObj});
        }
    }

    function changeTaskTitle(taskId: string, newTitle: string, todolistId: string) {
        const tasks = tasksObj[todolistId];
        const task = tasks.find(task => task.id === taskId);
        if (task) {
            task.title = newTitle;
            setTasksObj({...tasksObj});
        }
    }

    function changeFilter(value: FilterValuesType, todoListId: string) {
        const todoList = todoLists.find(todoList => todoList.id === todoListId);
        if (todoList) {
            todoList.filter = value;
            setTodoLists([...todoLists]);
        }
    }

    const [tasksObj, setTasksObj] = useState<TaskStateType>({
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

    function changeTodolistTitle(id: string, newTitle: string) {
        // const todoList = todoLists.find(todoList => todoList.id === id);
        // if (todoList) {
        //     todoList.title = newTitle;
        //     setTodoLists([...todoLists])
        // }

        //Это переписанная логика но без мутации оригинального массива
        setTodoLists(todoLists =>
            todoLists.map(todoList =>
                todoList.id === id
                    ? {...todoList, title: newTitle}
                    : todoList))
    }

    function addTodolist(title: string) {
        const todolist: TodolistType = {
            id: v1(),
            filter: "all",
            title: title,
        };

        setTodoLists([todolist, ...todoLists])
        setTasksObj({
            ...tasksObj,
            [todolist.id]: []
        })
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

export default App
