import {createReducer, on} from "@ngrx/store";
import {Action} from "@ngrx/store";
import {
    loadTodo, loadTodoFailed, loadTodos,
    loadTodosFailed, loadTodosSuccess, loadTodoSuccess
} from "../actions/todo.actions";
import { ITodo } from "../todo-api.service";

export interface IStatus {
    loading: boolean;
    error: Error | null;
    loaded: boolean;
    loadingTodoById: boolean;
    errorTodoById: Error | null;
}

export interface IUiState {
    todoStatus: IStatus;
}

export const initialState: IUiState = {
    todoStatus: {
        loading: false,
        loaded: false,
        loadingTodoById: false,
        errorTodoById: null,
        error: null,
    },
};

const reducer = createReducer(initialState,
    on(loadTodos, (state) => {
        return {
            ...state,
            todoStatus: {
                loading: true,
                error: null,
                loaded: false,
                loadingTodoById: false,
                errorTodoById: null,
            },
        };
    }),
    on(loadTodosSuccess, (state) => {
        return {
            ...state,
            todoStatus: {
                loading: false,
                error: null,
                loaded: true,
                loadingTodoById: false,
                errorTodoById: null,
            },
        };
    }),
    on(loadTodosFailed, (state, {error}) => {
        return {
            ...state,
            todoStatus: {
                loading: false,
                error,
                loaded: false,
                loadingTodoById: false,
                errorTodoById: null,
            },
        };
    }),
    on(loadTodo, (state) => {
        return {
            ...state,
            todoStatus: {
                loading: false,
                error: null,
                loaded: false,
                loadingTodoById: true,
                errorTodoById: null,
            },
        };
    }),
    on(loadTodoSuccess, (state) => {
        return {
            ...state,
            todoStatus: {
                loading: false,
                error: null,
                loaded: false,
                loadingTodoById: false,
                errorTodoById: null,
            },
        };
    }),
    on(loadTodoFailed, (state, {error}) => {
        return {
            ...state,
            todoStatus: {
                loading: false,
                error: null,
                loaded: false,
                loadingTodoById: false,
                errorTodoById: error,
            },
        };
    }));

export function uiReducer(state: IUiState | undefined, action: Action) {
    return reducer(state, action);
}



