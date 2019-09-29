import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {Todo} from "../todo-api.service";
import {Observable} from "rxjs";
import {State} from "../reducers";
import { Store } from '@ngrx/store';
import {getTodos, getTodosStatus} from "../selectors";
import {Status} from "../reducers/ui.reducer";
import {deleteTodo, updateTodo} from "../actions/todo.actions";
import { Update } from '@ngrx/entity';

@Component({
  selector: 'app-todo-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  todo$: Observable<Todo[]>;
  todoStatus$: Observable<Status>;

  constructor(private store: Store<State>) {
    this.todo$ = this.store.select(getTodos);
    this.todoStatus$ = this.store.select(getTodosStatus);
  }

  ngOnInit() {
  }

  onDelete(todo: Todo) {
    this.store.dispatch(deleteTodo({id: todo.id}));
  }

  onDone(todo: Todo) {
    const todoUpdate: Update<Todo> = {
      id: todo.id,
      changes: {completed : !todo.completed}
    };
    this.store.dispatch(updateTodo({todoUpdate}));
  }

  trackByTodo(_idx: number, todo: Todo) {
    return todo.id;
  }

}