import React from 'react';
import './App.css';
import {TaskType, TodoList} from "./TodoList";


function App() {
    let task1:TaskType[] = [
        {id:1, title:'css', isDone:true},
        {id:2, title:'Js', isDone:true},
        {id:3, title:'React', isDone:false},
    ]
    let task2:TaskType[] = [
        {id:1, title:'Reeeead', isDone:true},
        {id:2, title:'Ruun', isDone:true},
        {id:3, title:'Sleep', isDone:false},
    ]
    return (
        <div className="App">
            <TodoList title='WHat to leeeeern' tasks={task1}/>
            <TodoList title='WHat to doooooo' tasks={task2}/>
        </div>
    );
}

export default App;
