import {FilterValuesType, TodolistType} from "../App";


type TodoListReducerType = RemoveTodoListACType | AddTodoListACType | ChangeTodoListTitleAC | ChangeTodoListFilterAC
export type RemoveTodoListACType = ReturnType<typeof removeTodoListAC>
export type AddTodoListACType = ReturnType<typeof addTodoListAC>
type ChangeTodoListTitleAC = ReturnType<typeof changeTodoListTitleAC>
type ChangeTodoListFilterAC = ReturnType<typeof changeTodoListFilterAC>
export const removeTodoListAC = (id: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        payload: {id}
    } as const
}

export const addTodoListAC = (id:string, title: string) => {
    return {
        type: 'ADD-TODOLIST',
        payload: {title, todoListId: id}
    } as const
}
export const changeTodoListTitleAC = (id: string, title: string) => {
    return {
        type: "CHANGE-TODOLIST-TITLE",
        payload: {id, title}
    } as const
}
export const changeTodoListFilterAC = (id: string, filter: FilterValuesType) => {
    return {
        type: "CHANGE-TODOLIST-FILTER",
        payload: {id, filter}
    } as const
}
export const todolistsReducer = (state: TodolistType[], action: TodoListReducerType): TodolistType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST' : {
            return state.filter(tl => tl.id !== action.payload.id)
        }
        case 'ADD-TODOLIST' : {
            return [{id: action.payload.todoListId, title: action.payload.title, filter: "all"}, ...state]
        }
        case "CHANGE-TODOLIST-TITLE":
            return state.map(tl => tl.id === action.payload.id ? {...tl, title: action.payload.title} : tl)
        case "CHANGE-TODOLIST-FILTER":
            return state.map(tl => tl.id === action.payload.id ? {...tl, filter: action.payload.filter} : tl)
        default:
            return state
    }

}