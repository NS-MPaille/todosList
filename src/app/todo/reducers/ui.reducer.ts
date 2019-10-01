import {createReducer, on} from "@ngrx/store";
import {Action} from "@ngrx/store";
import {
    loadTodo, loadTodoFailed, loadTodos,
    loadTodosFailed, loadTodosSuccess, loadTodoSuccess
} from "../actions/todo.actions";


export enum IStatus {
    NotLoaded,
    Loading, 
    Loaded, 
    Error
}

export interface IUiState {
    todoStatus: IStatus;
}

export const initialState: IUiState = {
    todoStatus: IStatus.NotLoaded,
};



const reducer = createReducer(initialState,
    on(loadTodos, (state) => {
        return {
            ...state,
            todoStatus: IStatus.Loading,
        };
    }),
    on(loadTodosSuccess, (state) => {
        return {
            ...state,
            todoStatus: IStatus.Loaded,
        };
    }),
    on(loadTodosFailed, (state, {error}) => {
        return {
            ...state,
            todoStatus: IStatus.Error,
        };
    }),
    on(loadTodo, (state) => {
        return {
            ...state,
            todoStatus: IStatus.Loading,
        };
    }),
    on(loadTodoSuccess, (state) => {
        return {
            ...state,
            todoStatus: IStatus.Loaded,
        };
    }),
    on(loadTodoFailed, (state, {error}) => {
        return {
            ...state,
            todoStatus: IStatus.Error,
        };
    }));

export function uiReducer(state: IUiState | undefined, action: Action) {
    return reducer(state, action);
}



