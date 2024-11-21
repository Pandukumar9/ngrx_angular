import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ApiService } from 'src/app/services/api.service';
import { ReuseDialogComponent } from '../reuse-dialog/reuse-dialog.component';
import { DeleteComponent } from '../delete/delete.component';
@Component({
  selector: 'obser-signal-ngrx-list',
  templateUrl: './obser-signal-ngrx-list.component.html',
  styleUrls: ['./obser-signal-ngrx-list.component.scss']
})
export class ObserSignalNgrxListComponent implements OnInit{

  constructor(private signal:ApiService,private modalService: BsModalService){}

  ngOnInit() {
    this.signal.loadData();
  }

  apiData$ = this.signal.apiData$;
  loading$ = this.signal.loading$;
  error$ = this.signal.error$;

  bsModalRef!: BsModalRef;

  addUser(){
    this.bsModalRef = this.modalService.show(ReuseDialogComponent, {
      animated: true,
      // backdrop: 'static',
      class: 'modal-md',
      initialState: {
        btnTitle: "Add User"
      }
    });

    // Listen for the `onHidden` event
    this.bsModalRef.onHidden?.subscribe((res) => {
      if(res != 'backdrop-click'){
        this.signal.loadData();// Call getUsers method when the modal is closed
      }
    });
  }

  onDelete(id:number, username:any){
    // if (confirm('Are you sure you want to delete this user?')) {
    //   this.signal.deleteData(id);
    // }

    const initialState = { itemName: username };
    this.bsModalRef = this.modalService.show(DeleteComponent, { initialState });

    // Listen for the delete confirmation
    this.bsModalRef.content.confirmDelete.subscribe(() => {
      this.signal.deleteData(id);
      this.bsModalRef?.hide();
    });

    // Listen for the cancel action
    this.bsModalRef.content.cancelDelete.subscribe(() => {
      this.bsModalRef?.hide();
    });
  }

  onEdit(edituser:any){
    this.bsModalRef = this.modalService.show(ReuseDialogComponent,
    {
      initialState: {
        userdata: edituser, // Pass the data here'
        btnTitle: "Update User"
      },
      animated: true,
      // backdrop: 'static',
      class: 'modal-md',
    },
  );

  // Listen for the `onHidden` event
  this.bsModalRef.onHidden?.subscribe((res) => {
    if(res != 'backdrop-click'){
      this.signal.loadData();// Call getUsers method when the modal is closed
    }
  });
}
  onFetchData() {
  // Dispatch load API data with a specific URL for users
    this.signal.loadData();
  }

  onView(viewuser:any){
    this.bsModalRef = this.modalService.show(ReuseDialogComponent,
      {
        initialState: {
          userdata: viewuser, // Pass the data here
          btnTitle: "View User"
        },
        animated: true,
        // backdrop: 'static',
        class: 'modal-md',
      },
    );

    // Listen for the `onHidden` event
    this.bsModalRef.onHidden?.subscribe((res) => {
      if(res != 'backdrop-click'){
        this.signal.loadData();// Call getUsers method when the modal is closed
      }
    });
  }
}
