
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { map, switchMap, catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import * as authActions from '../actions/auth.actions';
import * as todoActions from '../actions/todo-actions';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { createAction } from '@ngrx/store';
import { TodoEntity } from '../reducers/todos.reducer';
import { ProjectEntity } from '../reducers/projects.reducer';

@Injectable()
export class TodoEffects {

  apiUrl = environment.apiUrl;

  saveProjectAdded$ = createEffect(() =>
    this.actions$.pipe(
      ofType(todoActions.projectToAdd),
      map(action => action.payload),
      switchMap(project => this.client.post<TodoEntity>(this.apiUrl + 'todos', makeAProjectCreate(project))
        .pipe(
          map(response => todoActions.projectAddedSuccessfully({ oldId: project.id, payload: response })),
          catchError(err => of(todoActions.projectAddFailure({ message: 'Blammo!', payload: project })))
        )
      )
    ), { dispatch: true }
  );

  todoComplete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(todoActions.todoCompleted),
      map(action => action.payload),
      switchMap(todo => this.client.post<TodoEntity>(this.apiUrl + 'todos/completed', makeATodoUpdate(todo))
        .pipe(
          map(response => todoActions.todoCompleteSuccessful()),
          catchError(err => of(todoActions.todoCompletefailure())
          )
        )))
  );
  todoUnComplete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(todoActions.todoUnCompleted),
      map(action => action.payload),
      switchMap(todo => this.client.post<TodoEntity>(this.apiUrl + 'todos/incompleted', makeATodoUpdate(todo))
        .pipe(
          map(response => todoActions.todoUnCompleteSuccessful()),
          catchError(err => of(todoActions.todoUnCompletefailure())
          )
        )))
  );
  saveTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(todoActions.todoAdded),
      map(action => action.payload),
      switchMap(todo => this.client.post<TodoEntity>(this.apiUrl + 'todos', makeATodoCreate(todo))
        .pipe(
          map(response => todoActions.todoAddedSuccessfully({ oldId: todo.id, payload: response })),
          catchError(err => of(todoActions.todoAddedFailure({ message: 'Blammo!', payload: todo })))
        )
      )
    ), { dispatch: true }
  );

  loadTodos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(todoActions.loadTodos),
      switchMap(() => this.client.get<{ data: TodoEntity[] }>(this.apiUrl + 'todos')
        .pipe(
          map(results => todoActions.loadDataSucceeded({ payload: results.data })),
          catchError(results => of(todoActions.loadDataFailure({ message: 'Sorry. No Todos for you!' })))
        ))), { dispatch: true }
  );

  constructor(private actions$: Actions, private client: HttpClient) { }
}

interface TodoCreate {
  name: string;
  project?: string;
  dueDate?: string;
  completed: boolean;
}
function makeATodoCreate(todo: TodoEntity): TodoCreate {
  return {
    name: todo.name,
    project: todo.project,
    dueDate: todo.dueDate,
    completed: todo.completed
  };
}
interface ProjectCrearte {
  name: string;
}
function makeAProjectCreate(project: ProjectEntity): ProjectCrearte {
  return {
    name: project.name
  };
}
interface TodoUpdate {
  id: string;
  name: string;
  project: string;
  dueDate: string;
  completed: boolean;
}
function makeATodoUpdate(todo: TodoEntity): TodoUpdate {
  return {
    id: todo.id,
    name: todo.name,
    project: todo.project,
    dueDate: todo.dueDate,
    completed: todo.completed
  };
}
