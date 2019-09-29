import {Component, OnInit} from '@angular/core';
import { Store } from '@ngrx/store';
import {loadTodos} from "./actions/todo.actions";

@Component({
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

    constructor(private store: Store<any>) {
    }

    ngOnInit() {
        this.store.dispatch(loadTodos());
    }
}