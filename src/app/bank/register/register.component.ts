import { Component, inject, OnInit } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Bank } from '../../shared/models/bank.model';
import { BankService } from '../../shared/service/bank.service';
import { AuthorizationService } from '../../shared/service/authorization.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnInit {
  bankId: number | null = null;
  bank: Bank = {
    id: undefined,
    codigo: '',
    descricao: '',
    status: { id: '', descricao: '' },
  };

  showModal: boolean = false;
  selectedItem: string = '';

  canAddEdit: boolean = false;
  canDelete: boolean = false;

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private toastr = inject(ToastrService);
  private bankService = inject(BankService);
  private authorizationService = inject(AuthorizationService);

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.bankId = +params.get('id')!;
      if (this.bankId) {
        this.loadBankDetails(this.bankId);
      }
    });

    this.initializePermissions();
  }

  loadBankDetails(id: number): void {
    this.bankService.getBank(id).subscribe({
      next: (response: Bank) => {
        this.bank = response;
      },
      error: () => {
        this.toastr.error('Erro ao carregar os detalhes do banco.', 'Erro');
      },
    });
  }

  saveBank(): void {
    if (!this.canAddEdit) {
      this.showPermissionError();
      return;
    }

    const action = this.bankId
      ? this.bankService.updateBank(this.bankId, this.bank)
      : this.bankService.addBank(this.bank);

    action.subscribe({
      next: () => {
        const message = this.bankId
          ? 'Banco atualizado com sucesso!'
          : 'Banco cadastrado com sucesso!';
        this.toastr.success(message, 'Sucesso');
        this.closeForm();
      },
      error: () => {
        this.toastr.error('Erro ao salvar banco.', 'Erro');
      },
    });
  }

  deleteBank(): void {
    if (!this.canDelete) {
      this.showPermissionError();
      return;
    }

    this.selectedItem = this.bank.descricao || 'este banco';
    this.showModal = true;
  }

  confirmDeletion(): void {
    if (!this.canDelete) {
      this.showPermissionError();
      return;
    }

    this.bankService.deleteBank(this.bankId!).subscribe({
      next: () => {
        this.toastr.success('Banco excluído com sucesso!', 'Sucesso');
        this.router.navigate(['/bank/list']);
      },
      error: () => {
        this.toastr.error('Erro ao excluir banco.', 'Erro');
      },
    });
    this.closeModal();
  }

  closeModal(): void {
    this.showModal = false;
  }

  closeForm(): void {
    this.router.navigate(['/bank/list']);
  }

  initializePermissions(): void {
    this.canAddEdit = this.authorizationService.hasAnyRole([
      'ROLE_BANCO_ADD',
      'ROLE_BANCO_EDT',
    ]);
    this.canDelete = this.authorizationService.hasRole('ROLE_BANCO_DEL');
  }

  showPermissionError(): void {
    this.toastr.error(
      'Você não tem permissão para realizar esta ação.',
      'Erro'
    );
  }
}
