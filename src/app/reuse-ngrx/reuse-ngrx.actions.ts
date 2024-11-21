import { createAction, props } from '@ngrx/store';

// 1. this is single (string,boolean,number) or array, object data sharing (reuse)
// Action to update the shared user input
export const updateSharedInput = createAction(
  '[Dashboard] Update Shared Input',
  props<{ value: string }>()
);

// -----------------------------------------------------------------------------
// 2. this is reuse get api calls in entire application
// Action to initiate the API call
export const loadApiData = createAction(
  '[API] Load Data',
  props<{ apiUrl: string }>()  // Accept API URL as payload
);

// Action to store API response in the state
export const loadApiDataSuccess = createAction(
  '[API] Load Data Success',
  props<{ data: any[] }>() // Assume the API returns an array of objects
);

// Action to handle API call failure
export const loadApiDataFailure = createAction(
  '[API] Load Data Failure',
  props<{ error: string }>()
);

// -------------------------------------------------------------

// 3. this is for reuse post api calls in entire application
// Add Data Actions
export const addApiData = createAction(
  '[API] Add Data',
  props<{ apiUrl: string, newData: any }>() // Accept the API URL and new data to be added
);

export const addApiDataSuccess = createAction(
  '[API] Add Data Success',
  props<{ data: any }>() // Added item data
);

export const addApiDataFailure = createAction(
  '[API] Add Data Failure',
  props<{ error: string }>()
);


// Action to edit a user
export const editApiData = createAction(
  '[User] Edit User',
  props<{ apiUrl: string, id:number ,exitData: any  }>()
);

// Action to edit user success
export const editApiSuccess = createAction(
  '[User] Edit User Success',
  props<{ data: any }>()
);

// Action to edit user failure
export const editApiFailure = createAction(
  '[User] Edit User Failure',
  props<{ error: string }>()
);


// Action to delete a user
export const deleteApiData = createAction(
  '[User] Delete User',
  props<{ apiUrl: string; id: number }>() // API URL and the ID of the user to delete
);

// Action to delete user success
export const deleteApiSuccess = createAction(
  '[User] Delete User Success',
  props<{ id: number }>() // Success returns the ID of the deleted user
);

// Action to delete user failure
export const deleteApiFailure = createAction(
  '[User] Delete User Failure',
  props<{ error: string }>() // Failure returns an error message
);
