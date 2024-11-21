import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteComponent {
  @Input() itemName: string = ''; // Name of the item to be deleted
  @Output() confirmDelete = new EventEmitter<void>(); // Emits when delete is confirmed
  @Output() cancelDelete = new EventEmitter<void>();  // Emits when delete is canceled

  onConfirm() {
    this.confirmDelete.emit();
  }

  onCancel() {
    this.cancelDelete.emit();
  }
}
