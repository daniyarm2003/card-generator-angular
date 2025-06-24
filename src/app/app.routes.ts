import { Routes } from '@angular/router';
import { CardPageComponent } from './pages/card-page/card-page.component';
import { TypesPageComponent } from './pages/types-page/types-page.component';

export const routes: Routes = [
    { path: 'cards', component: CardPageComponent },
    { path: 'types', component: TypesPageComponent }
];
