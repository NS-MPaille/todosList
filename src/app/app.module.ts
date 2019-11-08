import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule, Routes } from "@angular/router";

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { AppComponent } from "./app.component";
import { TodoCardComponent } from "./todo/todo-card/todo-card.component";
import { ListComponent } from './todo/list/list.component';
import { CanActivateCardGuard } from './todo/todo-card/todo-card.guard';
import { InputComponent } from './todo/input/input.component';
import { MatInputModule, MatIconModule, MatListModule, MatButtonModule, MatFormFieldModule, MatProgressSpinnerModule, MatCheckboxModule } from '@angular/material';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { todoFeatureKey, moduleTodoReducer } from './todo/reducers';
import { TodoEffects } from './todo/effects/todo.effects';

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
    EffectsModule.forRoot([]),
    BrowserAnimationsModule,
  ],
  bootstrap: [AppComponent],
  declarations: [AppComponent, InputComponent, ListComponent, TodoCardComponent],
  providers: [CanActivateCardGuard],
})
export class AppModule { }
