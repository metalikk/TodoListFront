import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TodoService } from './services/todo.service';
import { TodoModel } from './TodoModel';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit { // a l'initialisation action ngOnit

  public todo: any = new FormControl('');
  public todos: any = [];

  constructor(private todoservice: TodoService) {

  }

  ngOnInit() { // au demarrage afficher la liste des todos
    this.getTodos();
  }

  addTodo() {
    this.todoservice.addTodo(this.todo.value).subscribe(() => {
      this.todos.push({ todo: this.todo.value }); // clé todo(api) + sa valeur
      this.todo.reset();
      alert('Todo enregistré');
    });
  }

  getTodos() {
    this.todoservice.getTodos().subscribe((v) => {
      this.todos = v;
      console.log('Mes todos', this.todos); // montrer les valeurs
    });
  }

  updateTodo(index, todo: TodoModel) {
    this.todoservice.updateTodo(todo).subscribe((resp) => {
      alert('Votre todo à bien été modifié');
      console.log(resp);
    });
  }

  deleteTodo(index, todoId) {
    this.todoservice.deleteTodo(todoId).subscribe((resp) => {
      this.todos.splice(index, 1);
      alert('Votre todo à bien été suprimé');
    });
  }

}

