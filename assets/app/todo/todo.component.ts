import { Component } from '@angular/core';
import { todoService } from "./todo.service";
import { NgForm } from '@angular/forms';

@Component({
    selector: 'todo-list',
    templateUrl: './todo.component.html',
    styleUrls: ['./todo.component.css'],
    providers: [todoService]
})

export class TodoComponent implements OnInit {
    private message_content = "";
    private isUpdate = null;
    private messages: string[];
    
    constructor(private _todoService: todoService) { }  
    
    ngOnInit(): void { 
        this._todoService.getMessages().subscribe(
            data => {
                console.log(data);
                this.messages = data;
            },
            error => console.error(error)
        );
    } 
    
    deleteMessage(index){
        this._todoService.deleteMessage(index).subscribe(
            data => {
                console.log(data);
                this.isUpdate = null;
            },
            error => console.log(error)
        );
    }
    
    addMessage(form: NgForm){
        if(this.isUpdate != null){
            this._todoService.updateMessage(this.isUpdate.id, form.value.content).subscribe(
                data => {                     
                    const item = this.messages.filter(function(item){
                        return item.id == data.result._id;        
                    });
                    item[0].content = data.result.content;
                    item[0].color = false;
                    this.isUpdate = null;
                    console.log(data);
                },
                error => console.error(error)
            );   
        }else{
            this._todoService.addMessage(form.value.content).subscribe(
                data => this.messages = data,
                error => console.error(error)
            );
        }
        form.resetForm();
    }
    
    updateMessage(message: string[], form: NgForm){
        for(let message of this.messages){
            message.color = false;
        }
        message.color = true;

        this.message_content = message.content;
        this.isUpdate = message;
    }
}