import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-reuse-dialog',
  templateUrl: './reuse-dialog.component.html',
  styleUrls: ['./reuse-dialog.component.scss']
})
export class ReuseDialogComponent {
  constructor(private api:ApiService,private fb: FormBuilder,public bsModalRef: BsModalRef){
  }

  userdata:any
  apiData$ = this.api.apiData$;
  loading$ = this.api.loading$;
  error$ = this.api.error$;
  title?: string; // Title passed from parent
  ngOnInit() {
    this.initiateForm();
  }

  initiateForm(){
    this.userForm = this.fb.group({
      username: [this.userdata?.username? this.userdata?.username : '', [Validators.required, Validators.minLength(3)]],
      email: [this.userdata?.email? this.userdata?.email :'', [Validators.required, Validators.email]],
      mobile: [this.userdata?.mobile? this.userdata?.mobile :'', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
    });
  }
  userForm!: FormGroup;
  userToEdit: any = null;
   onSubmit() {
     if (this.userForm.valid) {
       this.api.addData(this.userForm.value);
       this.bsModalRef.hide(); // Close modal
       this.userForm.reset();
     }
   }

   onEdit(edituser:any){
         // Edit user
         this.api.updateData(edituser);
         // this.userToEdit = null;
   }

   onDelete(data:any){

   }
}
