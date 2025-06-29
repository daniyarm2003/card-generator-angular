import { Component } from '@angular/core';
import { DefaultLayoutComponent } from "../../layouts/default-layout/default-layout.component";

@Component({
  selector: 'app-card-page',
  imports: [DefaultLayoutComponent],
  templateUrl: './card-page.component.html',
  styleUrl: './card-page.component.scss'
})
export class CardPageComponent {
  public cardsLoading = false;
}
