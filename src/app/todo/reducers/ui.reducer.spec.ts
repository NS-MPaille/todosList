import { loadTodos, loadTodosFailed, loadTodosSuccess } from "../actions/todo.actions";
import { initialState, uiReducer, IStatus } from "./ui.reducer";

describe("[Todo] Ui Reducer", () => {
  describe("LoadTodos", () => {
    it("should mark loading", () => {
      const action = loadTodos;

      const result = uiReducer(initialState, action);

      expect(result.todoStatus).toBe(IStatus.Loading);
    });
  });
  describe("LoadTodosSuccess", () => {
    it("should clear loading and error", () => {
      const action = loadTodosSuccess;

      const result = uiReducer(initialState, action);

      expect(result.todoStatus).toBe(IStatus.Loaded);
    });
  });

  describe("LoadTodosFailure", () => {
    it("should clear loading and set error", () => {
      const action = loadTodosFailed;

      const result = uiReducer(initialState, action);

      expect(result.todoStatus).toBe(IStatus.Error);
    });
  });
});
