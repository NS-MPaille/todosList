import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule, Routes } from "@angular/router";

import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatIconModule, MatInputModule, MatListModule, MatProgressSpinnerModule } from "@angular/material";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { AppComponent } from "./app.component";
import { TodoEffects } from "./todo/effects/todo.effects";
import { InputComponent } from "./todo/input/input.component";
import { ListComponent } from "./todo/list/list.component";
import { moduleTodoReducer, todoFeatureKey } from "./todo/reducers";
import { TodoCardComponent } from "./todo/todo-card/todo-card.component";
import { CanActivateCardGuard } from "./todo/todo-card/todo-card.guard";

export const TODO_ROUTES: Routes = [
  {
    path: "",
    children: [
      {
        path: "",
        component: ListComponent,
      },
      { path: "detail/:id", component: TodoCardComponent, canActivate: [CanActivateCardGuard] },
    ],
  },
  { path: "**", redirectTo: "" },
];


@NgModule({
  imports: [
    MatInputModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forFeature(todoFeatureKey, moduleTodoReducer),
    EffectsModule.forFeature([TodoEffects]),
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(TODO_ROUTES),
    StoreModule.forRoot({},
        {
      runtimeChecks: {
        strictActionImmutability: true,
        strictStateImmutability: true,
      },
    }),
    StoreDevtoolsModule.instrument(),
    EffectsModule.forRoot([TodoEffects]),
    BrowserAnimationsModule,
  ],
  bootstrap: [AppComponent],
  declarations: [AppComponent, InputComponent, ListComponent, TodoCardComponent],
  providers: [CanActivateCardGuard],
})
export class AppModule { }
