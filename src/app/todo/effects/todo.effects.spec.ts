import { HttpErrorResponse } from "@angular/common/http";
import { inject, TestBed } from "@angular/core/testing";
import { provideMockActions } from "@ngrx/effects/testing";
import { cold, hot } from "jasmine-marbles";
import { Observable, of } from "rxjs";
import { loadTodos, loadTodosFailed, loadTodosSuccess } from "../actions/todo.actions";
import { ITodo, TodoApiService } from "../todo-api.service";
import { TodoEffects } from "./todo.effects";

describe("TodoEffects", () => {
    let actions$: Observable<any>;
    let effects: TodoEffects;

    let testTodos: {data: ITodo[]};
    let getTodosSpy: jasmine.Spy;

    beforeEach(() => {
      testTodos = {
          data: [
                    {
                        id: 1,
                        title: "Test",
                        description: "",
                        completed: true,
                    },
                    {
                        id: 2,
                        title: "Test2",
                        description: "",
                        completed: false,
                    },
      ]};

      const todoApiService = jasmine.createSpyObj("TodoApiService", ["getList"]);
      getTodosSpy = todoApiService.getList.and.returnValue(of(testTodos.data));

      TestBed.configureTestingModule({
        providers: [
          TodoEffects,
          provideMockActions(() => actions$),
          { provide: TodoApiService, useValue: todoApiService },
        ],
      });

      effects = TestBed.get(TodoEffects);
    });

    describe("LoadTodos", () => {
      beforeEach(() => {
        const action = loadTodos;
        actions$ = hot("--a-", { a: action });
      });

      it("should load todos successfully", () => {
        const completion = loadTodosSuccess(testTodos);

        const expected = cold("--b", { b: completion });

        expect(effects.loadTodos$).toBeObservable(expected);
      });
    });
  });
