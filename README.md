Angular Application with NgRx and API Call Reusability
This project demonstrates a complete integration of NgRx for state management, reusable API calls, and a shared state variable across the entire application. The structure is designed to ensure scalability, modularity, and efficiency.

Features
NgRx State Management: Full integration with Actions, Reducers, Selectors, and Effects.
API Reusability: Centralized service for making API calls.
Shared State Variable: Single shared variable accessible across all components.
Optimized Change Detection: Leveraging Angular's OnPush strategy for performance.
Dynamic Component Communication: Using NgRx to manage state transitions and data flow between components.
Setup Instructions
1. Clone Repository
bash
Copy code
git clone https://github.com/your-repo-name.git
cd your-repo-name
2. Install Dependencies
bash
Copy code
npm install
3. Run the Application
bash
Copy code
ng serve
NgRx Integration
State Architecture
State: Maintains global data, including API responses and a shared variable.
Actions: Define all possible events like adding, editing, deleting users, or updating shared state.
Reducers: Handle state changes based on dispatched actions.
Selectors: Efficiently retrieve data from the store.
Effects: Manage side effects like API calls.
Folder Structure
bash
Copy code
src/app
│
├── store
│   ├── actions
│   │   └── user.actions.ts       # Actions for API calls and state changes
│   ├── reducers
│   │   └── user.reducer.ts       # Reducer to handle state changes
│   ├── effects
│   │   └── user.effects.ts       # Effects to manage API side effects
│   └── selectors
│       └── user.selectors.ts     # Selectors for efficient data access
│
├── services
│   └── api.service.ts            # Centralized API service
│
├── components
│   ├── user-list
│   │   ├── user-list.component.ts   # Displays the user list
│   │   └── user-list.component.html
│   └── user-form
│       ├── user-form.component.ts   # Handles user add/edit
│       └── user-form.component.html
│
└── app.module.ts
Reusable API Service
The ApiService manages all API calls, ensuring consistency and reusability across the application.

api.service.ts
typescript
Copy code
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  get<T>(url: string): Observable<T> {
    return this.http.get<T>(url);
  }

  post<T>(url: string, body: any): Observable<T> {
    return this.http.post<T>(url, body);
  }

  put<T>(url: string, body: any): Observable<T> {
    return this.http.put<T>(url, body);
  }

  delete<T>(url: string): Observable<T> {
    return this.http.delete<T>(url);
  }
}
State Management
Actions (user.actions.ts)
typescript
Copy code
import { createAction, props } from '@ngrx/store';

export const loadUsers = createAction('[User API] Load Users', props<{ apiUrl: string }>());
export const loadUsersSuccess = createAction('[User API] Load Users Success', props<{ users: any[] }>());
export const loadUsersFailure = createAction('[User API] Load Users Failure', props<{ error: string }>());

export const updateSharedVariable = createAction('[Shared] Update Shared Variable', props<{ value: string }>());
Reducer (user.reducer.ts)
typescript
Copy code
import { createReducer, on } from '@ngrx/store';
import { loadUsersSuccess, loadUsersFailure, updateSharedVariable } from '../actions/user.actions';

export interface UserState {
  users: any[];
  sharedVariable: string;
  error: string | null;
}

export const initialState: UserState = {
  users: [],
  sharedVariable: '',
  error: null,
};

export const userReducer = createReducer(
  initialState,
  on(loadUsersSuccess, (state, { users }) => ({ ...state, users, error: null })),
  on(loadUsersFailure, (state, { error }) => ({ ...state, error })),
  on(updateSharedVariable, (state, { value }) => ({ ...state, sharedVariable: value }))
);
Selectors (user.selectors.ts)
typescript
Copy code
import { createSelector, createFeatureSelector } from '@ngrx/store';
import { UserState } from '../reducers/user.reducer';

export const selectUserState = createFeatureSelector<UserState>('users');

export const selectUsers = createSelector(selectUserState, (state) => state.users);
export const selectSharedVariable = createSelector(selectUserState, (state) => state.sharedVariable);
export const selectError = createSelector(selectUserState, (state) => state.error);
Effects (user.effects.ts)
typescript
Copy code
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ApiService } from '../../services/api.service';
import { loadUsers, loadUsersSuccess, loadUsersFailure } from '../actions/user.actions';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class UserEffects {
  constructor(private actions$: Actions, private apiService: ApiService) {}

  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadUsers),
      mergeMap(({ apiUrl }) =>
        this.apiService.get(apiUrl).pipe(
          map((users) => loadUsersSuccess({ users })),
          catchError((error) => of(loadUsersFailure({ error: error.message })))
        )
      )
    )
  );
}
Usage in Components
user-list.component.ts
typescript
Copy code
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadUsers, updateSharedVariable } from '../../store/actions/user.actions';
import { selectUsers, selectSharedVariable } from '../../store/selectors/user.selectors';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
})
export class UserListComponent implements OnInit {
  users$ = this.store.select(selectUsers);
  sharedVariable$ = this.store.select(selectSharedVariable);

  constructor(private store: Store) {}

  ngOnInit() {
    this.store.dispatch(loadUsers({ apiUrl: 'https://api.example.com/users' }));
  }

  updateShared(value: string) {
    this.store.dispatch(updateSharedVariable({ value }));
  }
}
Contributing
Fork the repository.
Create your feature branch: git checkout -b feature-name.
Commit your changes: git commit -m 'Add feature'.
Push to the branch: git push origin feature-name.
Open a pull request.