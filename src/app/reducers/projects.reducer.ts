import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { createReducer, Action, on } from '@ngrx/store';
import * as actions from '../actions/todo-actions';

export interface ProjectEntity {
  id: string;
  name: string;
}

export interface ProjectState extends EntityState<ProjectEntity> {

}

export const adapter = createEntityAdapter<ProjectEntity>();

// const initialState = adapter.getInitialState();

const initialState: ProjectState = {
  ids: ['1', '2', '3'],
  entities: {
    1: { id: '1', name: 'Work' },
    2: { id: '2', name: 'Home' },
    3: { id: '3', name: 'Fitness' },
  }
};

const reducerFunction = createReducer(
  initialState,
  on(actions.projectToAdd, (oldState, action) => adapter.addOne(action.payload, oldState)),
  on(actions.projectAddedSuccessfully, (oldState, action) => {
    const tempState = adapter.removeOne(action.oldId, oldState);
    return adapter.addOne(action.payload, tempState);
  }),
  on(actions.projectAddFailure, (oldState, action) => adapter.removeOne(action.payload.id, oldState))
);

export function reducer(state: ProjectState = initialState, action: Action) {
  return reducerFunction(state, action);
}



