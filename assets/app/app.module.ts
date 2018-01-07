import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from "./app.component";
import { TodoComponent } from "./todo/todo.component";



@NgModule({
    declarations: [
        AppComponent, 
        TodoComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule
    ],
    bootstrap: [AppComponent]
})

export class AppModule {

}