import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { addApiData, addApiDataFailure, addApiDataSuccess, deleteApiData, deleteApiFailure, deleteApiSuccess, editApiData, editApiFailure, editApiSuccess, loadApiData, loadApiDataFailure, loadApiDataSuccess } from './reuse-ngrx.actions';

@Injectable()
export class NgrxApiEffects {
  constructor(private actions$: Actions, private http: HttpClient) {}

  // Effect to load API data
  loadApiData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadApiData), // Listen for the loadApiData action
      mergeMap(({ apiUrl }) =>
        this.http.get<any[]>(apiUrl).pipe( // Replace with your API endpoint
          map((data) => loadApiDataSuccess({ data })), // Dispatch success action with data
          catchError((error) => of(loadApiDataFailure({ error: error.message }))) // Dispatch failure action
        )
      )
    )
  );

    // Effect to add new data
  addApiData$ = createEffect(() =>
      this.actions$.pipe(
        ofType(addApiData),
        mergeMap(({ apiUrl, newData }) =>
          this.http.post<any>(apiUrl, newData).pipe( // POST request to add new data
            map((data) => addApiDataSuccess({ data })), // Dispatch success with added data
            catchError((error) => of(addApiDataFailure({ error: error.message }))) // Dispatch failure action
          )
        )
      )
  );

      // Effect to edit an existing user
  editUser$ = createEffect(() =>
        this.actions$.pipe(
          ofType(editApiData),
          mergeMap(({ apiUrl, id, exitData }) => // Correctly destructure all properties
            this.http.put<any>(`${apiUrl}/${id}`, exitData).pipe(
              map((data) => editApiSuccess({ data })), // Success action
              catchError((error) => of(editApiFailure({ error: error.message }))) // Failure action
            )
          )
        )
  );

  deleteUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteApiData), // Listen for the delete action
      mergeMap(({ apiUrl, id }) =>
        this.http.delete<any>(`${apiUrl}/${id}`).pipe(
          map(() => deleteApiSuccess({ id })), // Dispatch success action with the user ID
          catchError((error) => of(deleteApiFailure({ error: error.message }))) // Dispatch failure action
        )
      )
    )
  );

}
