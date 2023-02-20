import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CoursesState, selectAll } from './courses.reducers';

export const selectCoursesState = createFeatureSelector<CoursesState>('courses');

export const selectAllCourses = createSelector(
  selectCoursesState,
  selectAll
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
);

export const selectCoursesLoadedFlag = createSelector(
  selectCoursesState,
  state => state.allCoursesLoaded
);

export const selectFetchingDataFlag = createSelector(
  selectCoursesState,
  state => state.fetchingData
);

export const selectDeletingCourseId = createSelector(
  selectCoursesState,
  state => state.deletingCourseId
)
