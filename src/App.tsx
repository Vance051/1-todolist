import React from 'react';
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
}

function App() {
    //BLL
    const todoTitle1: string = 'What to learn'
    const task1: TaskType[] = [
        {id: 1, title: 'css', isDone: true},
        {id: 2, title: 'Js', isDone: true},
        {id: 3, title: 'React', isDone: false},
    ]


    //UI---------------------------------
    return (
        <div className="App">
            <TodoList
                todoTitle={todoTitle1}
                tasks={task1}/>

        </div>
    );
}

export default App;
