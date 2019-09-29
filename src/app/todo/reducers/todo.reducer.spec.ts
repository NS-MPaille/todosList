import { createAction, props } from "@ngrx/store";
import { loadTodosSuccess } from "../actions/todo.actions";
import { ITodo, TodoApiService } from "../todo-api.service";
import { getAllTodos, initialState, todoReducer } from "./todo.reducer";
describe("[Todo] Todo Reducer", () => {
  describe("LoadTodosSuccess", () => {
    it("should add new todos", () => {
      const action = loadTodosSuccess({data: [{
        id: 1,
        title: "Test",
        description: "",
        completed: false,
      },
      {
        id: 2,
        title: "Test2",
        description: "",
        completed: false,
      },
      {
        id: 3,
        title: "Test3",
        description: "",
        completed: false,
      },
    ]});


      const result = todoReducer(initialState, action);

      expect(getAllTodos(result).length).toEqual(3);
    });
  });
});
