import { Routes } from '@angular/router';
import { CardPageComponent } from './pages/card-page/card-page.component';
import { TypesPageComponent } from './pages/types-page/types-page.component';
import { MainPageComponent } from './pages/main-page/main-page.component';

export const routes: Routes = [
    { path: '', component: MainPageComponent },
    { path: 'cards', component: CardPageComponent },
    { path: 'types', component: TypesPageComponent },
    { path: '**', redirectTo: '' }
];
