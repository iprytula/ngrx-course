import { Component, Input, OnInit } from '@angular/core';
import { Course } from "../model/course";
import { MatDialog } from "@angular/material/dialog";
import { EditCourseDialogComponent } from "../edit-course-dialog/edit-course-dialog.component";
import { defaultDialogConfig } from '../shared/default-dialog-config';
import { Store } from '@ngrx/store';
import * as CoursesActions from '../courses.actions';
import { DeleteCourseDialogComponent } from '../delete-course-dialog/delete-course-dialog.component';
import { Observable } from 'rxjs';
import * as CoursesSelectors from '../courses.selectors';


@Component({
  selector: 'courses-card-list',
  templateUrl: './courses-card-list.component.html',
  styleUrls: ['./courses-card-list.component.css']
})
export class CoursesCardListComponent implements OnInit {

  @Input() courses: Course[];
  deletingCourseId$: Observable<number>;

  constructor(
    private dialog: MatDialog,
    private store: Store
  ) {
  }

  ngOnInit() {
    this.deletingCourseId$ = this.store.select(CoursesSelectors.selectDeletingCourseId)
  }

  editCourse(course: Course) {
    const dialogConfig = defaultDialogConfig();
    dialogConfig.data = {
      dialogTitle: "Edit Course",
      course,
      mode: 'update'
    };
    this.dialog.open(EditCourseDialogComponent, dialogConfig);
  }

  onDeleteCourse(course: Course) {
    const dialog = this.dialog.open(DeleteCourseDialogComponent);

    dialog.afterClosed().subscribe(res => {
      if (res) {
        this.store.dispatch(CoursesActions.deleteCourse({ id: course.id }))
      }
    })
  }

}
