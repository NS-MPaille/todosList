import { ActionReducerMap } from "@ngrx/store";
import {todoReducer, ITodoState} from "./todo.reducer";
import {uiReducer, IUiState} from "./ui.reducer";

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
