import { Http, Response, Headers } from "@angular/http";

import 'rxjs/Rx';
import { Observable } from "rxjs";

import { Injectable } from '@angular/core';  


@Injectable()
export class todoService {  
   private messages:string[] = [];
    
   constructor(private http: Http) {}
    
   getMessages() { 
        return this.http.get("http://localhost:3000/messages")
            .map((response: Response) => {
                const messages = response.json().obj;
                let transformedMessages: string[] = [];
                for(let message of messages){
                    transformedMessages.push({
                        content: message.content,
                        color: false,
                        id: message._id
                    });
                }
                this.messages = transformedMessages;
                return transformedMessages;
        }).catch((error: Response) => Observable.throw(error.json()));
   } 
    
   deleteMessage(i: number){
       let index = this.messages[i].id;
       this.messages.splice(i,1);
       return this.http.delete("http://localhost:3000/messages/" + index).map((response: Response) => {
           return response.json();
       }).catch((error: Response) => Observable.throw(error.json()));
   }
    
   addMessage(message){
       const body = JSON.stringify({content: message});
       const headers = new Headers({'Content-Type': 'application/json'});
       
       return this.http.post("http://localhost:3000/messages", body, {
           headers: headers
       }).map((response: Response) => {
           const result = response.json();
           this.messages.push({
               content: result.obj.content,
               color: false,
               id: result.obj._id
           });
           return this.messages;
       }).catch((error: Response) => {
           return Observable.throw(error.json());
       });
   }
    
   updateMessage(id, message){
        return this.http.patch("http://localhost:3000/messages/" + id +"/" + message)
            .map((response: Response) => {
                return response.json();
            }).catch((error: Response) => {
                return Observable.throw(error.json());
            });
   }
} 