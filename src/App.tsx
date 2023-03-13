import React, {useState} from 'react';
import './App.css';
import TodoList from "./TodoList";
import {v1} from "uuid";

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}
export type FilterValuesType = 'all' | 'active' | 'completed'

function App(): JSX.Element {

    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: "HTML & CSS", isDone: true},
        {id: v1(), title: "CSS & SCSS", isDone: true},
        {id: v1(), title: "samuraiWay SCSS", isDone: false},
        {id: v1(), title: "Redux", isDone: false},
    ])

    const addTask = (newTitle:string) => {
       const newTask = {id: v1(), title: newTitle, isDone: false}
        setTasks([newTask, ...tasks])
    }

    const removeTask = (taskId: string) => {
        setTasks(tasks.filter((task) => task.id !== taskId))
    }

    const changeTodoListFilter = (filter: FilterValuesType) => {
        setFilter(filter)
    }

    // фильтруем на активные все или выполненные
    const [filter, setFilter] = useState<FilterValuesType>('all')
    let tasksForRender: Array<TaskType> = []
    if (filter === 'all') {
        tasksForRender = tasks
    }
    if (filter === 'active') {
        tasksForRender = tasks.filter(task => !task.isDone)
    }
    if (filter === 'completed') {
        tasksForRender = tasks.filter(task => task.isDone)
    }

    return (
        <div className="App">
            <TodoList
                removeTasks={removeTask}
                title={"What to learn"}
                tasks={tasksForRender}
                changeTodoListFilter={changeTodoListFilter}
                addTask={addTask}
            />

        </div>
    );
}

export default App;
