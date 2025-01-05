import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent {
  @Input() showModal: boolean = false;
  @Input() selectedCount: number = 0;
  @Input() modalTitle: string = 'Confirmar Exclusão';
  @Output() close: EventEmitter<void> = new EventEmitter();
  @Output() confirm: EventEmitter<void> = new EventEmitter();

  get modalBody(): string {
    if (this.selectedCount === 1) {
      return 'Confirma a exclusão do registro?';
    } else if (this.selectedCount > 1) {
      return `Confirma a exclusão de ${this.selectedCount} registro(s) selecionado(s)?`;
    }
    return '';
  }

  closeModal() {
    this.close.emit();
  }

  confirmDeletion() {
    this.confirm.emit();
  }
}
