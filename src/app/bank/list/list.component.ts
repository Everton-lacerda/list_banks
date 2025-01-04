import { Component } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent {
  banks = [
    { id: 1, name: 'Banco 1' },
    { id: 2, name: 'Banco 2' },
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {}

  viewDetails(id: number): void {
    this.router.navigate(['/bank/details', id]);
  }

}
