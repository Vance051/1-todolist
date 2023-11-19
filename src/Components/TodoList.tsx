import React, {FC} from "react";
import {FilterType, PropsTodoList} from "../App";
import Button from "./Button";


export const TodoList: FC<PropsTodoList> = (
    {todoTitle, tasks, removeTask, changeFilterValue}) => {

    const removeTaskHandler = (taskId: number) => {
        removeTask(taskId)
    }

    const newFilter = (filter:FilterType) => {
        changeFilterValue(filter)
    }

    const listItems: JSX.Element[] = tasks.map((task) => (
        <li key={task.id}><input type="checkbox" checked={task.isDone}/> <span>{task.title}</span>
            {/*<button onClick={(event: React.MouseEvent<HTMLButtonElement>) => removeTaskHandler(task.id)}>Delete</button>*/}
            <Button name={'Del'} callBack={()=>removeTaskHandler(task.id)}/>
        </li>
    ))
    return (
        <div>
            <h3>{todoTitle}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            {tasks.length
                ?
                <ul>{listItems}</ul>
                : <span>The list is empty</span>}
            <div>

                <Button callBack={()=>newFilter('All')} name={'All'}/>
                <Button callBack= {()=>newFilter("Active")} name={'Active'}/>
                <Button callBack={()=>newFilter('Completed')} name={'Completed'}/>

            </div>
        </div>)
}