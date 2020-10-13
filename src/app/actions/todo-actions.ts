import { createAction, props } from '@ngrx/store';
import { ProjectEntity } from '../reducers/projects.reducer';
import { TodoEntity } from '../reducers/todos.reducer';

let currentId = 1;

export const todoCompleted = createAction(
  '[Todos] todo completed',
  props<{ payload: TodoEntity }>()
);
export const todoCompleteSuccessful = createAction(
  '[todos] todo complete successfully updated'
);
export const todoCompletefailure = createAction(
  '[todos] todo complete failed to update'
);
export const todoUnCompleted = createAction(
  '[Todos] todo uncompleted',
  props<{ payload: TodoEntity }>()
);
export const todoUnCompleteSuccessful = createAction(
  '[todos] todo uncomplete successfully updated'
);
export const todoUnCompletefailure = createAction(
  '[todos] todo Uncomplete failed to update'
);
export const todoAdded = createAction(
  '[todos] todo added',
  ({ name, dueDate, project }: TodoCreate) => ({
    payload: {
      id: 'T' + currentId++,
      name,
      dueDate,
      project,
      completed: false
    } as TodoEntity
  })
);

export const todoAddedSuccessfully = createAction(
  '[todos] todo added successfully',
  props<{ oldId: string, payload: TodoEntity }>()
);
export const todoAddedFailure = createAction(
  '[todos] todo added failure',
  props<{ message: string, payload: TodoEntity }>()
);

export const loadTodos = createAction(
  '[todos] load todo data'
);

export const loadDataSucceeded = createAction(
  '[todos] loaded data successfully',
  props<{ payload: TodoEntity[] }>()
);

export const loadDataFailure = createAction(
  '[todos] loading data failed',
  props<{ message: string }>()
);

export const projectToAdd = createAction(
  '[todos] project addd',
  ({ project }) => ({
    payload: {
      id: 'P' + currentId++,
      name: project.trim().replace(' ', '-')
    } as ProjectEntity
  })
);
export const projectAddedSuccessfully = createAction(
  '[todos] project added successfully',
  props<{ oldId: string, payload: ProjectEntity }>()
);
export const projectAddFailure = createAction(
  '[todos] project add failure',
  props<{ message: string, payload: ProjectEntity }>()
);


interface TodoCreate {
  name: string;
  dueDate?: string;
  project?: string;
}
