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
import { Store } from "@ngrx/store";
import { BehaviorSubject, Subject } from "rxjs";
import { IStatus } from "../reducers/ui.reducer";
import { getTodos, getTodosStatus } from "../selectors";
import { ITodo } from "../todo-api.service";
import { ListComponent } from "./list.component";

describe("ListComponent", () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  const todoSelect: Subject<ITodo[]> = new BehaviorSubject([]);
  const todoStatusSelect: Subject<IStatus> = new BehaviorSubject(IStatus.Loading);

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
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
      declarations: [ListComponent],
      providers: [
        {
          provide: Store,
          useValue: {
            select: (method) => {
              if (method === getTodos) {
                return todoSelect;
              } else if (method === getTodosStatus) {
                return todoStatusSelect;
              }
            },
          },
        },
      ],
    });

    await TestBed.compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it("The todoList item Test should be created", () => {
    todoSelect.next(
      [{
          id: 1,
          title: "Test",
          description: "",
          completed: false,
      }]);
    todoStatusSelect.next(IStatus.Loaded);

    fixture.detectChanges();

    const TodoElement = fixture.nativeElement.querySelector(".todoListItemDiv");
    expect(TodoElement).toBeTruthy;
    const button = TodoElement.querySelector("button");
    expect(button.textContent).toBe("Test");
  });

  it("The deleted todoList item Test should not exist", () => {
    todoSelect.next(
      [{
          id: 1,
          title: "Test",
          description: "",
          completed: false,
      }]);
    todoStatusSelect.next(IStatus.Loaded);
    todoSelect.next([]);

    fixture.detectChanges();

    const TodoElement = fixture.nativeElement.querySelector(".todoListItemDiv");
    expect(TodoElement).toBeNull;
  });
});
