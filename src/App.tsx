import './App.css'
import {type TaskType, Todolist} from "./Todolist.tsx";
import {useState} from "react";
import {v1} from "uuid";

export type FilterValuesType = "all" | "completed" | "active";

function App() {

    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "React", isDone: false},
        {id: v1(), title: "Redux", isDone: false},
    ]);
    const [filter, setFilter] = useState<FilterValuesType>('all');

    function removeTask(id: string) {
        let filteredTasks = tasks.filter(task => task.id !== id);
        setTasks(filteredTasks);
    }
    
    function addTask(title: string) {
        let newTask = {id: v1(), title: title, isDone: false};
        let newTasks = [newTask, ...tasks]
        setTasks(newTasks);
    }
    
    function changeFilter(value: FilterValuesType) {
        setFilter(value);
    }

    let tasksForTodoList = tasks;
    if (filter === "completed") {
        tasksForTodoList = tasks.filter(task => task.isDone);
    }
    if (filter === "active") {
        tasksForTodoList = tasks.filter(task => !task.isDone);
    }

    return (
        <>
            <Todolist title="What to learn"
                      tasks={tasksForTodoList}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      addTask={addTask}
            />
        </>
    );
}

export default App
