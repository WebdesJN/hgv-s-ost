import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home.component';
import { NewsListComponent } from './pages/news-list.component';
import { NewsDetailComponent } from './pages/news-detail.component';
import { KontaktComponent } from './pages/kontakt.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'aktuelles', component: NewsListComponent },
  { path: 'aktuelles/:id', component: NewsDetailComponent },
  { path: 'kontakt', component: KontaktComponent },
  { path: '**', redirectTo: '' },
];
