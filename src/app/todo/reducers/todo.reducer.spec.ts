import { addTodo, deleteTodo, loadTodosSuccess, loadTodoSuccess, updateTodo } from "../actions/todo.actions";
import { getAllTodos, initialState, todoReducer } from "./todo.reducer";
describe("[Todo] Todo Reducer", () => {
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

    it("should add a todo (loadTodoSuccess)", () => {
      const action = loadTodoSuccess({data:
        {
          id: 1,
          title: "Test",
          description: "",
          completed: false,
        },
      });

      const result = todoReducer(initialState, action);
      expect(getAllTodos(result).length).toEqual(1);
    });

    it("should add a todo (addTodo)", () => {
      const action = addTodo({data:
        {
          id: 1,
          title: "Test",
          description: "",
          completed: false,
        },
      });

      const result = todoReducer(initialState, action);
      expect(getAllTodos(result).length).toEqual(1);
    });

    it("should delete a todo", () => {
      const actionAdd = loadTodosSuccess({data: [{
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

      const actionDelete = deleteTodo({id: 1});

      const reducedTestAdded = todoReducer(initialState, actionAdd);
      const result = todoReducer(reducedTestAdded, actionDelete);
      expect(getAllTodos(result).length).toEqual(2);
    });

    it("should update a todo", () => {
      const action = addTodo({data:
        {
          id: 1,
          title: "Test",
          description: "",
          completed: false,
        },
      });

      const actionUpdate = updateTodo({todoUpdate: {
        id: 1,
        changes:  {
          id: 1,
          title: "Test",
          description: "",
          completed: true,
        },
      }});

      const reducedTestAdded = todoReducer(initialState, action);
      const result = todoReducer(reducedTestAdded, actionUpdate);
      expect(getAllTodos(result)[0].completed).toBeTruthy();

    });
});
