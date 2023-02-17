import {
  createReducer,
  on,
} from '@ngrx/store';
import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { Course } from './model/course';
import * as CoursesActions from './courses.actions';

export const coursesFeatureKey = 'courses';

export interface CoursesState extends EntityState<Course> {
  error: any;
  allCoursesLoaded: boolean,
  fetchingData: boolean
}

const compareCourses = (c1: Course, c2: Course) => {
  const compare = c1.seqNo - c2.seqNo;

  if (compare > 0) {
    return 1;
  } else if (compare < 0) {
    return -1;
  }
  else return 0;
}

export const adapter = createEntityAdapter<Course>({ sortComparer: compareCourses });

export const initialState = adapter.getInitialState({
  error: null,
  allCoursesLoaded: false,
  fetchingData: false
});

export const coursesReducer = createReducer(
  initialState,
  on(CoursesActions.loadCoursesSuccess, (state, { courses }) => {
    return adapter.addMany(courses, {
      ...state,
      error: null,
      allCoursesLoaded: true
    });
  }),
  on(CoursesActions.loadCoursesFailure, (state, { error }) => {
    return {
      ...state,
      error,
      allCoursesLoaded: false
    };
  }),
  on(CoursesActions.courseUpdate, state => {
    return {
      ...state,
      fetchingData: true
    }
  }),
  on(CoursesActions.courseUpdateSuccess, (state, { update }) => {
    return adapter.updateOne(update, {
      ...state,
      fetchingData: false
    });
  }),
  on(CoursesActions.courseUpdateFailure, (state, { error }) => {
    return {
      ...state,
      error
    }
  })
);

export const {
  selectAll
} = adapter.getSelectors();
