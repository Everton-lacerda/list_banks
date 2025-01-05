import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BankService } from '../../shared/service/bank.service';
import { Bank } from '../../shared/models/bank.model';
import { SharedModule } from '../../shared/shared.module';
import { debounceTime, distinctUntilChanged, Subject, switchMap } from 'rxjs';

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
  currentPage: number = 0;
  searchTerm = '';
  statusFilter = '';
  showModal = false;
  isLoading = false;

  sortColumn = 'id';
  sortDirection: 'asc' | 'desc' = 'asc';

  filterSubject = new Subject<void>();

  private router = inject(Router);
  private bankService = inject(BankService);
  private toastr = inject(ToastrService);

  constructor() {
    this.filterSubject.pipe(debounceTime(300)).subscribe({
      next: (_) => {
        this.loadBanks();
      },
    });
  }

  ngOnInit(): void {
    this.loadBanks();
  }

  loadBanks(): void {
    this.isLoading = true;
    this.bankService
      .getBanks(
        this.currentPage,
        this.itemsPerPage,
        this.sortColumn,
        this.sortDirection,
        this.searchTerm,
        this.statusFilter
      )
      .subscribe({
        next: (response: any) => {
          this.banks = response.content;
          this.totalItems = response.totalElements;
          this.isLoading = false;
        },
        error: (error: any) => {
          this.toastr.error('Erro ao carregar bancos', 'Erro');
          console.log('error', error);
          this.isLoading = false;
        },
      });
  }

  applyFilters(): void {
    this.currentPage = 0;
    this.filterSubject.next();
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadBanks();
  }

  onSearch(): void {
    this.loadBanks();
  }

  onStatusChange(status: string): void {
    this.currentPage = 0;
    this.statusFilter = status;
    this.filterSubject.next();
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
    const ids = this.selectedBanks
      .map((bank) => bank.id)
      .filter((id): id is number => id !== undefined);
    this.bankService.deleteBanks(ids).subscribe({
      next: () => {
        this.banks = this.banks.filter(
          (bank) => bank.id !== undefined && !ids.includes(bank.id)
        );
        this.selectedBanks = [];
        this.closeModal();
        this.currentPage = 0;
        this.filterSubject.next();
        this.toastr.success('Bancos excluídos com sucesso!', 'Sucesso');
      },
      error: () => {
        this.toastr.error('Erro ao excluir bancos.', 'Erro');
      },
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

  sortData(column: string): void {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }
    this.loadBanks();
  }

  getSortIcon(column: string): string {
    if (this.sortColumn === column) {
      return this.sortDirection === 'asc'
        ? 'bi bi-arrow-up'
        : 'bi bi-arrow-down';
    }
    return '';
  }
}
