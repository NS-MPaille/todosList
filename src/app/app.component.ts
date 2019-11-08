import { Component } from "@angular/core";
import { Store } from '@ngrx/store';
import { loadTodos } from './todo/actions/todo.actions';

@Component({
  selector: "my-app",
  styleUrls: [ "./app.component.css" ],
  templateUrl: "./app.component.html",
})
export class AppComponent  {
  public name = "Angular";

  constructor(private store: Store<any>) {
    this.store.dispatch(loadTodos());
  }
}
