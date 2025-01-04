import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {
  @Input() showModal: boolean = false;
  @Output() close: EventEmitter<void> = new EventEmitter();
  @Output() confirm: EventEmitter<void> = new EventEmitter();
  @Input() modalTitle: string = '';
  @Input() modalBody: string = '';

  closeModal() {
    this.close.emit();
  }

  confirmDeletion() {
    this.confirm.emit();
  }
}
