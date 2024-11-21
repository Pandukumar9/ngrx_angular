import { createReducer, on } from '@ngrx/store';
import { addApiData, addApiDataFailure, addApiDataSuccess, deleteApiData, deleteApiFailure, deleteApiSuccess, editApiData, editApiFailure, editApiSuccess, loadApiData, loadApiDataFailure, loadApiDataSuccess, updateSharedInput } from './reuse-ngrx.actions';
// import { ApiUserData } from '../model/apiuser.model';

// Define the shape of the state
export interface ApiDataState {
  sharedInput: string; // Shared input state (used across components)

  // apiData: ApiUserData[]; // Array to hold fetched API data
  apiData: any[]; // Array to hold fetched API data
  loading: boolean;    // Loading state for API data fetching
  error: string | null; // Error state for API data fetching
}


// Initial state
export const initialState: ApiDataState = {
  sharedInput: '', // Initial value for shared input

  apiData: [], // Initial empty array for API data
  loading: false, // Initially not loading
  error: null,  // No error initially
};

// Reducer function
export const ngrxApiReducer = createReducer(
  initialState,
  on(updateSharedInput, (state, { value }) => ({
    ...state,
    sharedInput: value,
  })),

  on(loadApiData, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(loadApiDataSuccess, (state, { data }) => ({
    ...state,
    apiData: data,
    loading: false,
  })),
  on(loadApiDataFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

   // Handling Add Data actions
   on(addApiData, (state) => ({
    ...state,
    loading: true,  // Show loading while adding
    error: null,
  })),
  on(addApiDataSuccess, (state, { data }) => ({
    ...state,
    data: [...state.apiData, data],  // Add new item to the data array
    loading: false,
  })),
  on(addApiDataFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

   // Edit user actions
   on(editApiData, (state) => ({
    ...state,
    loading: true,
  })),
  on(editApiSuccess, (state, { data }) => ({
    ...state,
    loading: false,
    users: state.apiData.map((user) =>
      user.id === data.id ? data : user
    ),
  })),
  on(editApiFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(deleteApiData, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  // Handle delete success
  on(deleteApiSuccess, (state, { id }) => ({
    ...state,
    loading: false,
    apiData: state.apiData.filter((user) => user.id !== id), // Remove the user from the list
  })),
  // Handle delete failure
  on(deleteApiFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
