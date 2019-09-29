import { ActionReducerMap } from '@ngrx/store';
import {todoReducer, TodoState} from "./todo.reducer";
import {uiReducer, UiState} from "./ui.reducer";

export const todoFeatureKey = 'module-todo';

export interface ModuleTodoState {
    ui: UiState
    todo: TodoState
}

export interface State {
    [todoFeatureKey]: ModuleTodoState
}

export const moduleTodoReducer: ActionReducerMap<ModuleTodoState> = {
    ui: uiReducer,
    todo: todoReducer
};