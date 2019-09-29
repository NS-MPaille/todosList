import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { Route, RouterModule } from "@angular/router";

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { AppComponent } from "./app.component";
import { TodoCardComponent } from "./todo/todo-card/todo-card.component";
import { TODO_ROUTES, TodoModule } from "./todo/todo.module";

const routes: Route[] = [
  ...TODO_ROUTES,
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
        strictActionImmutability: true,
        strictStateImmutability: true,
      },
    }),
    StoreDevtoolsModule.instrument(),
    EffectsModule.forRoot([]),
    BrowserAnimationsModule,
  ],
  bootstrap: [AppComponent],
  declarations: [AppComponent],
  providers: [],
})
export class AppModule { }
