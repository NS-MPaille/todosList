import { createFeatureSelector, createSelector } from "@ngrx/store";
import {IModuleTodoState, todoFeatureKey} from "../reducers";
import {getAllTodos, getTodoEntities, getTodosIds} from "../reducers/todo.reducer";

export const getModuleTodoState = createFeatureSelector<IModuleTodoState>(todoFeatureKey);

export const getUiState = createSelector(
    getModuleTodoState,
    (state) => state.ui,
);

export const getTodoState = createSelector(
    getModuleTodoState,
    (state) => state.todo,
);

// UI
export const getTodosStatus = createSelector(
    getUiState,
    (uiState) => uiState.todoStatus,
);

// Data
export const getTodos = createSelector(
    getTodoState,
    getAllTodos,
);

export const getTodoIds = createSelector(
    getTodoState,
    getTodosIds,
);

export const getTodoById = createSelector(
    getTodoState,
    getTodoEntities,
);
