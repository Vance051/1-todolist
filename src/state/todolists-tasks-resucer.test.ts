import {TasksStateType, TodolistType} from "../App";
import {addTodoListAC, todolistsReducer} from "./todolists-reducer";
import {tasksReducer} from "./tasks-reducer";


test('Iss should be equals', () => {
    const startTasksSate: TasksStateType = {}
    const startTodolistsState: TodolistType[] = []

    const action = addTodoListAC('43','superTitle')

    const endTasksState = tasksReducer(startTasksSate,action)
    const endTodolistsState = todolistsReducer(startTodolistsState,action)


    const keys = Object.keys(endTasksState)
    const idFromTask = keys[0]
    const idFromTodoLists = endTodolistsState[0].id

    expect(idFromTask).toBe(action.payload.todoListId)
    expect(idFromTodoLists).toBe(action.payload.todoListId)
})