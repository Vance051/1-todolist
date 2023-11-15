import React from "react";

export type TaskType = {
    id: number
title:string
isDone:boolean}
type PropsTodoList = {
    title: string
    tasks: TaskType[]
}
export const TodoList = (props: PropsTodoList) => {
    return (<div>
        <h3>{props.title}</h3>
        <div>
            <input/>
            <button>+</button>
        </div>
        <ul>
            {props.tasks.map((task)=>(<li><input type="checkbox" checked={task.isDone}/> <span>{task.title}</span></li>))}
            <li><input type="checkbox" checked={props.tasks[0].isDone}/> <span>{props.tasks[0].title}</span></li>
            <li><input type="checkbox" checked={props.tasks[1].isDone}/> <span>{props.tasks[1].title}</span></li>
            <li><input type="checkbox" checked={props.tasks[2].isDone}/> <span>{props.tasks[2].title}</span></li>
                   </ul>
        <div>
            <button>All</button>
            <button>Active</button>
            <button>Completed</button>
        </div>
    </div>)
}