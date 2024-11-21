import { Injectable, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable } from 'rxjs';
import { selectApiData, selectApiError, selectApiLoading, selectSharedInput } from '../reuse-ngrx/reuse-ngrx.selectors';
import { addApiData, deleteApiData, editApiData, loadApiData, updateSharedInput } from '../reuse-ngrx/reuse-ngrx.actions';
import { ApiUserData } from '../models/apiuser.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {


  userdata = new BehaviorSubject("initial data");

  signalData = signal('madhu signal');

  constructor(private store: Store) {}

  sharedInput$ = this.store.select(selectSharedInput);

  updateSharedInput(value: string) {
    this.store.dispatch(updateSharedInput({ value }));
  }
// ---------------------------------------------------------------------
  apiData$: Observable<ApiUserData[]> = this.store.select(selectApiData);
  loading$ = this.store.select(selectApiLoading);
  error$ = this.store.select(selectApiError);


  url:string = "http://localhost:3000/users";

  ngOnInit(): void {
    this.loadData();  // Load data when component is initialized
  }

  // Dispatch action to load API data
  loadData() {
    this.store.dispatch(loadApiData({ apiUrl: this.url }));
  }

  addData(newUser:any) {
    this.store.dispatch(addApiData({ apiUrl: this.url, newData: newUser }));
  }

  updateData(updatedData: any) {
    this.store.dispatch(editApiData({ apiUrl: this.url, id: updatedData.id, exitData: updatedData }));
  }

  deleteData(existdataId: number) {
    this.store.dispatch(deleteApiData({ apiUrl: this.url, id: existdataId }));
  }
}
