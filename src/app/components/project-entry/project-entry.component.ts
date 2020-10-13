import { Component, EventEmitter, Injectable, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { projectToAdd, todoAdded } from 'src/app/actions/todo-actions';
import { ProjectListModel } from 'src/app/models';
import { AppState, selectProjectListModel } from 'src/app/reducers';

@Component({
  selector: 'app-project-entry',
  templateUrl: './project-entry.component.html',
  styleUrls: ['./project-entry.component.scss']
})
export class ProjectEntryComponent implements OnInit {
  form: FormGroup;

  projects$: Observable<ProjectListModel[]>;
  constructor(private formBuilder: FormBuilder, private store: Store<AppState>) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      project: ['', [Validators.required, Validators.maxLength(200)]]
    });
    this.projects$ = this.store.pipe(
      select(selectProjectListModel)
    );
  }

  get project(): AbstractControl { return this.form.get('project'); }
  submit(): void {
    console.log(this.form.value);
    this.store.dispatch(projectToAdd({ ...this.form.value }));
    // this.bottomSheetRef.dismiss();
  }

}
