import React from 'react';
import './App.css';
import TodoList from "./TodoList";

export type TaskType = {
    id: number,
    title: string,
    isDone: boolean
}
const tasks: TaskType[] = [
    {id: 1, title: "HTML & CSS", isDone: true},
    {id: 2, title: "CSS & SCSS", isDone: true},
    {id: 3, title: "ES6/TS", isDone: false},
]
const tasks1: TaskType[] = [
    {id: 1, title: "HTML & CSS", isDone: false},
    {id: 2, title: "CSS & SCSS", isDone: true},
    {id: 3, title: "ES6/TS", isDone: false},
]


function App(): JSX.Element {
    return (
        <div className="App">
            <TodoList
                title={"What to learn"}
                tasks={tasks}/>
            <TodoList
                title={"What to learn"}
                tasks={tasks1}/>
        </div>
    );
}

export default App;
