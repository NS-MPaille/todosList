import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from "@angular/router";
import { Store } from "@ngrx/store";
import { map } from "rxjs/operators";
import { IState } from "../reducers";
import { getTodoById } from "../selectors";

@Injectable()
export class CanActivateCardGuard implements CanActivate {

  constructor(
    private store: Store<IState>,
  ) {}

  public canActivate(
    route: ActivatedRouteSnapshot,
  ) {
    return this.store.select(getTodoById).pipe(
      map((todoById) => {
        const id = route.paramMap.get("id");
        return id in todoById;
      }),
    );
  }
}
