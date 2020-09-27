import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ITodoModel, TodoModel } from '../TodoModel';
import { map} from 'rxjs/operators';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private readonly http: HttpClient) { }
  public TodosUrl: string = "http://localhost:8080";

  // connexion api
  getTodos(): Observable<TodoModel[]> {
    // get<xxxx> définit le type de reponse que nous renvoie l'api
    // pipe, prendre la valeur reçue par l'api afin de la transformer
    return this.http.get<ITodoModel[]>(`${this.TodosUrl}`).pipe(
      map((todosData) => {
        // parcour notre tableuw de ITodoModel
        return todosData.map((todoData) => {
          // Créé et retourne une instance d'oject TodoModel
          return new TodoModel(todoData);
        });
      })
    );
  }
  getTodo(id: string): Observable<TodoModel>{
    return this.http.get<ITodoModel>(`${this.TodosUrl}/${id}`).pipe(
      map((todoData) => {
          return new TodoModel(todoData);
      })
    );
  }
  addTodo(todo: string): Observable<TodoModel> {
    return this.http.post<ITodoModel>(`${this.TodosUrl}`, { todo }).pipe(
      map((todoData) => {
        return new TodoModel(todoData);
    })
    );
  }
  deleteTodo(id: string) {
    return this.http.delete(`${this.TodosUrl}/${id}`);
  }
  updateTodo(todo: TodoModel) {
    return this.http.patch(`${this.TodosUrl}/${todo._id}`, {todo: todo.todo, todos: todo.todos});
  }
}
