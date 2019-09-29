import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, combineLatest } from 'rxjs';
import { filter, map, switchMap, first, switchMapTo } from 'rxjs/operators';
import { Todo } from '../todo-api.service';
import { State } from '../reducers';
import { getTodos, getTodoState, getTodoIds, getTodoById } from '../selectors';
import { loadTodo } from '../actions/todo.actions';

@Component({
  templateUrl: './todo-card.component.html',
  styleUrls: ['./todo-card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoCardComponent implements OnInit {
  todo$: Observable<Todo>;
  isLoading$: Observable<boolean>;
  todoError$: Observable<{ changes?: Partial<Todo>, error: number }>;
  noTodo$: Observable<boolean>;

  private todoId$ = this.ActivatedRoute.params.pipe(
    map((params) => params.id)
  );

    
  constructor(private ActivatedRoute: ActivatedRoute,
    private Store: Store<State>,
    private Router: Router) {
      this.todo$ = this.todoId$.pipe(
        switchMap((todoId) => this.Store.pipe(
          select(getTodoById),
          map((todoById) => todoById[todoId])
        ))
      );
      this.isLoading$ = this.todoId$.pipe(
        switchMap((todoId) => this.Store.pipe(
          select(getTodoState),
          map((todoLoadingById) => todoLoadingById[todoId])
        ))
      );
      this.todoError$ = this.todoId$.pipe(
        switchMap((todoId) => this.Store.pipe(
          select(getTodoState),
          map((todoErrorById) => todoErrorById[todoId])
        ))
      );
      this.noTodo$ = combineLatest(
        this.todo$,
        this.isLoading$,
        this.todoError$
      ).pipe(
        map(([todo, isLoading, todoError]) => !todo && !isLoading && !todoError)
      )
  }

  ngOnInit() {
    this.loadTodoIfNeeded();
  }
  
  loadTodoIfNeeded() {
    this.todo$.pipe(
      first(),
      filter((todo) => !todo),
      switchMapTo(this.todoId$.pipe(first()))
    ).subscribe((todoId) => {
      this.Store.dispatch(loadTodo(todoId));
    });
  }

  goToList() {
    this.Router.navigate(['/todos'])
  }
}
