import { todoReducer, initialState, getAllTodos } from './todo.reducer';
import { loadTodosSuccess } from '../actions/todo.actions';
import { createAction, props } from '@ngrx/store';
import { Todo, TodoApiService } from '../todo-api.service';
describe('[Todo] Todo Reducer', () => {
  describe('LoadTodosSuccess', () => {
    it('should add new todos', () => {
      const action = loadTodosSuccess({data: [{
        id: 1,
        title: 'Test',
        description: '',
        completed: false
      },
      {
        id: 2,
        title: 'Test2',
        description: '',
        completed: false
      },
      {
        id: 3,
        title: 'Test3',
        description: '',
        completed: false
      }
    ]});
      

      const result = todoReducer(initialState, action);

      expect(getAllTodos(result).length).toEqual(3);
    });
  });
});
