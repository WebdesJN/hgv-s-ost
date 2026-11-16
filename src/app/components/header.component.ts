import { Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <header class="topbar">
      <div class="wrap topbar-inner">
        <a routerLink="/" class="brand">
          <div class="logo-wrap">
            <img class="brand-mark" src="HGV LOGO.png" alt="HGV Logo" />
          </div>
          <span>
            <strong>Ost Online</strong>
            <small>abgespeckte Aktuelles-Version</small>
          </span>
        </a>
        <nav>
          <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }">Startseite</a>
          <a routerLink="/aktuelles" routerLinkActive="active">Aktuelles</a>
          <a routerLink="/kontakt" routerLinkActive="active">Kontakt</a>
          @if (!isLoggedIn()) {
            <a routerLink="/login" class="btn-login">Login</a>
          } @else {
            <a routerLink="/admin" class="btn-admin">Admin</a>
            <button class="btn-logout" (click)="logout()">Logout</button>
          }
        </nav>
      </div>
    </header>
  `,
  styles: [`
    .topbar { background: #808080; color: #000; position: sticky; top: 0; z-index: 10; }
    .topbar-inner { display: flex; align-items: center; justify-content: space-between; padding: 16px 20px; gap: 20px; flex-wrap: wrap; }
    .brand { position: relative; display: flex; align-items: center; gap: 16px; color: #000; text-decoration: none; }
    .logo-wrap { position: relative; display: inline-block; z-index: 2; }
    .brand > span { position: relative; z-index: 1; }
    .brand-mark { position: relative; z-index: 2; width: 180px; height: 180px; object-fit: contain; display: block; }
    .brand strong { display: block; line-height: 1.1; font-size: 24px; }
    .brand small { opacity: .9; font-size: 14px; }
    nav { display: flex; gap: 8px; flex-wrap: wrap; align-items: center; }
    nav a { color: #000; text-decoration: none; padding: 10px 16px; border-radius: 8px; font-size: 16px; }
    nav a.active, nav a:hover { background: #f0e000; color: #000; }
    .btn-login { background: #1f6f3f; color: white !important; }
    .btn-login:hover { background: #175a32; }
    .btn-admin { background: #1f6f3f; color: white !important; }
    .btn-admin:hover { background: #175a32; }
    .btn-logout { background: #dc3545; color: white !important; border: none; padding: 10px 16px; border-radius: 8px; font-size: 16px; cursor: pointer; }
    .btn-logout:hover { background: #b52b37; }
    .wrap { max-width: 1000px; margin: 0 auto; }
  `]
})
export class HeaderComponent {
  private auth = inject(AuthService);
  isLoggedIn = signal(false);

  constructor() {
    this.checkSession();
    this.auth.onAuthStateChange((user) => {
      this.isLoggedIn.set(!!user);
    });
  }

  async checkSession() {
    const { data } = await this.auth.getCurrentUser();
    this.isLoggedIn.set(!!data?.user);
  }

  async logout() {
    await this.auth.logout();
    this.isLoggedIn.set(false);
    location.href = '/';
  }
}



