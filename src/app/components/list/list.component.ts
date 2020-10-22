import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { dueDateUpdated, projectUpdate, todoCompleted, todoUnCompleted } from 'src/app/actions/todo-actions';
import { PerspectiveModel, ProjectListModel, TodoListModel } from 'src/app/models';
import { AppState, selectInboxTodoList, selectProjectListModel, selectProjectTodoList } from 'src/app/reducers';
import { TodoEntity } from 'src/app/reducers/todos.reducer';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {

  perspective$: Observable<PerspectiveModel>;
  projects$: Observable<ProjectListModel[]>;
  form: FormGroup;
  editProjectRow = -1;
  editDueDateRow = -1;
  projectEdit = false;
  dueDateEdit = false;
  subscription = new Subscription();

  constructor(
    private dialogRef: MatDialogRef<ListComponent>,
    private store: Store<AppState>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) private data: { perspective: string, id?: string }

  ) { }

  ngOnInit(): void {

    switch (this.data.perspective) {
      case 'Inbox': {
        this.perspective$ = this.store.pipe(
          select(selectInboxTodoList)
        );
        break;
      }
      case 'Project': {
        this.perspective$ = this.store.pipe(
          select(selectProjectTodoList, { id: this.data.id }),
        );
        break;
      }
    }
    this.form = this.formBuilder.group({
      project: [this.data.id],
      dueDate: ['']
    });
    // this.projects$ = this.store.pipe(select(selectProjectListModel));
  }

  projectEditing(index: number): void {
    this.projectEdit = true;
    this.editProjectRow = index;
  }

  submitEditTodoProject(todo: TodoListModel): void {
    const payload = { id: todo.id, newProjectName: this.form.controls.project.value, oldProjectName: this.data.id };
    this.store.dispatch(projectUpdate({ payload }));
    this.projectEdit = false;
    this.editProjectRow = -1;
    this.form.controls.project.patchValue(this.data.id);
  }

  cancelProjectEdit(): void {
    this.projectEdit = false;
    this.editProjectRow = -1;
    this.form.controls.project.patchValue(this.data.id);
  }

  dueDateEditing(index: number): void {
    this.dueDateEdit = true;
    this.editDueDateRow = index;
  }

  submitEditTodoDueDate(todo: TodoListModel): void {
    let editedTodo: TodoListModel;
    this.subscription = this.perspective$.subscribe(x => editedTodo = x.items.find(td => td.id === todo.id));
    this.store.dispatch(dueDateUpdated(
      { id: todo.id, newDate: this.form.controls.dueDate.value as string, oldDate: editedTodo.dueDate }));
    this.dueDateEdit = false;
    this.editDueDateRow = -1;
    this.form.controls.dueDate.patchValue('');
  }

  cancelDueDateEdit(): void {
    this.dueDateEdit = false;
    this.editDueDateRow = -1;
    this.form.controls.dueDate.patchValue('');
  }

  markCompleted(payload: TodoEntity): void {
    this.store.dispatch(todoCompleted({ payload }));
  }
  markUnCompleted(payload: TodoEntity): void {
    this.store.dispatch(todoUnCompleted({ payload }));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
