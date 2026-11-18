import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  template: `
    <footer class="site-footer">
      <div class="wrap footer-inner">
        <div class="footer-brand">
          <strong>HGV Stuttgart Ost</strong>
          <p class="footer-sub">Handels- und Gewerbeverein Stuttgart Ost e.V.</p>
        </div>
        <nav class="footer-nav">
          <a routerLink="/">Startseite</a>
          <a routerLink="/aktuelles">Aktuelles</a>
          <a href="#">Impressum</a>
          <a href="#">Datenschutz</a>
        </nav>
        <p class="footer-copy">
          &copy; {{
            currentYear
          }} HGV Stuttgart Ost e.V. &bull; Alle Rechte vorbehalten.
        </p>
      </div>
    </footer>
  `,
  styles: [
    `
      .site-footer {
        background: var(--color-surface);
        color: var(--color-text);
        border-top: 1px solid var(--color-border);
        margin-top: auto;
      }
      .footer-inner {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
        padding: var(--space-lg) 0;
        text-align: center;
      }
      .footer-brand strong {
        font-size: 1.1rem;
        font-weight: 700;
        color: var(--color-primary);
      }
      .footer-sub {
        margin: 0;
        font-size: 0.85rem;
        color: var(--color-text-muted);
      }
      .footer-nav {
        display: flex;
        gap: 1.5rem;
        flex-wrap: wrap;
        justify-content: center;
      }
      .footer-nav a {
        color: var(--color-secondary);
        font-size: 0.9rem;
        font-weight: 500;
      }
      .footer-nav a:hover {
        color: var(--color-primary);
        text-decoration: underline;
      }
      .footer-copy {
        margin: 0;
        font-size: 0.8rem;
        color: var(--color-text-light);
      }
    `,
  ],
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
}
