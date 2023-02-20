import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable} from 'rxjs';
import { finalize, take, tap } from 'rxjs/operators';
import * as CoursesActions from './courses.actions';
import * as CoursesSelectors from './courses.selectors';

@Injectable({
  providedIn: 'root',
})
export class CoursesResolver implements Resolve<any> {
  constructor(private store: Store) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    return this.store.pipe(
      select(CoursesSelectors.selectCoursesLoadedFlag),
      tap(areCoursesLoaded => {
        if (!areCoursesLoaded) {
          this.store.dispatch(CoursesActions.loadCourses());
        }
      }),
      take(1)
    );
  }
}
