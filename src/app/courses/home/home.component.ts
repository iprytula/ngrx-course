import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { defaultDialogConfig } from '../shared/default-dialog-config';
import { EditCourseDialogComponent } from '../edit-course-dialog/edit-course-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Course } from '../model/course';
import * as CoursesSelectors from '../courses.selectors';



@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  beginnerCourses$: Observable<Course[]>;
  advancedCourses$: Observable<Course[]>;
  promoTotal$: Observable<number>;
  allCoursesLoaded$: Observable<boolean>;

  constructor(
    private dialog: MatDialog,
    private store: Store
  ) { }

  ngOnInit() {
    this.beginnerCourses$ = this.store.select(CoursesSelectors.selectBeginnerCourses);
    this.advancedCourses$ = this.store.select(CoursesSelectors.selectAdvancedCourses);
    this.promoTotal$ = this.store.select(CoursesSelectors.selectInPromoCount);
    this.allCoursesLoaded$ = this.store.select(CoursesSelectors.selectCoursesLoadedFlag);
  }

  onAddCourse() {

    const dialogConfig = defaultDialogConfig();

    dialogConfig.data = {
      dialogTitle: 'Create Course',
      mode: 'create'
    };

    this.dialog.open(EditCourseDialogComponent, dialogConfig);
  }


}
