import { ActionReducerMap, createSelector, props } from '@ngrx/store';
import { PerspectiveModel, ProjectListModel, TodoListModel } from '../models';
import { ProjectListItemModel } from '../models/ptoject-list-item.model';
import * as fromProjects from './projects.reducer';
import * as fromTodos from './todos.reducer';
import * as fromAuth from './auth.reducer';
import { todoUnCompleted } from '../actions/todo-actions';
export interface AppState {
  projects: fromProjects.ProjectState;
  todos: fromTodos.TodoState;
  auth: fromAuth.AuthState;

}
export const reducers: ActionReducerMap<AppState> = {
  projects: fromProjects.reducer,
  todos: fromTodos.reducer,
  auth: fromAuth.reducer
};

const selectProjectBranch = (state: AppState) => state.projects;
const selectTodosBranch = (state: AppState) => state.todos;
const selectAuthBranch = (state: AppState) => state.auth;

const { selectAll: selectAllProjectEntities, selectEntities: selectProjectItems } = fromProjects.adapter.getSelectors(selectProjectBranch);
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
  selectAllTodoEntities,
  // selectAllIncompleteTodoEntities,
  (todos) => todos.filter(isInboxItemCount).length
);
const selectTodoListItemsUnfiltered = createSelector(
  selectAllTodoEntities,
  // selectAllIncompleteTodoEntities,
  selectProjectItems,
  (todos, projects) => {
    return todos.map(todo => {

      return {
        ...todo,
        project: !todo.project ? null : projects[todo.project].name
      } as TodoListModel;
    });
  }
);
export const selectProjectTodoList = createSelector(
  selectTodoListItemsUnfiltered,
  selectProjectItems,
  (todos, projects, props) => {
    const pName = projects[props.id].name;
    return {
      perspectiveName: pName + ' Project',
      items: todos.filter(todo => todo.project === pName)
    } as PerspectiveModel;
  }
);
export const selectInboxTodoList = createSelector(
  selectTodoListItemsUnfiltered,
  (todos) => {
    return {
      perspectiveName: 'Inbox',
      items: todos.filter(isInboxItem)
    } as PerspectiveModel;
  }
);

function isInboxItem(todo: TodoListModel): boolean {
  return !todo.dueDate || !todo.project;
}
function isInboxItemCount(todo: TodoListModel): boolean {
  return !todo.dueDate || !todo.project && !todo.completed;
}


export const selectProjectListWithCount = createSelector(
  selectAllIncompleteTodoEntities,
  selectAllProjectEntities,
  (todos, projects) => {
    return projects.map(project => {
      const numberOfItemsWithThatProject = todos.filter(todo => todo.project === project.id).length;
      return {
        ...project,
        numberOfProjects: numberOfItemsWithThatProject
      } as ProjectListItemModel;
    });
  }
);

export const selectAuthIsLoggedIn = createSelector(
  selectAuthBranch,
  b => b.isLoggedIn
);
export const selectAuthUserName = createSelector(
  selectAuthBranch,
  b => b.username
);
export const selectAuthToken = createSelector(
  selectAuthBranch,
  b => b.token
);


