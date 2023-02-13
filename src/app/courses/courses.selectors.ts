import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CoursesState, coursesSelectors } from './reducers';

export const selectCoursesState = createFeatureSelector<CoursesState>('courses');

export const selectAllCourses = createSelector(
  selectCoursesState,
  coursesSelectors.selectAll
);

export const selectBeginnerCourses = createSelector(
  selectAllCourses,
  courses => courses.filter(course => course.category === 'BEGINNER')
);

export const selectAdvancedCourses = createSelector(
  selectAllCourses,
  courses => courses.filter(course => course.category === 'ADVANCED')
);

export const selectInPromoCount = createSelector(
  selectAllCourses,
  courses => courses.filter(course => course.promo).length
)

export const selectFetchingData = createSelector(
  selectCoursesState,
  state => state.fetchingData
);
