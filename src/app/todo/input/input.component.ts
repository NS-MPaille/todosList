import {Component, EventEmitter, OnInit, Output} from "@angular/core";
import {FormBuilder, Validators} from "@angular/forms";
import { Store } from "@ngrx/store";
import {addTodo} from "../actions/todo.actions";
import {IState} from "../reducers";
import {getTodos} from "../selectors";
import {ITodo} from "../todo-api.service";

@Component({
    selector: "app-todo-input",
    template: `
    <div class="form-todo-container">
        <form [formGroup]="form" (submit)="onSubmit()">

        <mat-form-field>
            <input matInput placeholder="Todo's title" formControlName="todo">
            <mat-error>Required !</mat-error>
        </mat-form-field>
        <mat-form-field>
            <input matInput placeholder="Todo's description" formControlName="description">
        </mat-form-field>
        <button class="todoButtonAdd" mat-icon-button color="primary" type="submit" [disabled]="form.invalid"><mat-icon>create</mat-icon></button>

        </form>
    <div>
    `,
    styleUrls: ["./input.component.css"],
})
export class InputComponent {

    public form = this.fb.group({
        todo: ["", Validators.required],
        description: [""],
    });

    public id: number = 6;

    @Output() public added = new EventEmitter<ITodo>();

    constructor(
        private fb: FormBuilder,
        private store: Store<IState>    ) {
    }

    public onSubmit() {
        const todo: ITodo = {
            id: this.id++,
            title: this.form.value.todo,
            description: this.form.value.description,
            completed: false,
        };
        this.store.dispatch(addTodo({data: todo}));
        this.form.reset();
    }
}
