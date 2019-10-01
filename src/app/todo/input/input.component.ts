import {Component, EventEmitter, Output} from "@angular/core";
import {FormBuilder, Validators} from "@angular/forms";
import { Store } from "@ngrx/store";
import {addTodo} from "../actions/todo.actions";
import {IState} from "../reducers";
import {ITodo} from "../todo-api.service";

@Component({
    selector: "app-todo-input",
    templateUrl: "./input.component.html",
    styleUrls: ["./input.component.css"],
})
export class InputComponent {

    public form = this.fb.group({
        todo: ["", Validators.required],
        description: [""],
    });

    @Output() public added = new EventEmitter<ITodo>();

    constructor(
        private fb: FormBuilder,
        private store: Store<IState>    ) {
    }

    public onSubmit() {
        const todo: ITodo = {
            id: new Date().getTime(),
            title: this.form.value.todo,
            description: this.form.value.description,
            completed: false,
        };
        this.store.dispatch(addTodo({data: todo}));
        this.form.reset();
    }
}
