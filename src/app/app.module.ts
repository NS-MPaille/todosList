import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule, Route } from '@angular/router';

import { AppComponent } from './app.component';
import { TodoModule, TODO_ROUTES } from './todo/todo.module';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TodoCardComponent } from './todo/todo-card/todo-card.component';

const routes: Route[] = [
  ...TODO_ROUTES
];

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    TodoModule,
    RouterModule.forRoot(routes),
    StoreModule.forRoot({},
        {
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
      }
    }),
    StoreDevtoolsModule.instrument(),
    EffectsModule.forRoot([]),
    BrowserAnimationsModule
  ],
  declarations: [AppComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
