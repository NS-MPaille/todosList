import {createReducer, on} from '@ngrx/store';
import {EntityState, EntityAdapter, createEntityAdapter} from '@ngrx/entity';
import {addTodo, deleteTodo, loadTodosSuccess, updateTodo, loadTodoSuccess} from '../actions/todo.actions';
import {Todo} from "../todo-api.service";
import {Action} from '@ngrx/store';


export interface TodoState extends EntityState<Todo> {
}

export function selectTodoId(todo: Todo) {
    return todo.id;
}

export function sortById(a: Todo, b: Todo) {
    return a.id > b.id ? -1 : 1;
}

export function sortByCompleted(a: Todo, b: Todo) {
    return (a.completed === b.completed)? 0 :a.completed? 1 : -1;
}

export const adapter: EntityAdapter<Todo> = createEntityAdapter<Todo>({
    selectId: selectTodoId,
    sortComparer: sortByCompleted
});

export const initialState: TodoState = adapter.getInitialState();

const reducer = createReducer(initialState,
    on(loadTodosSuccess, (state, {data}) => {
        return adapter.addAll(data, state);
    }),
    on(addTodo, (state, {data}) => {
        return adapter.addOne(data, state);
    }),
    on(deleteTodo, (state,{id}) => {
        return adapter.removeOne(id, state);
    }),
    on(updateTodo, (state, {todoUpdate}) => {
        return adapter.updateOne(todoUpdate,state);
    }),
    on(loadTodoSuccess, (state, {data}) => {
        return adapter.upsertOne(data, state);
    }),
);

export function todoReducer(state: TodoState | undefined, action: Action) {
    return reducer(state, action);
}

const {
    selectAll, selectIds, selectEntities
} = adapter.getSelectors();

export const getAllTodos = selectAll;
export const getTodoEntities = selectEntities;
export const getTodosIds = selectIds;