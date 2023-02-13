import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { finalize, first, tap } from 'rxjs/operators';
import * as CoursesActions from './courses.actions';

@Injectable({
  providedIn: 'root',
})
export class CoursesResolver implements Resolve<any> {
  fetchingData = false;

  constructor(private store: Store) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    return this.store.pipe(
      tap(() => {
        if (!this.fetchingData) {
          this.fetchingData = true;
          this.store.dispatch(CoursesActions.loadCourses());
        }
      }),
      first(),
      finalize(() => (this.fetchingData = false))
    );
  }
}
