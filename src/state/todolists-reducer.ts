import {FilterValuesType, TodolistType} from "../App";


type TodoListReducerType = RemoveTodolListACType | AddTodolListACType | ChangeTodoListTitleAC | ChangeTodoListFilterAC
type RemoveTodolListACType = ReturnType<typeof removeTodolListAC>
type AddTodolListACType = ReturnType<typeof addTodolListAC>
type ChangeTodoListTitleAC = ReturnType<typeof changeTodoListTitleAC>
type ChangeTodoListFilterAC = ReturnType<typeof changeTodoListFilterAC>
export const removeTodolListAC = (id: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        payload: {id}
    } as const
}

export const addTodolListAC = (newTodolistId:string, title: string) => {
    return {
        type: 'ADD-TODOLIST',
        payload: {newTodolistId,title}
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
            const newTodolistId = action.payload.newTodolistId
            const newTodoLists: TodolistType = {id: newTodolistId, title: action.payload.title, filter: "all"}
            return [newTodoLists, ...state]
        }
        case "CHANGE-TODOLIST-TITLE":
            return state.map(tl => tl.id === action.payload.id ? {...tl, title: action.payload.title} : tl)
        case "CHANGE-TODOLIST-FILTER":
            return state.map(tl => tl.id === action.payload.id ? {...tl, filter: action.payload.filter} : tl)
        default:
            return state
    }

}