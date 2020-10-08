import { createAction, props } from '@ngrx/store';

export const loginRequested = createAction(
  '[todos auth] login requested',
  props<{ payload: { username: string, password: string } }>()
);


export const loginSucceeded = createAction(
  '[todos auth] login was successful',
  props<{ payload: { username: string, token: string } }>()
);

export const loginFailed = createAction(
  '[todos auth] login failed',
  props<{ message: string }>()
);

export const logout = createAction(
  '[todos auth] Logging out',
  props<{ payload: { token: string } }>()
);
