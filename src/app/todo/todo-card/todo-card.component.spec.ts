import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ReactiveFormsModule } from "@angular/forms";
import {
  MatButtonModule,
  MatCheckboxModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatProgressSpinnerModule,
} from "@angular/material";
import { RouterModule } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { combineReducers, Store, StoreModule } from "@ngrx/store";
import { todoReducer } from "../reducers/todo.reducer";
import { TodoCardComponent } from "./todo-card.component";

describe("TodoCardComponent", () => {
  let component: TodoCardComponent;
  let fixture: ComponentFixture<TodoCardComponent>;
  let store: Store<any>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        StoreModule.forRoot({
          "module-todo": combineReducers(todoReducer),
        }),
        MatInputModule,
        MatIconModule,
        MatListModule,
        MatButtonModule,
        MatFormFieldModule,
        MatProgressSpinnerModule,
        MatCheckboxModule,
        RouterModule,
        CommonModule,
        ReactiveFormsModule,
        HttpClientModule,
      ],
      declarations: [TodoCardComponent],
    });

    await TestBed.compileComponents();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it("The TodoCard component should be created", () => {
    fixture = TestBed.createComponent(TodoCardComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);

    spyOn(store, "dispatch").and.callThrough();
    fixture.detectChanges();
    expect(TodoCardComponent).toBeTruthy;
  });
});
