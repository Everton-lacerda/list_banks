import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BankService } from '../../shared/service/bank.service';
import { Bank } from '../../shared/models/bank.model';
import { SharedModule } from '../../shared/shared.module';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  banks: Bank[] = [];
  paginatedBanks: Bank[] = [];
  selectedBanks: Bank[] = [];
  totalItems = 0;
  itemsPerPage = 10;
  currentPage = 1;
  searchTerm = '';
  showModal = false;
  isLoading = false;

  private router = inject(Router);
  private bankService = inject(BankService);
  private toastr = inject(ToastrService);

  ngOnInit(): void {
    this.loadBanks();
  }

  loadBanks(): void {
    this.isLoading = true;
    this.bankService.getBanks().subscribe({
      next: (response: any) => {
        this.banks = response.content;
        this.totalItems = response.totalElements;
        this.updatePaginatedBanks();
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
        this.toastr.error('Erro ao carregar bancos.', 'Erro');
      }
    });
  }

  updatePaginatedBanks(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedBanks = this.banks.slice(startIndex, endIndex);
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.updatePaginatedBanks();
  }

  onSearch(): void {
    const filteredBanks = this.banks.filter((bank) =>
      bank.descricao.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    this.totalItems = filteredBanks.length;
    this.currentPage = 1;
    this.paginatedBanks = filteredBanks.slice(0, this.itemsPerPage);
  }

  navigateToRegister(): void {
    this.router.navigate(['/bank/register']);
  }

  confirmDeletion(): void {
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }

  deleteSelected(): void {
    const ids = this.selectedBanks.map((bank) => bank.id);
    this.bankService.deleteBanks(ids).subscribe({
      next: () => {
        this.banks = this.banks.filter((bank) => !ids.includes(bank.id));
        this.selectedBanks = [];
        this.closeModal();
        this.updatePaginatedBanks();
        this.toastr.success('Bancos excluídos com sucesso!', 'Sucesso');
      },
      error: () => {
        this.toastr.error('Erro ao excluir bancos.', 'Erro');
      }
    });
  }

  selectAll(event: any): void {
    if (event.target.checked) {
      this.selectedBanks = [...this.paginatedBanks];
    } else {
      this.selectedBanks = [];
    }
  }

  toggleSelection(bank: Bank): void {
    const index = this.selectedBanks.indexOf(bank);
    if (index > -1) {
      this.selectedBanks.splice(index, 1);
    } else {
      this.selectedBanks.push(bank);
    }
  }

  isSelected(bank: Bank): boolean {
    return this.selectedBanks.includes(bank);
  }
}
