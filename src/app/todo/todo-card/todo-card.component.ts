import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { select, Store } from "@ngrx/store";
import { combineLatest, Observable } from "rxjs";
import { filter, first, map, switchMap, switchMapTo } from "rxjs/operators";
import { loadTodo } from "../actions/todo.actions";
import { IState } from "../reducers";
import { getTodoById, getTodoIds, getTodos, getTodoState } from "../selectors";
import { ITodo } from "../todo-api.service";

@Component({
  templateUrl: "./todo-card.component.html",
  styleUrls: ["./todo-card.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoCardComponent implements OnInit {
  public todo$: Observable<ITodo>;
  public isLoading$: Observable<boolean>;
  public todoError$: Observable<{ changes?: Partial<ITodo>, error: number }>;
  public noTodo$: Observable<boolean>;

  private todoId$ = this.ActivatedRoute.params.pipe(
    map((params) => params.id),
  );


  constructor(private ActivatedRoute: ActivatedRoute,
              private Store: Store<IState>,
              private Router: Router) {
      this.todo$ = this.todoId$.pipe(
        switchMap((todoId) => this.Store.pipe(
          select(getTodoById),
          map((todoById) => todoById[todoId]),
        )),
      );
      this.isLoading$ = this.todoId$.pipe(
        switchMap((todoId) => this.Store.pipe(
          select(getTodoState),
          map((todoLoadingById) => todoLoadingById[todoId]),
        )),
      );
      this.todoError$ = this.todoId$.pipe(
        switchMap((todoId) => this.Store.pipe(
          select(getTodoState),
          map((todoErrorById) => todoErrorById[todoId]),
        )),
      );
      this.noTodo$ = combineLatest(
        this.todo$,
        this.isLoading$,
        this.todoError$,
      ).pipe(
        map(([todo, isLoading, todoError]) => !todo && !isLoading && !todoError),
      );
  }

  public ngOnInit() {
    this.loadTodoIfNeeded();
  }

  public loadTodoIfNeeded() {
    this.todo$.pipe(
      first(),
      filter((todo) => !todo),
      switchMapTo(this.todoId$.pipe(first())),
    ).subscribe((todoId) => {
      this.Store.dispatch(loadTodo(todoId));
    });
  }

  public goToList() {
    this.Router.navigate(["/todos"]);
  }
}
