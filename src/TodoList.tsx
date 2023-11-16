import React, {FC} from "react";
import {PropsTodoList} from "./App";


export const TodoList: FC<PropsTodoList> = (
    {todoTitle, tasks}) => {
    // const {todoTitle, tasks} = props
    return (
        <div>
            <h3>{todoTitle}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {tasks.map((task) => (
                    <li><input type="checkbox" checked={task.isDone}/> <span>{task.title}</span></li>))}

            </ul>
            <div>
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>)
}