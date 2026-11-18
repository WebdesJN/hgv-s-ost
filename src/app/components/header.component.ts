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
            <strong>HGV Stuttgart Ost</strong>
            <small>Aktuelles & Nachbarschaft</small>
          </span>
        </a>
        <nav>
          <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }">Startseite</a>
          <a routerLink="/aktuelles" routerLinkActive="active">Aktuelles</a>
          <a routerLink="/kontakt" routerLinkActive="active">Kontakt</a>
          @if (!isLoggedIn()) {
            <a routerLink="/login" class="btn btn-primary">Login</a>
          } @else {
            <a routerLink="/admin" class="btn btn-primary">Admin</a>
            <button class="btn btn-ghost" (click)="logout()">Logout</button>
          }
        </nav>
      </div>
    </header>
  `,
  styles: [`
    .topbar {
      background: var(--color-surface);
      color: var(--color-text);
      position: sticky;
      top: 0;
      z-index: 50;
      border-bottom: 1px solid var(--color-border);
      box-shadow: var(--shadow-sm);
    }
    .topbar-inner {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0.75rem 0;
      gap: 1rem;
      flex-wrap: wrap;
    }
    .brand {
      display: flex;
      align-items: center;
      gap: 1rem;
      color: var(--color-text);
      text-decoration: none;
      min-width: 200px;
    }
    .logo-wrap {
      display: inline-block;
    }
    .brand-mark {
      width: 48px;
      height: 48px;
      object-fit: contain;
      display: block;
    }
    .brand strong {
      display: block;
      line-height: 1.1;
      font-size: 1.1rem;
      font-weight: 700;
      letter-spacing: -0.01em;
    }
    .brand small {
      color: var(--color-text-muted);
      font-size: 0.75rem;
      opacity: 0.9;
    }
    nav {
      display: flex;
      gap: 0.5rem;
      flex-wrap: wrap;
      align-items: center;
      margin-left: auto;
    }
    nav a.router-link-active,
    nav a.router-link-active:hover,
    nav a:hover {
      background: var(--color-surface-hover);
      color: var(--color-primary);
    }
    .btn {
      padding: 0.5rem 1rem;
      font-size: 0.875rem;
    }
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



