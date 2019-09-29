import { Injectable } from '@angular/core';
import { Actions, Effect, createEffect, ofType } from '@ngrx/effects';

import { catchError, map, switchMap, mergeMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { TodoApiService } from '../todo-api.service';
import {
  loadTodos,
  loadTodosFailed,
  loadTodosSuccess,
  loadTodo,
  loadTodoSuccess,
  loadTodoFailed
} from '../actions/todo.actions';

@Injectable()
export class TodoEffects {
  
  loadTodos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadTodos),
      switchMap(() => this.todoApi.getList()),
      map(todos => loadTodosSuccess({ data: todos })),
      catchError(error => of(loadTodosFailed({ error })))
    )
  );

  loadTodo$ = createEffect(() =>
  this.actions$.pipe(
      ofType(loadTodo),
      mergeMap(action =>
        this.todoApi.getTodo(action.id).pipe(
          map(todo => loadTodoSuccess({ data: todo })),
          catchError(error => of(loadTodoFailed({ error })))
        )
      )
    )
  );

  constructor(private actions$: Actions, private todoApi: TodoApiService) {}
}
