import { Update } from "@ngrx/entity";
import { createAction, props } from "@ngrx/store";
import {ITodo} from "../todo-api.service";

export const loadTodos = createAction("[Todo] Load Todos");
export const loadTodosSuccess = createAction("[Todo] Load Todos success", props<{data: ITodo[]}>());
export const loadTodosFailed = createAction("[Todo] Load Todos failed", props<{error: Error}>());
export const addTodo = createAction("[Todo] Add Todo", props<{data: ITodo}>());
export const deleteTodo = createAction("[Todo] Remove Todo", props<{id: number}>());
export const updateTodo = createAction("[Todo] Update Todo", props<{todoUpdate: Update<ITodo>}>());
export const loadTodo = createAction("[Todo] Load Todo", props<{id: number}>());
export const loadTodoSuccess = createAction("[Todo] Load Todo success", props<{data: ITodo}>());
export const loadTodoFailed = createAction("[Todo] Load Todo failed", props<{error: Error}>());
