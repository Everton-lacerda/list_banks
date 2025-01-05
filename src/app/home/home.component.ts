import { Component, inject, OnInit } from '@angular/core';
import { BankService } from '../shared/service/bank.service';
import { SharedModule } from '../shared/shared.module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  totalBanks = 0;
  activeBanks = 0;
  inactiveBanks = 0;

  private router = inject(Router);
  private bankService = inject(BankService);

  ngOnInit(): void {
    this.loadMetrics();
  }

  loadMetrics(): void {
    this.bankService.getBanks(0, 1000).subscribe({
      next: (response) => {
        this.totalBanks = response.totalElements;
        this.activeBanks = response.content.filter(
          (b: any) => b.status.id === 'A'
        ).length;
        this.inactiveBanks = this.totalBanks - this.activeBanks;
      },
      error: () => {
        console.error('Erro ao carregar métricas.');
      },
    });
  }

  navigateToList(): void {
    this.router.navigate(['/bank/list']);
  }

  navigateToRegister(): void {
    this.router.navigate(['/bank/register']);
  }
}
