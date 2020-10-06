import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ProjectListItemModel } from 'src/app/models/ptoject-list-item.model';
import { AppState, selectProjectListWithCount } from 'src/app/reducers';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  items$: Observable<ProjectListItemModel[]>;
  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.items$ = this.store.pipe(
      select(selectProjectListWithCount)
    );
  }

}
