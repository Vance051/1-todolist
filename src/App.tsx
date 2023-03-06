import React, {useState} from 'react';
import './App.css';
import TodoList from "./TodoList";

export type TaskType = {
    id: number,
    title: string,
    isDone: boolean
}
export type FilterValuesType = 'all' | 'active' | 'completed'

function App(): JSX.Element {

    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: 1, title: "HTML & CSS", isDone: true},
        {id: 2, title: "CSS & SCSS", isDone: true},
        {id: 3, title: "samuraiWay SCSS", isDone: false},
        {id: 4, title: "Redux", isDone: false},
    ])
    const removeTask = (taskId: number) => {
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
                changeTodoListFilter={changeTodoListFilter}/>
        </div>
    );
}

export default App;
