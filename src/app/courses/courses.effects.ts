import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs/internal/observable/of';
import { catchError, concatMap, map } from 'rxjs/operators';
import * as CoursesActions from './courses.actions';
import { CoursesHttpService } from './services/courses-http.service';

@Injectable()
export class CoursesEffects {
  constructor(
    private actions$: Actions,
    private coursesHttpService: CoursesHttpService
  ) { }

  loadCourses$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CoursesActions.loadCourses),
      concatMap(action => this.coursesHttpService.findAllCourses().pipe(
        map(courses => CoursesActions.loadCoursesSuccess({ courses })),
        catchError(error => of(CoursesActions.loadCoursesFailure({ error })))
      ))
    )
  );
}
