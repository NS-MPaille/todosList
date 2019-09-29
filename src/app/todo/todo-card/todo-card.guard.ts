import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { State } from '../reducers';
import { getTodoById } from '../selectors';
import { map } from 'rxjs/operators';

@Injectable()
export class CanActivateCardGuard implements CanActivate {

  constructor(
    private store: Store<State>
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot
  ) {
    return this.store.select(getTodoById).pipe(
      map((todoById) => {
        const id = route.paramMap.get('id');
        return id in todoById;
      })
    )
  }
}