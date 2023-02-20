import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs/internal/observable/of';
import { catchError, concatMap, map, tap } from 'rxjs/operators';
import * as CoursesActions from './courses.actions';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Course } from './model/course';
import { CoursesHttpService } from './services/courses-http.service';
import { duration } from 'moment';

@Injectable()
export class CoursesEffects {
  constructor(
    private actions$: Actions,
    private coursesHttpService: CoursesHttpService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  loadCourses$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CoursesActions.loadCourses),
      concatMap(_action => this.coursesHttpService.findAllCourses().pipe(
        map(courses => CoursesActions.loadCoursesSuccess({ courses })),
        catchError(error => of(CoursesActions.loadCoursesFailure({ error })))
      ))
    )
  );

  updateCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CoursesActions.courseUpdate),
      concatMap(({ course }) => this.coursesHttpService.saveCourse(course.id, course).pipe(
        map((course: Course) => CoursesActions.courseUpdateSuccess({ update: { id: course.id, changes: course } })),
        catchError(error => of(CoursesActions.courseUpdateFailure({ error })))
      ))
    )
  );

  updateCourseSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(CoursesActions.courseUpdateSuccess),
    tap(() => {
      this.dialog.closeAll();
      this.snackBar.open('Course was saved successfully', 'OK', { duration: 2000 });
    })
  ), { dispatch: false });

  deleteCourse$ = createEffect(() => this.actions$.pipe(
    ofType(CoursesActions.deleteCourse),
    concatMap(({ id }) => this.coursesHttpService.deleteCourse(id).pipe(
      map(({ id }) => {
        this.snackBar.open('Course was deleted successfully', 'OK', { duration: 2000 });

        return CoursesActions.deleteCourseSuccess({ id: Number.parseInt(id) })
      }),
      catchError(error => of(CoursesActions.deleteCourseFailure({ error })))
    ))
  ))
}
