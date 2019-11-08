import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType, ROOT_EFFECTS_INIT } from "@ngrx/effects";

import { of } from "rxjs";
import { catchError, map, mergeMap, switchMap } from "rxjs/operators";
import {
  loadTodo,
  loadTodoFailed,
  loadTodos,
  loadTodosFailed,
  loadTodosSuccess,
  loadTodoSuccess,
} from "../actions/todo.actions";
import { TodoApiService } from "../todo-api.service";

@Injectable()
export class TodoEffects {

  public init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ROOT_EFFECTS_INIT),
      map(actions => loadTodos)
    ));

  public loadTodos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadTodos),
      switchMap(() => this.todoApi.getList().pipe(
        map((todos) => loadTodosSuccess({ data: todos })),
        catchError((error) => of(loadTodosFailed({ error }))),
      )),
    ),
  );

  public loadTodo$ = createEffect(() =>
  this.actions$.pipe(
      ofType(loadTodo),
      mergeMap((action) =>
        this.todoApi.getTodo(action.id).pipe(
          map((todo) => loadTodoSuccess({ data: todo })),
          catchError((error) => of(loadTodoFailed({ error }))),
        ),
      ),
    ),
  );

  constructor(private actions$: Actions, private todoApi: TodoApiService) {}
}
