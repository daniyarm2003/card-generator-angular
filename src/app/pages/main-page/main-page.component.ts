import { Component } from '@angular/core';
import { DefaultLayoutComponent } from '../../layouts/default-layout/default-layout.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-main-page',
  imports: [DefaultLayoutComponent, CommonModule],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss'
})
export class MainPageComponent {

}
