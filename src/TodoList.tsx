import React, {FC} from 'react';
import {FilterValuesType, TaskType} from "./App";


type TodoListPropsType = {
    title: string,
    tasks: Array<TaskType>
    removeTasks: (taskId: number) => void
    changeTodoListFilter: (filter: FilterValuesType) => void
}
const TodoList: FC<TodoListPropsType> = (props) => {
    let isAllTaskIsMotDone = true;
    for (let i = 0; i < props.tasks.length; i++) {
        if (props.tasks[i].isDone) {
            isAllTaskIsMotDone = false
            break;
        }
    }
    const todoClasses = isAllTaskIsMotDone ? "todolist-empty" : "todolist";

    const todoListItems: Array<JSX.Element> = props.tasks.map((task) => {
        return (<li>
            <input type="checkbox" checked={task.isDone}/> <span>{task.title}</span>
            <button onClick={() =>
                (props.removeTasks(task.id))}>Delete
            </button>
        </li>)
    }) // Array<JSX.Element>

    return (
        <div className={todoClasses}>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>Add new Task</button>
            </div>
            <ul>
                {todoListItems}
            </ul>
            <div>
                <button onClick={() =>
                    (props.changeTodoListFilter('all'))}>All
                </button>
                <button onClick={() =>
                    (props.changeTodoListFilter('active'))}>Active
                </button>
                <button onClick={() =>
                    (props.changeTodoListFilter('completed'))}>Completed
                </button>
            </div>
        </div>
    );
};

export default TodoList;