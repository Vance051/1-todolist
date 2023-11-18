import React, {FC} from "react";
import {PropsTodoList} from "../App";
import Button from "./Button";


export const TodoList: FC<PropsTodoList> = (
    {todoTitle, tasks}) => {

    // const {todoTitle, tasks} = props
    const ButtonFoo = (name: string) => {
        console.log(`Its ${name}  Button`)
    }

    return (
        <div>
            <h3>{todoTitle}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {tasks.length ? tasks.map((task) => (
                    <li><input type="checkbox" checked={task.isDone}/> <span>{task.title}</span>
                        <button>Delete</button>
                    </li>
                )) : <span>The list is empty</span>}
            </ul>
            <div>
                {/*<button onClick={(event: React.MouseEvent<HTMLButtonElement>) => onClickHandler('All')}>All</button>*/}
                {/*<button onClick={(event: React.MouseEvent<HTMLButtonElement>) => onClickHandler('Active')}>Active*/}
                {/*</button>*/}
                {/*<button*/}
                {/*    onClick={(event: React.MouseEvent<HTMLButtonElement>) => onClickHandler('Completed')}>Completed*/}
                {/*</button>*/}

                <Button callBack={() => ButtonFoo('All')} name={'All'}/>
                <Button callBack={() => ButtonFoo("Active")} name={'Active'}/>
                <Button callBack={() => ButtonFoo('Completed')} name={'Completed'}/>

            </div>
        </div>)
}