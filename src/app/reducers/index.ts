import { ActionReducerMap, createSelector } from '@ngrx/store';
import { ProjectListModel } from '../models';
import * as fromProjects from './projects.reducer';
import * as fromTodos from './todos.reducer';
export interface AppState {
  projects: fromProjects.ProjectState;
  todos: fromTodos.TodoState;

}
export const reducers: ActionReducerMap<AppState> = {
  projects: fromProjects.reducer,
  todos: fromTodos.reducer
};

const selectProjectBranch = (state: AppState) => state.projects;
const selectTodosBranch = (state: AppState) => state.todos;

const { selectAll: selectAllProjectEntities } = fromProjects.adapter.getSelectors(selectProjectBranch);
const { selectAll: selectAllTodoEntities } = fromTodos.adapter.getSelectors(selectTodosBranch);
const selectAllIncompleteTodoEntities = createSelector(
  selectAllTodoEntities,
  todos => todos.filter(t => t.completed === false)
);
export const selectProjectListModel = createSelector(
  selectAllProjectEntities,
  items => items as ProjectListModel[]
);
export const selectInboxCount = createSelector(
  selectAllIncompleteTodoEntities,
  (todos) => todos.filter(t => t.dueDate === null && t.project === null).length
);
