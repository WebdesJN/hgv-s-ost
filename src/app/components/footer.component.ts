import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  template: `
    <footer>
      <div class="wrap">
        <p class="links">
          <a routerLink="/">Startseite</a> · <a routerLink="/aktuelles">Aktuelles</a> ·
          <a href="#">Impressum</a> · <a href="#">Datenschutz</a>
        </p>
      </div>
    </footer>
  `,
  styles: [
    `
      footer {
        background: #808080;
        color: #000;
      }
      .wrap {
        max-width: 1000px;
        margin: 0 auto;
        padding: 20px;
        font-size: 14px;
      }
      .links {
        opacity: 0.9;
      }
      .links a {
        color: #f0e000;
        text-decoration: none;
      }
      .links a:hover {
        text-decoration: underline;
      }
    `,
  ],
})
export class FooterComponent {}


