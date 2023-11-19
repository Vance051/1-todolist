import React, {useState} from 'react';
import './App.css';
import {TodoList} from "./Components/TodoList";

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}
export type PropsTodoList = {
    todoTitle: string
    tasks: TaskType[]
    removeTask: (taskId: number) => void
    changeFilterValue:(filter:FilterType)=>void

}
export type FilterType = 'All' | 'Active' | 'Completed'

function App() {

    const [tasks, setTasks] = useState<Array<TaskType>>(
        [
            {id: 1, title: 'css', isDone: true},
            {id: 2, title: 'Js', isDone: true},
            {id: 3, title: 'Js', isDone: false},
            {id: 4, title: 'Js', isDone: true},
            {id: 5, title: 'React', isDone: false},])

    const [filter, setFilter] = useState<FilterType>('All')

    const todoTitle1: string = 'What to learn'

    const removeTask = (taskId: number) => {
        const nextState: TaskType[] = tasks.filter(t => t.id !== taskId)
        setTasks(nextState)
    }

    let taskForTodoList: TaskType[] = tasks
       switch (filter){
        case "Active": taskForTodoList = tasks.filter(t=>!t.isDone)
            break
        case "Completed": taskForTodoList = tasks.filter(t=>t.isDone)
            break
        default:
            taskForTodoList=tasks
            break
    }
    const changeFilterValue = (filter:FilterType) => {
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
            />
        </div>
    );
}

export default App;
