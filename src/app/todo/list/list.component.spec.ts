import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { combineReducers, Store, StoreModule } from '@ngrx/store';
import { ListComponent } from './list.component';
import { todoReducer } from '../reducers/todo.reducer';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatProgressSpinnerModule,
} from "@angular/material";
import { loadTodosSuccess } from '../actions/todo.actions';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  let store: Store<any>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        StoreModule.forRoot({
          'module-todo': combineReducers(todoReducer)
        }),
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
      ],
      declarations: [ListComponent]
    });

    await TestBed.compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);

    spyOn(store, 'dispatch').and.callThrough();
    fixture.detectChanges();
  });
  
  afterEach(() => {
    fixture.destroy();
  });

  it('The todoList component should be created', () => {
    const action = loadTodosSuccess(
        {
            data:
                [{
                    id: 1,
                    title: 'Test',
                    description: '',
                    completed: false
                }]
            });

    store.dispatch(action);

    fixture.detectChanges();

    const TodoElement = fixture.nativeElement.querySelector('div');
    expect(TodoElement).toBeTruthy;
  });
});
