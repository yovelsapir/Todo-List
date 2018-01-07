import { Component } from '@angular/core';
import { todoService } from "./todo/todo.service";

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers: [todoService]
})

export class AppComponent {
    private messages: string[];
    
    constructor(private _todoService: todoService) { }  
    
    ngOnInit(): void { 
        this.messages = this._todoService.getMessages();
    } 
}