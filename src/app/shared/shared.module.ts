import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FooterComponent } from './components/footer/footer.component';
import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { ModalComponent } from './components/modal/modal.component';
import { LoadingComponent } from './components/loading/loading.component';

@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    BreadcrumbsComponent,
    PaginationComponent,
    ModalComponent,
    LoadingComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  exports: [
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    BreadcrumbsComponent,
    PaginationComponent,
    ModalComponent,
    LoadingComponent,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
  ]
})
export class SharedModule { }
