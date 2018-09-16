import { Component, OnInit } from '@angular/core';
import {TodoService} from "../services/todo.service";
import {Todo} from "../todo";

@Component({
    moduleId: module.id,
    selector: 'todos',
    templateUrl: 'todos.component.html'
})

export class TodosComponent implements OnInit{
    todos: Todo[];
    constructor(private _todoService: TodoService){}
    ngOnInit(){
       this.todos=[];
       this._todoService.getTodos()
           .subscribe(todos =>{
               this.todos=todos;
           });
    }
    onAddTodo(event,todoText){
        let result;
        let newTodo = {
            text: todoText.value,
            isCompleted: false
        }
        console.log(newTodo)
        result = this._todoService.saveTodo(newTodo);
        result.subscribe(x=>{
            this.todos.push(newTodo);
            todoText.value='';
        })
    }
}