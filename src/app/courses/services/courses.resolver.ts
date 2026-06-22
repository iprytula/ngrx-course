import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { CoursesEntityService } from './courses-entity.service';

@Injectable()
export class CoursesResolver implements Resolve<boolean> {
  constructor(
    private coursesService: CoursesEntityService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    ): Observable<boolean> {

    return this.coursesService.getAll().pipe(
      map(courses => !!courses)
    );
  }
}
