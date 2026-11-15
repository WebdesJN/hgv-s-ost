import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="hero">
      <h1>Ost Blog</h1>
      <p>News, Infos und Tipps aus Stuttgart-Ost – ganz simpel nachgebaut.</p>
      <a routerLink="/aktuelles" class="btn">Zu Aktuelles</a>
    </section>
    <section class="grid">
      <div class="card">
        <h3>Verzeichnis</h3>
        <p>
          Alle Einträge, HGV-Mitglieder, Ärzte, Gastronomie & Co.
          (Demo-Platzhalter).
        </p>
      </div>
      <div class="card">
        <h3>Aktuelles</h3>
        <p>
          Nachrichten, Veranstaltungen, Märkte und Aufrufe aus dem Stadtteil.
        </p>
        <a routerLink="/aktuelles">Ansehen →</a>
      </div>
      <div class="card">
        <h3>Zeitung</h3>
        <p>Der HGV Ost, Service, Kontakt und mehr (Demo-Platzhalter).</p>
      </div>
    </section>
  `,
  styles: [
    `
      .hero {
        background: #eef6f0;
        border: 1px solid #cfe4d6;
        border-radius: 14px;
        padding: 28px;
      }
      .hero h1 {
        margin: 0 0 8px;
        color: #1f6f3f;
      }
      .btn {
        display: inline-block;
        margin-top: 12px;
        background: #1f6f3f;
        color: #fff;
        padding: 10px 16px;
        border-radius: 8px;
        text-decoration: none;
      }
      .grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
        gap: 14px;
        margin-top: 16px;
      }
      .card {
        border: 1px solid #e2e2e2;
        border-radius: 12px;
        padding: 16px;
        background: #fff;
      }
      .card a {
        color: #1f6f3f;
        font-weight: 600;
      }
    `,
  ],
})
export class HomeComponent {}
