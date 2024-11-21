import { Component, effect, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'obser-signal-ngrx-3',
  templateUrl: './obser-signal-ngrx-3.component.html',
  styleUrls: ['./obser-signal-ngrx-3.component.scss']
})
export class ObserSignalNgrx3Component {
  user3:any;
  singaldata:any;
  private subscription: Subscription = new Subscription(); // To manage subscriptions

  constructor(private api:ApiService){
       // Effect to log changes to the signal
       effect(() => {
        console.log('Signal updated:', this.api.signalData());
        this.singaldata = this.api.signalData();
      });
  }

  ngOnInit(): void {
    // Subscribe to data service
    const dataSub = this.api.userdata.subscribe((data) => {
      this.user3 = data;
    });

    // Add subscription to the Subscription instance
    this.subscription.add(dataSub);
  }

  ngOnDestroy(): void {
    // Clean up subscriptions
    this.subscription.unsubscribe();
  }

  users:any;
  savedata(){
    this.api.userdata.next(this.users);

    this.api.signalData.set(this.users);
  }

  sharedInput$ = this.api.sharedInput$;
  onInputChange(data: any) {
    this.api.updateSharedInput(data.value);
  }

  apiData$ = this.api.apiData$;
  loading$ = this.api.loading$;
  error$ = this.api.error$;

  onFetchData() {
    // Dispatch load API data with a specific URL for users
    this.api.loadData();
  }
}
