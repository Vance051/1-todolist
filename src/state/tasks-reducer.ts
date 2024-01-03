import {TasksStateType} from "../App";
import {v1} from "uuid";
import {AddTodoListACType, RemoveTodoListACType} from "./todolists-reducer";

type TaskReducerType = RemoveTaskACType
    | AddTaskACType
    | ChangeTaskACType
    | ChangeTitleACType
    | AddTodoListACType
    | RemoveTodoListACType
type RemoveTaskACType = ReturnType<typeof removeTaskAC>
type AddTaskACType = ReturnType<typeof addTaskAC>
type ChangeTaskACType = ReturnType<typeof changeTaskTitleAC>
type ChangeTitleACType = ReturnType<typeof changeTaskStatusAC>

export const removeTaskAC = (id: string, todolistId: string) => {
    return {
        type: 'REMOVE-TASK',
        payload: {id, todolistId}
    } as const
}
export const addTaskAC = (title: string, todolistId: string) => {
    return {
        type: 'ADD-TASK',
        payload: {title, todolistId}
    } as const
}

export const changeTaskTitleAC = (id: string, newTitle: string, todolistId: string) => {
    return {
        type: 'CHANGE-TITLE-TASK',
        payload: {id, todolistId, newTitle}
    } as const
}

export const changeTaskStatusAC = (id: string, isDone: boolean, todolistId: string) => {
    return {
        type: 'CHANGE-STATUS',
        payload: {id, isDone, todolistId}
    } as const
}

export const tasksReducer = (state: TasksStateType, action: TaskReducerType): TasksStateType => {
    switch (action.type) {
        case "REMOVE-TASK": {
            let todolistTasks = state[action.payload.todolistId]
            state[action.payload.todolistId] = todolistTasks.filter(t => t.id !== action.payload.id)
            return {...state}
        }
        case "ADD-TASK": {
            let task = {id: v1(), title: action.payload.title, isDone: false};
            return {
                ...state, [action.payload.todolistId]:
                    [task, ...state[action.payload.todolistId]]
            }
        }
        case "CHANGE-TITLE-TASK": {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(t => t.id === action.payload.id ? {
                    ...t,
                    title: action.payload.newTitle
                } : t)
            }
        }
        case "CHANGE-STATUS": {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(t => t.id === action.payload.id ? {
                    ...t,
                    isDone: action.payload.isDone
                } : t)
            }
        }
        case "ADD-TODOLIST": {
            return {
                [action.payload.todoListId]: [],
                ...state

            }
        }
        case "REMOVE-TODOLIST": {
            const copyState = {...state}
            delete copyState[action.payload.id]
            return copyState
        }
        default:
            return state
    }
}