import { Component, Input } from '@angular/core';
import { MainNavbarComponent } from '../../components/main-navbar/main-navbar.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-default-layout',
  imports: [MainNavbarComponent, CommonModule],
  templateUrl: './default-layout.component.html',
  styleUrl: './default-layout.component.scss'
})
export class DefaultLayoutComponent {
  @Input({
    required: true
  })
  public pageTitle!: string;
}
