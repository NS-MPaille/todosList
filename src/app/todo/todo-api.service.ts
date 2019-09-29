import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { delay } from "rxjs/operators";

export interface ITodo {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
}

@Injectable({
  providedIn: "root",
})

export class TodoApiService {
  public todosDb: ITodo[] = [
    {
      id: 0,
      title: "Todo 1",
      description: "Todo desc 1",
      completed: false,
    },
    {
      id: 1,
      title: "Todo 2",
      description: "Todo desc 2",
      completed: false,
    },
    {
      id: 2,
      title: "Todo 3",
      description: "Todo desc 3",
      completed: false,
    },
    {
      id: 3,
      title: "Todo 4",
      description: "Todo desc 4",
      completed: false,
    },
    {
      id: 4,
      title: "Todo 5",
      description: "Todo desc 5",
      completed: true,
    },
    {
      id: 5,
      title: "Todo 6",
      description: "Todo desc 6",
      completed: true,
    },
  ];

  constructor(private http: HttpClient) {}

  public getList(): Observable<ITodo[]> {
    // return this.http.get<Todo[]>('todos');
    return of(this.todosDb).pipe(delay(1000));
  }



  public getTodo(id: number) {
    return this.http.get<ITodo>(`todo/${id}`);
  }
}
