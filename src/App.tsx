import React, {useState} from 'react';
import './App.css';
import {TodoList} from "./Components/TodoList";
import {v1} from "uuid";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type PropsTodoList = {
    todoTitle: string
    tasks: TaskType[]
    removeTask: (taskId: string) => void
    changeFilterValue: (filter: FilterType) => void
    addTask:(newTaskTitle:string)=>void

}
export type FilterType = 'All' | 'Active' | 'Completed'

function App() {

    const [tasks, setTasks] = useState<Array<TaskType>>(
        [
            {id: v1(), title: 'css', isDone: true},
            {id: v1(), title: 'Js', isDone: true},
            {id: v1(), title: 'Js', isDone: false},
            {id: v1(), title: 'Js', isDone: true},
            {id: v1(), title: 'React', isDone: false},])

    const addTask = (newTaskTitle:string) => {
        const newTask: TaskType = {id: v1(), title: newTaskTitle, isDone: false}
        const newTasks: TaskType[] = [newTask, ...tasks]
        setTasks(newTasks)
    }

    const [filter, setFilter] = useState<FilterType>('All')

    const todoTitle1: string = 'What to learn'

    const removeTask = (taskId: string) => {
        const nextState: TaskType[] = tasks.filter(t => t.id !== taskId)
        setTasks(nextState)
    }

    let taskForTodoList: TaskType[]
    switch (filter) {
        case "Active":
            taskForTodoList = tasks.filter(t => !t.isDone)
            break
        case "Completed":
            taskForTodoList = tasks.filter(t => t.isDone)
            break
        default:
            taskForTodoList = tasks
            break
    }
    const changeFilterValue = (filter: FilterType) => {
        setFilter(filter)
    }

    //UI---------------------------------
    return (
        <div className="App">
            <TodoList
                todoTitle={todoTitle1}
                tasks={taskForTodoList}
                removeTask={removeTask}
                changeFilterValue={changeFilterValue}
                addTask={addTask}
            />
        </div>
    );
}

export default App;
