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
        const filteredTasks = tasks.filter(task => task.id !== id);
        setTasks(filteredTasks);
    }
    
    function addTask(title: string) {
        const newTask = {id: v1(), title: title, isDone: false};
        const newTasks = [newTask, ...tasks]
        setTasks(newTasks);
    }

    function changeStatus(taskId: string, isDone: boolean) {
        const task = tasks.find(task => task.id === taskId);
        if (task) {
            task.isDone = isDone;
        }
        setTasks([...tasks]);
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
                      changeTaskStatus={changeStatus}
                      filter={filter}
            />
        </>
    );
}

export default App
