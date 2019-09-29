import { HttpErrorResponse } from "@angular/common/http";
import { loadTodos, loadTodosFailed, loadTodosSuccess } from "../actions/todo.actions";
import { initialState, uiReducer } from "./ui.reducer";

describe("[Todo] Ui Reducer", () => {
  describe("LoadTodos", () => {
    it("should mark loading", () => {
      const action = loadTodos;

      const result = uiReducer(initialState, action);

      expect(result.todoStatus.loading).toBe(true);
    });
  });
  describe("LoadTodosSuccess", () => {
    it("should clear loading and error", () => {
      const action = loadTodosSuccess;

      const result = uiReducer(initialState, action);

      expect(result.todoStatus.loading).toBe(false);
      expect(result.todoStatus.error).toBe(null);
      expect(result.todoStatus.loaded).toBe(true);
    });
  });

  describe("LoadTodosFailure", () => {
    it("should clear loading and set error", () => {
      const error = new HttpErrorResponse({status: 500});
      const action = loadTodosFailed;

      const result = uiReducer(initialState, action);

      expect(result.todoStatus.loading).toBe(false);
      expect(result.todoStatus.error).toBeDefined;
    });
  });
});
