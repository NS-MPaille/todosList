import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {Todo} from "../todo-api.service";
import {getTodos} from "../selectors";
import {State} from "../reducers";
import { Store } from '@ngrx/store';
import {addTodo} from "../actions/todo.actions";

@Component({
    selector: 'app-todo-input',
    template: `
        <form [formGroup]="form" (submit)="onSubmit()">
        
        <mat-form-field>
            <input matInput placeholder="Todo's title" formControlName="todo">
        </mat-form-field>
        
        <mat-form-field>
            <input matInput placeholder="Todo's description" formControlName="description">
        </mat-form-field>
      
        <button mat-raised-button color="primary" type="submit" [disabled]="form.invalid">Add</button>
    
        </form>
    `
})
export class InputComponent {

    form = this.fb.group({
        todo: ['', Validators.required],
        description: ['']
    });

    id: number = 6;

    @Output() added = new EventEmitter<Todo>();

    constructor(
        private fb: FormBuilder,
        private store: Store<State>    ) {
    }

    onSubmit() {
        const todo:Todo = {
            id: this.id++,
            title: this.form.value.todo,
            description: this.form.value.description,
            completed: false
        };
        this.store.dispatch(addTodo({data: todo}));
        this.form.reset();
    }
}