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
  '[Courses Effect] Course Update Success',
  props<{ update: Update<Course> }>()
);

export const courseUpdateFailure = createAction(
  '[Courses Effect] Course Update Failure',
  props<{ error: any }>()
);

export const deleteCourse = createAction(
  '[Course Card List] Delete Course',
  props<{ id: number }>()
)

export const deleteCourseSuccess = createAction(
  '[Courses Effect] Delete Course Success',
  props<{ id: any }>()
)

export const deleteCourseFailure = createAction(
  '[Courses Effect] Delete Course Failure',
  props<{ error: any }>()
)
