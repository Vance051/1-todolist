import React, {useReducer} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from './AddItemForm';
import ButtonAppBar from "./ButtonAppBar";
import {Container, Grid, Paper} from "@mui/material";
import {
    addTodoListAC,
    changeTodoListFilterAC,
    changeTodoListTitleAC,
    removeTodoListAC,
    todolistsReducer
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";

export type FilterValuesType = "all" | "active" | "completed";
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}


function App() {
    function removeTask(id: string, todolistId: string) {
        disPatchTasks(removeTaskAC(id, todolistId))
    }

    function addTask(title: string, todolistId: string) {
        disPatchTasks(addTaskAC(title, todolistId))
    }

    function changeFilter(value: FilterValuesType, todolistId: string) {
        disPatchTodoLists(changeTodoListFilterAC(todolistId, value))
    }

    function changeStatus(id: string, isDone: boolean, todolistId: string) {
        disPatchTasks(changeTaskStatusAC(id, isDone, todolistId))
    }

    function changeTaskTitle(id: string, newTitle: string, todolistId: string) {
        disPatchTasks(changeTaskTitleAC(id, newTitle, todolistId))
    }

    function removeTodolist(id: string) {
        // // засунем в стейт список тудулистов, id которых не равны тому, который нужно выкинуть
        // setTodoLists(todoLists.filter(tl => tl.id !== id));
        // // удалим таски для этого тудулиста из второго стейта, где мы храним отдельно таски
        // delete tasks[id]; // удаляем св-во из объекта... значением которого являлся массив тасок
        // // засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
        // setTasks({...tasks});
        disPatchTodoLists(removeTodoListAC(id))

    }

    function changeTodolistTitle(id: string, title: string) {
        // // найдём нужный todolist
        // const todolist = todoLists.find(tl => tl.id === id);
        // if (todolist) {
        //     // если нашёлся - изменим ему заголовок
        //     todolist.title = title;
        //     setTodoLists([...todoLists]);
        // }
        disPatchTodoLists(changeTodoListTitleAC(id, title))

    }

    let todolistId1 = v1();
    let todolistId2 = v1();

    // let [todoLists, setTodoLists] = useState<Array<TodolistType>>([
    //     {id: todolistId1, title: "What to learn", filter: "all"},
    //     {id: todolistId2, title: "What to buy", filter: "all"}
    // ])
    let [state, disPatchTodoLists] = useReducer(todolistsReducer, [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ])

    let [stateTask, disPatchTasks] = useReducer(tasksReducer, {
        [todolistId1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true}
        ],
        [todolistId2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "React Book", isDone: true}
        ]
    });

    function addTodolist(title: string) {
        let newId = v1()
        disPatchTodoLists(addTodoListAC(newId, title))
        disPatchTasks(addTodoListAC(newId, title))
    }

    return (
        <div className="App">
            <ButtonAppBar/>

            <Container maxWidth="md">

                <Grid container style={{margin: '20px'}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {
                        state.map(tl => {
                            let allTodolistTasks = stateTask[tl.id];
                            let tasksForTodolist = allTodolistTasks;

                            if (tl.filter === "active") {
                                tasksForTodolist = allTodolistTasks.filter(t => !t.isDone);
                            }
                            if (tl.filter === "completed") {
                                tasksForTodolist = allTodolistTasks.filter(t => t.isDone);
                            }

                            return <Grid item>
                                <Paper elevation={3} style={{padding: '20px'}}>
                                    <Todolist
                                        key={tl.id}
                                        id={tl.id}
                                        title={tl.title}
                                        tasks={tasksForTodolist}
                                        removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        addTask={addTask}
                                        changeTaskStatus={changeStatus}
                                        filter={tl.filter}
                                        removeTodolist={removeTodolist}
                                        changeTaskTitle={changeTaskTitle}
                                        changeTodolistTitle={changeTodolistTitle}
                                    />
                                </Paper>
                            </Grid>

                        })
                    }
                </Grid>

            </Container>

        </div>
    )
        ;
}

export default App;
