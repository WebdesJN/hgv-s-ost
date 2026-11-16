import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home.component';
import { NewsListComponent } from './pages/news-list.component';
import { NewsDetailComponent } from './pages/news-detail.component';
import { KontaktComponent } from './pages/kontakt.component';
import { LoginComponent } from './components/login.component';
import { authGuard } from './guards/auth.guard';
import { AdminDashboardComponent } from './pages/admin/admin-dashboard.component';
import { AdminMemberListComponent } from './pages/admin/members/member-list.component';
import { AdminMemberFormComponent } from './pages/admin/members/member-form.component';
import { AdminNewsListComponent } from './pages/admin/news/news-list.component';
import { AdminNewsFormComponent } from './pages/admin/news/news-form.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'aktuelles', component: NewsListComponent },
  { path: 'aktuelles/:id', component: NewsDetailComponent },
  { path: 'kontakt', component: KontaktComponent },
  { path: 'login', component: LoginComponent },

  // Admin-Bereich (geschützt)
  {
    path: 'admin',
    component: AdminDashboardComponent,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'members', pathMatch: 'full' },
      { path: 'members', component: AdminMemberListComponent },
      { path: 'members/new', component: AdminMemberFormComponent },
      { path: 'members/:id/edit', component: AdminMemberFormComponent },
      { path: 'news', component: AdminNewsListComponent },
      { path: 'news/new', component: AdminNewsFormComponent },
      { path: 'news/:id/edit', component: AdminNewsFormComponent },
    ],
  },

  { path: '**', redirectTo: '' },
];
