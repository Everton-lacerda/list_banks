import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Bank } from '../../shared/models/bank.model';
import { BankService } from '../../shared/service/bank.service';

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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private bankService: BankService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.bankId = +params.get('id')!;
      if (this.bankId) {
        this.loadBankDetails(this.bankId);
      }
    });
  }

  loadBankDetails(id: number): void {
    this.bankService.getBank(id).subscribe({
      next: (response: Bank) => {
        this.bank = response;
      },
      error: () => {
        this.toastr.error('Erro ao carregar os detalhes do banco.', 'Erro');
      }
    });
  }

  saveBank(): void {
    if (this.bankId) {
      this.bankService.updateBank(this.bankId, this.bank).subscribe({
        next: () => {
          this.toastr.success('Banco atualizado com sucesso!', 'Sucesso');
          this.closeForm();
        },
        error: () => {
          this.toastr.error('Erro ao atualizar banco.', 'Erro');
        }
      });
    } else {
      this.bankService.addBank(this.bank).subscribe({
        next: () => {
          this.toastr.success('Banco cadastrado com sucesso!', 'Sucesso');
          this.closeForm();
        },
        error: () => {
          this.toastr.error('Erro ao cadastrar banco.', 'Erro');
        }
      });
    }
  }

  closeForm(): void {
    this.router.navigate(['/bank/list']);
  }

  deleteBank(): void {
    if (confirm('Deseja realmente excluir este banco?')) {
      this.bankService.deleteBank(this.bankId!).subscribe({
        next: () => {
          this.toastr.success('Banco excluído com sucesso!', 'Sucesso');
          this.router.navigate(['/bank/list']);
        },
        error: () => {
          this.toastr.error('Erro ao excluir banco.', 'Erro');
        }
      });
    }
  }
}
