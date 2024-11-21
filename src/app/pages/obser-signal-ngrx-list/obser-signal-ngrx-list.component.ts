import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ApiService } from 'src/app/services/api.service';
import { ReuseDialogComponent } from '../reuse-dialog/reuse-dialog.component';

@Component({
  selector: 'obser-signal-ngrx-list',
  templateUrl: './obser-signal-ngrx-list.component.html',
  styleUrls: ['./obser-signal-ngrx-list.component.scss']
})
export class ObserSignalNgrxListComponent {
  constructor(private signal:ApiService,private fb: FormBuilder,private modalService: BsModalService,private store: Store,private cdr: ChangeDetectorRef){}

  ngOnInit() {
    this.signal.loadData();
  }

  apiData$ = this.signal.apiData$;
  loading$ = this.signal.loading$;
  error$ = this.signal.error$;

  bsModalRef!: BsModalRef;

  addUser(){
    // const initialState: Partial<ReuseDialogComponent> = {
    //   // title: 'Add User',
    //   userData: { name: 'Alice', email: 'alice@example.com',mobile :'7432434223' }, // Data to pass
    // };

    this.bsModalRef = this.modalService.show(ReuseDialogComponent, {
      // initialState, // Pass the initialState object
      animated: true,
      // backdrop: 'static',
      class: 'modal-md',
    });

       // Listen for the `onHidden` event
       this.bsModalRef.onHidden?.subscribe(() => {
        this.signal.loadData();// Call getUsers method when the modal is closed
      });
  }

  onDelete(id:number){
    if (confirm('Are you sure you want to delete this user?')) {
      // Dispatch the delete action
      this.signal.deleteData(id);
    }
  }

  onEdit(edituser:any){
    // Edit user
    // this.signal.updateData(edituser);
    // this.userToEdit = null;

    // const initialState: Partial<ReuseDialogComponent> = {
    //   // title: 'Add User',
    //   userData: { name: 'Alice', email: 'alice@example.com',mobile :'7432434223' }, // Data to pass
    // };
    this.bsModalRef = this.modalService.show(ReuseDialogComponent,
    {
      initialState: {
        userdata: edituser, // Pass the data here
      },
      // initialState, // Pass the initialState object
      animated: true,
      // backdrop: 'static',
      class: 'modal-md',
    },
  );

       // Listen for the `onHidden` event
       this.bsModalRef.onHidden?.subscribe(() => {
        this.signal.loadData();// Call getUsers method when the modal is closed
      });
}
onFetchData() {
  // Dispatch load API data with a specific URL for users
  this.signal.loadData();
}
}
