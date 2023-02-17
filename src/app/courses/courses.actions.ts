import { Update } from '@ngrx/entity';
import { createAction, props } from '@ngrx/store';
import { Course } from './model/course';

export const loadCourses = createAction('[Courses Resolver] Load Courses');

export const loadCoursesSuccess = createAction(
  '[Load Courses Effect] Load Courses Success',
  props<{ courses: Course[] }>()
);

export const loadCoursesFailure = createAction(
  '[Load Courses Effect] Load Courses Failure',
  props<{ error: any }>()
);

export const courseUpdate = createAction(
  '[Edit Course Dialog] Course Update',
  props<{ course: Course }>()
);

export const courseUpdateSuccess = createAction(
  '[Update Courses Effect] Course Update Success',
  props<{ update: Update<Course> }>()
);

export const courseUpdateFailure = createAction(
  '[Update Courses Effect] Course Update Failure',
  props<{ error: any }>()
);
