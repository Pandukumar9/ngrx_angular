import { Component, effect, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
@Component({
  selector: 'obser-signal-ngrx-2',
  templateUrl: './obser-signal-ngrx-2.component.html',
  styleUrls: ['./obser-signal-ngrx-2.component.scss']
})
export class ObserSignalNgrx2Component {
  user2:any;
  singaldata:any;
  constructor(private api:ApiService){
    effect(() => {
      console.log(this.api.signalData());
      this.singaldata = this.api.signalData();
    })
  }
  ngOnInit() {
    this.api.userdata.subscribe(res => {
      console.log(res);
      this.user2 = res;
    })
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
