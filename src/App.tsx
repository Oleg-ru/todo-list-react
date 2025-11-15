import './App.css'
import {type TaskType, Todolist} from "./Todolist.tsx";

function App() {

    let task1: Array<TaskType> = [
        {id: 1, title: "CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "React", isDone: false},
    ]
    let task2: Array<TaskType> = [
        {id: 1, title: "Terminator", isDone: true},
        {id: 2, title: "Naruto", isDone: false},
        {id: 3, title: "Terminator 2", isDone: false},
    ]

    return (
        <>
            <Todolist title="What to learn" tasks={task1}/>
            <Todolist title="Movies" tasks={task2}/>
        </>
    )
}

export default App
