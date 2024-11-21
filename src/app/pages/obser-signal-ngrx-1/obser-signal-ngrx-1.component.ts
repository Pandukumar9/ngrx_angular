import { ChangeDetectorRef, Component, effect } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { selectApiData } from 'src/app/reuse-ngrx/reuse-ngrx.selectors';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'obser-signal-ngrx-1',
  templateUrl: './obser-signal-ngrx-1.component.html',
  styleUrls: ['./obser-signal-ngrx-1.component.scss']
})
export class ObserSignalNgrx1Component {
  user1:any;
  singaldata:any;
  users:any;

  userForm!: FormGroup;
  userToEdit: any = null;

  sharedInput$ = this.signal.sharedInput$;

  apiData$ = this.signal.apiData$;
  loading$ = this.signal.loading$;
  error$ = this.signal.error$;

  bsModalRef!: BsModalRef;

  constructor(private signal:ApiService,private fb: FormBuilder,private store: Store,private cdr: ChangeDetectorRef){
    effect(() => {
      console.log(this.signal.signalData());
      this.singaldata = this.signal.signalData();
    });
    this.initiateForm();
  }

  ngOnInit() {
    this.signal.userdata.subscribe(res => {
      console.log(res);
      this.user1 = res;
    });

    this.apiData$ = this.store.pipe(select(selectApiData));

  }

  savedata(){
    this.signal.userdata.next(this.users);

    this.signal.signalData.set(this.users);
  }

  onInputChange(data: any) {
    this.signal.updateSharedInput(data.value);
  }

  onFetchData() {
    // Dispatch load API data with a specific URL for users
    this.signal.loadData();
  }

  onSubmit() {
    if (this.userForm.valid) {
      // Add new user
      this.signal.addData(this.userForm.value);
      this.signal.loadData();
      this.userForm.reset();
    }
  }

  onEdit(edituser:any){
        // Edit user
        this.signal.updateData(edituser);
        // this.userToEdit = null;
  }

  initiateForm(){
    this.userForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
    });
  }

  ngAfterViewChecked() {
    this.cdr.detectChanges(); // Manually trigger change detection
  }
}
