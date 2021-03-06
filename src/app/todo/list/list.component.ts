import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { Update } from "@ngrx/entity";
import { Store } from "@ngrx/store";
import {Observable} from "rxjs";
import {deleteTodo, updateTodo} from "../actions/todo.actions";
import {IState} from "../reducers";
import {IStatus} from "../reducers/ui.reducer";
import {getTodos, getTodosStatus} from "../selectors";
import {ITodo} from "../todo-api.service";

@Component({
  selector: "app-todo-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.css"],
})
export class ListComponent implements OnInit {

  public IStatus = IStatus;

  public todo$: Observable<ITodo[]>;
  public todoStatus$: Observable<IStatus>;
  public todoControl = new FormControl();

  constructor(private store: Store<IState>) {
    this.todo$ = this.store.select(getTodos);
    this.todoStatus$ = this.store.select(getTodosStatus);
  }

  public ngOnInit() {
  }

  public onDelete(todo: ITodo) {
    this.store.dispatch(deleteTodo({id: todo.id}));
  }

  public isDone(todo: ITodo) {
    return todo.completed;
  }

  public onDone(todo: ITodo) {
    const todoUpdate: Update<ITodo> = {
      id: todo.id,
      changes: {completed : !todo.completed},
    };
    this.store.dispatch(updateTodo({todoUpdate}));
  }

  public trackByTodo(_idx: number, todo: ITodo) {
    return todo.id;
  }

}
