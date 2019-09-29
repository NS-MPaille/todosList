import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import {
  MatButtonModule,
  MatCheckboxModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatProgressSpinnerModule,
} from "@angular/material";
import { RouterModule, Routes } from "@angular/router";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { TodoEffects } from "./effects/todo.effects";
import { IndexComponent } from "./index.component";
import { InputComponent } from "./input/input.component";
import { ListComponent } from "./list/list.component";
import { moduleTodoReducer, todoFeatureKey } from "./reducers";
import { TodoCardComponent } from "./todo-card/todo-card.component";
import { CanActivateCardGuard } from "./todo-card/todo-card.guard";

export const TODO_ROUTES: Routes = [
  {
    path: "",
    component: IndexComponent,
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
    RouterModule,
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forFeature(todoFeatureKey, moduleTodoReducer),
    EffectsModule.forFeature([TodoEffects]),
  ],
  declarations: [IndexComponent, InputComponent, ListComponent, TodoCardComponent],
  providers: [CanActivateCardGuard],
})
export class TodoModule {}
