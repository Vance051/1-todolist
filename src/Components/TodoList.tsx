import React, {ChangeEvent, FC, KeyboardEvent, useState} from "react";
import {FilterType, PropsTodoList} from "../App";
import Button from "./Button";


export const TodoList: FC<PropsTodoList> = (
    {todoTitle, tasks, removeTask, changeFilterValue, addTask}) => {

    const removeTaskHandler = (taskId: string) => {
        removeTask(taskId)
    }

    const newFilter = (filter: FilterType) => {
        changeFilterValue(filter)
    }

    const refreshTasks: JSX.Element[] = tasks.map((task) => (
        <li key={task.id}><input type="checkbox" checked={task.isDone}/> <span>{task.title}</span>
            {/*<button onClick={(event: React.MouseEvent<HTMLButtonElement>) => removeTaskHandler(task.id)}>Delete</button>*/}
            <Button name={'Del'} callBack={() => removeTaskHandler(task.id)}/>
        </li>
    ))

    const [newTaskTitle, setNewTaskTitle] = useState('')

    const onChangeTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(event.currentTarget.value)
    } // получаем текущее значение в инпуте и сетаем его

    const onClickToAddTaskHandler = () => {
        addTask(newTaskTitle)
        setNewTaskTitle('')
    } //сетаем тайтл вновую таску

    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        console.log(event)
        if (event.key === 'Enter') {
            addTask(newTaskTitle)
            setNewTaskTitle('')
        }
    } //сетаем тайтл вновую таску
    return (
        <div>
            <h3>{todoTitle}</h3>
            <div>
                <input value={newTaskTitle}
                       onChange={onChangeTitleHandler}
                       onKeyDown={onKeyPressHandler}
                />
                <button
                    onClick={onClickToAddTaskHandler}
                >+
                </button>
            </div>
            {tasks.length //условный рендеринг
                ?
                <ul>{refreshTasks}</ul>
                : <span>The list is empty</span>
            }
            <div>
                <Button callBack={() => newFilter('All')} name={'All'}/>
                <Button callBack={() => newFilter("Active")} name={'Active'}/>
                <Button callBack={() => newFilter('Completed')} name={'Completed'}/>
            </div>
        </div>)
}