import { Action, ActionReducerMap, createAction, createReducer, on, props } from "@ngrx/store";
import { User } from "src/app/models/user";
import { All, AuthActionTypes } from "../actions/auth.actions";

export interface State {
    // is a user authenticated?
    isAuthenticated: boolean;
    // if authenticated, there should be a user object
    user: User | null;
    // error message
    errorMessage: string | null;
  }

  export const initialState: State = {
    isAuthenticated: false,
    user: null,
    errorMessage: null
  };

  const LogInSuccess = createAction(AuthActionTypes.LOGIN_SUCCESS, props<{payload: any}>())

  export const authReducer = createReducer(
    initialState,
    on(LogInSuccess, (state, action) => {
      return {
        ...state,
        isAuthenticated: true,
        user: {
          token: action.payload.token,
          email: action.payload.email
        },
        errorMessage: null
      };
    })
  );

  function reducer(state: State | undefined, action: Action): State {
    return authReducer(state, action);
  }

  export const reducers: ActionReducerMap<{ globalAuth: State }> = {
    globalAuth: reducer,
};