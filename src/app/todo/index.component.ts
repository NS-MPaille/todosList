import {Component, OnInit} from "@angular/core";
import { Store } from "@ngrx/store";
import {loadTodos} from "./actions/todo.actions";

@Component({
    styleUrls: ["./index.component.css"],
    templateUrl: "./index.component.html",
})
export class IndexComponent implements OnInit {

    constructor(private store: Store<any>) {
    }

    public ngOnInit() {
        this.store.dispatch(loadTodos());
    }
}
