import {createEntityAdapter, EntityAdapter, EntityState} from "@ngrx/entity";
import {createReducer, on} from "@ngrx/store";
import {Action} from "@ngrx/store";
import {addTodo, deleteTodo, loadTodosSuccess, loadTodoSuccess, updateTodo} from "../actions/todo.actions";
import {ITodo} from "../todo-api.service";


export interface ITodoState extends EntityState<ITodo> {
}

export function selectTodoId(todo: ITodo) {
    return todo.id;
}

export function sortById(a: ITodo, b: ITodo) {
    return a.id > b.id ? -1 : 1;
}

export function sortByCompleted(a: ITodo, b: ITodo) {
    return (a.completed === b.completed) ? 0 : a.completed ? 1 : -1;
}

export const adapter: EntityAdapter<ITodo> = createEntityAdapter<ITodo>({
    selectId: selectTodoId,
    sortComparer: sortByCompleted,
});

export const initialState: ITodoState = adapter.getInitialState();

const reducer = createReducer(initialState,
    on(loadTodosSuccess, (state, {data}) => {
        return adapter.addAll(data, state);
    }),
    on(addTodo, (state, {data}) => {
        return adapter.addOne(data, state);
    }),
    on(deleteTodo, (state, {id}) => {
        return adapter.removeOne(id, state);
    }),
    on(updateTodo, (state, {todoUpdate}) => {
        return adapter.updateOne(todoUpdate, state);
    }),
    on(loadTodoSuccess, (state, {data}) => {
        return adapter.upsertOne(data, state);
    }),
);

export function todoReducer(state: ITodoState | undefined, action: Action) {
    return reducer(state, action);
}

const {
    selectAll, selectIds, selectEntities,
} = adapter.getSelectors();

export const getAllTodos = selectAll;
export const getTodoEntities = selectEntities;
export const getTodosIds = selectIds;
