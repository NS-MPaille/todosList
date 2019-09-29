import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { IndexComponent } from './index.component';
import { InputComponent } from './input/input.component';
import { ListComponent } from './list/list.component';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { TodoEffects } from './effects/todo.effects';
import { moduleTodoReducer, todoFeatureKey } from './reducers';
import {
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatListModule,
  MatIconModule,
  MatProgressSpinnerModule,
  MatCheckboxModule
} from '@angular/material';
import { TodoCardComponent } from './todo-card/todo-card.component';
import { RouterModule, Routes } from '@angular/router';
import { CanActivateCardGuard } from './todo-card/todo-card.guard';

export const TODO_ROUTES: Routes = [
  {
    path: '',
    component: IndexComponent,
    children: [
      {
        path: '',
        component: ListComponent
      },
      { path: 'detail/:id', component: TodoCardComponent, canActivate: [CanActivateCardGuard] }
    ]
  },
  { path: '**', redirectTo: '' }
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
    EffectsModule.forFeature([TodoEffects])
  ],
  declarations: [IndexComponent, InputComponent, ListComponent, TodoCardComponent],
  providers: [CanActivateCardGuard]
})
export class TodoModule {}
