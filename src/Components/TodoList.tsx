import React, {ChangeEvent, FC, KeyboardEvent, useState} from "react";
import {FilterType, PropsTodoList} from "../App";
import Button from "./Button";


export const TodoList: FC<PropsTodoList> = (props) => {
   const {todoTitle, tasks, removeTask, changeFilterValue, addTask, changeTaskStatus, filter} = props
    const [newTaskTitle, setNewTaskTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const newFilter = (filter: FilterType) => {
        changeFilterValue(filter)
    }


    const taskList: JSX.Element[] = tasks.map((task) => {
        const  onChangeTaskStatus = (event: ChangeEvent<HTMLInputElement>) => {
            changeTaskStatus(task.id, event.currentTarget.checked)
        }
        const removeTaskHandler = (taskId: string) => {
            removeTask(taskId)
        }
        return (<li className={task.isDone ? 'task-done' : 'task'} key={task.id}>
            <input
                type="checkbox"
                onChange={onChangeTaskStatus}
                checked={task.isDone}
            />
            <span>{task.title}</span>
            <Button name={'Del'} callBack={() => removeTaskHandler(task.id)}/>
        </li>)

    })


    const onChangeTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(event.currentTarget.value)
    } // получаем текущее значение в инпуте и сетаем его

    const onClickToAddTaskHandler = () => {

        if (newTaskTitle.trim()) {
            addTask(newTaskTitle.trim())
            setNewTaskTitle('')

        } else {
            setError('Title is required')
            setNewTaskTitle('')
            // add an error is title is empty
        }
    } //сетаем тайтл вновую таску

    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
         setError(null)
        if (event.key === 'Enter') {
            onClickToAddTaskHandler()
        }
    } //сетаем тайтл вновую таску


    const maxTitleLengthError = newTaskTitle.length > 15

    return (
        <div>
            <h3>{todoTitle}</h3>

            <div>
                <input className={error ? 'error' : ''} value={newTaskTitle}
                       onChange={onChangeTitleHandler}
                       onKeyDown={onKeyPressHandler}
                />

                {maxTitleLengthError && <div style={{color: 'red'}}>title is too long</div>}
                <button
                    disabled={!newTaskTitle || maxTitleLengthError}
                    onClick={onClickToAddTaskHandler}

                >+
                </button>
                {error && <div className={error ? 'error-message' : ''}>{error}</div>}
            </div>
            {tasks.length //условный рендеринг
                ?
                <ul>{taskList}</ul>
                : <span>The list is empty</span>
            }
            <div>
                <Button classes={filter==='All'? 'active-filter' :''} callBack={() => newFilter('All')} name={'All'}/>
                <Button classes={filter==='Active'? 'active-filter' :''} callBack={() => newFilter("Active")} name={'Active'}/>
                <Button classes={filter==='Completed'? 'active-filter' :''} callBack={() => newFilter('Completed')} name={'Completed'}/>
            </div>
        </div>)
}




