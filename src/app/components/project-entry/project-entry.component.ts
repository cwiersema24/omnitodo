import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { todoAdded } from 'src/app/actions/todo-actions';
import { AppState } from 'src/app/reducers';

@Component({
  selector: 'app-project-entry',
  templateUrl: './project-entry.component.html',
  styleUrls: ['./project-entry.component.scss']
})
export class ProjectEntryComponent implements OnInit {
  form: FormGroup;
  constructor(private formBuilder: FormBuilder, private store: Store<AppState>) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      project: ['', [Validators.required, Validators.maxLength(200)]]
    });
  }
  get project(): AbstractControl { return this.form.get('project'); }
  submit(): void {
    console.log(this.form.value);
    this.store.dispatch(todoAdded({ name: this.form.value, dueDate: null, project: '1' }));
    // this.bottomSheetRef.dismiss();
  }

}
