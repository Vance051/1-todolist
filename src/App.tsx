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
    todoListId: string
    todoTitle: string
    tasks: TaskType[]
    removeTask: (todoListId: string, taskId: string) => void
    changeFilterValue: (todoListId: string, filter: FilterValuesType) => void
    addTask: (todoListId: string, newTaskTitle: string) => void
    changeTaskStatus: (todoListId: string, taskId: string, isDone: boolean) => void
    filter: FilterValuesType
    removeTodoList: (todoListId: string) => void
}
type todolistsType = { id: string, title: string, filter: FilterValuesType }
export type FilterValuesType = 'All' | 'Active' | 'Completed'

function App() {
    let todolistID1 = v1();
    let todolistID2 = v1();

    let [todolists, setTodolists] = useState<Array<todolistsType>>([
        {id: todolistID1, title: 'What to learn', filter: 'All'},
        {id: todolistID2, title: 'What to buy', filter: 'All'},
    ])

    let [tasks, setTasks] = useState({
        [todolistID1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: "HTML&CSS2", isDone: true},
            {id: v1(), title: "JS2", isDone: true},
            {id: v1(), title: "ReactJS2", isDone: false},
            {id: v1(), title: "Rest API2", isDone: false},
            {id: v1(), title: "GraphQL2", isDone: false},
        ]
    });


    const removeTodoList = (todoListId: string) => {
        setTodolists(todolists.filter(todolist => todolist.id !== todoListId))
        delete tasks[todoListId]
    }
    const addTask = (todoListId: string, newTaskTitle: string) => {
        const newTask: TaskType = {id: v1(), title: newTaskTitle, isDone: false}
        setTasks({...tasks, [todoListId]: [newTask, ...tasks[todoListId]]})
    }
    const removeTask = (todoListId: string, taskId: string) => {
        setTasks({...tasks, [todoListId]: tasks[todoListId].filter(task => task.id !== taskId)})
    }
    const changeTaskStatus = (todoListId: string, taskId: string, isDone: boolean) => {
        setTasks({
            ...tasks,
            [todoListId]: tasks[todoListId].map(task => task.id === taskId ? {...task, isDone: isDone} : task)
        })

        // setTasks(tasks.map(t => t.id === taskId ? {...t, isDone: isDone} : t))
    }
    const changeFilterValue = (todoListId: string, filter: FilterValuesType) => {
        // setFilter(filter)
        setTodolists(todolists.map(el => el.id === todoListId ? {...el, filter: filter} : el))
    }

    //UI---------------------------------
    return (
        <div className="App">
            {todolists.map(el => {
                let taskForTodoList = tasks[el.id];
                switch (el.filter) {
                    case "Active":
                        taskForTodoList = tasks[el.id].filter(t => !t.isDone)
                        break
                    case "Completed":
                        taskForTodoList = tasks[el.id].filter(t => t.isDone)
                        break
                    // default:
                    //     taskForTodoList = tasks
                    //     break
                }
                return (
                    <TodoList
                        key={el.id}
                        todoListId={el.id}
                        todoTitle={el.title}
                        tasks={taskForTodoList}
                        removeTask={removeTask}
                        changeFilterValue={changeFilterValue}
                        addTask={addTask}
                        changeTaskStatus={changeTaskStatus}
                        filter={el.filter}
                        removeTodoList={removeTodoList}
                    />
                )
            })}

        </div>
    );
}

export default App;
