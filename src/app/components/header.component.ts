import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

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
        </nav>
      </div>
    </header>
  `,
  styles: [`
    .topbar { background: #101010; color: #fff; position: sticky; top: 0; z-index: 10; }
    .topbar-inner { display: flex; align-items: center; justify-content: space-between; padding: 16px 20px; gap: 20px; flex-wrap: wrap; }
    .brand { position: relative; display: flex; align-items: center; gap: 16px; color: #000; text-decoration: none; }
    .logo-wrap { position: relative; display: inline-block; z-index: 2; }
    .brand > span { position: relative; z-index: 1; }
    .brand-mark { position: relative; z-index: 2; width: 180px; height: 180px; object-fit: contain; display: block; }
    .brand strong { display: block; line-height: 1.1; font-size: 24px; }
    .brand small { opacity: .9; font-size: 14px; }
    nav { display: flex; gap: 8px; flex-wrap: wrap; }
    nav a { color: #fff; text-decoration: none; padding: 10px 16px; border-radius: 8px; font-size: 16px; }
    nav a.active, nav a:hover { background: #f0e000; color: #101010; }
    .wrap { max-width: 1000px; margin: 0 auto; }
  `]
})
export class HeaderComponent {}



