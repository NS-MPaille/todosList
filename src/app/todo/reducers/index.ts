import { ActionReducerMap } from "@ngrx/store";
import {ITodoState, todoReducer} from "./todo.reducer";
import {IUiState, uiReducer} from "./ui.reducer";

export const todoFeatureKey = "module-todo";

export interface IModuleTodoState {
    ui: IUiState;
    todo: ITodoState;
}

export interface IState {
    [todoFeatureKey]: IModuleTodoState;
}

export const moduleTodoReducer: ActionReducerMap<IModuleTodoState> = {
    ui: uiReducer,
    todo: todoReducer,
};
