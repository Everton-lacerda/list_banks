import { Component } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  bankId: number | null = null;
  bank: { id: number | null, name: string } = { id: null, name: '' };

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.bankId = +params.get('id')!;
      if (this.bankId) {
        this.loadBankDetails(this.bankId);
      }
    });
  }

  loadBankDetails(id: number): void {
    this.bank = { id, name: `Banco ${id}` };
  }

  saveBank(): void {
    if (this.bankId) {
      console.log('update bank:', this.bank);
    } else {
      console.log('Criated new bank:', this.bank);
    }
  }
}
