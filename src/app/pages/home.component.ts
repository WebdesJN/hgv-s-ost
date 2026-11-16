import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NewsService } from '../services/news.service';
import { NewsItem } from '../models/news.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="hero">
      <h1>Ost Blog</h1>
      <p>News, Infos und Tipps aus Stuttgart-Ost</p>
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

    @if (loadingNews()) {
      <section class="news-preview">
        <h2>Neueste Beiträge</h2>
        <p>Lade …</p>
      </section>
    } @else if (latestNews().length > 0) {
      <section class="news-preview">
        <h2>Neueste Beiträge</h2>
        <div class="news-list">
          @for (n of latestNews(); track n.id) {
            <article class="news-card">
              <span class="badge">{{ n.kategorie }}</span>
              <h3><a [routerLink]="['/aktuelles', n.id]">{{ n.titel }}</a></h3>
              <p class="date">{{ n.veroeffentlicht_am }}</p>
              <p class="teaser">{{ n.teaser }}</p>
              <a [routerLink]="['/aktuelles', n.id]" class="read-more">Weiterlesen →</a>
            </article>
          }
        </div>
        <a routerLink="/aktuelles" class="view-all">Alle Beiträge ansehen →</a>
      </section>
    } @else {
      <section class="news-preview">
        <h2>Neueste Beiträge</h2>
        <p>Noch keine Beiträge vorhanden.</p>
      </section>
    }
  `,
  styles: [`
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
    .news-preview {
      margin-top: 32px;
    }
    .news-preview h2 {
      color: #1f6f3f;
      margin-bottom: 16px;
    }
    .news-list {
      display: grid;
      gap: 14px;
    }
    .news-card {
      border: 1px solid #e2e2e2;
      border-radius: 12px;
      padding: 16px;
      background: #fff;
    }
    .news-card .badge {
      display: inline-block;
      background: #1f6f3f;
      color: #fff;
      padding: 2px 10px;
      border-radius: 12px;
      font-size: 12px;
      margin-bottom: 8px;
    }
    .news-card h3 {
      margin: 0 0 6px;
      font-size: 18px;
    }
    .news-card h3 a {
      color: #1a1a1a;
      text-decoration: none;
    }
    .news-card h3 a:hover {
      color: #1f6f3f;
      text-decoration: underline;
    }
    .news-card .date {
      font-size: 13px;
      color: #666;
      margin: 0 0 8px;
    }
    .news-card .teaser {
      font-size: 14px;
      color: #333;
      margin: 0 0 12px;
      line-height: 1.5;
    }
    .news-card .read-more {
      color: #1f6f3f;
      font-weight: 600;
      text-decoration: none;
      font-size: 14px;
    }
    .news-card .read-more:hover {
      text-decoration: underline;
    }
    .view-all {
      display: inline-block;
      margin-top: 16px;
      color: #1f6f3f;
      font-weight: 600;
      text-decoration: none;
    }
    .view-all:hover {
      text-decoration: underline;
    }
  `],
})
export class HomeComponent {
  latestNews = signal<NewsItem[]>([]);
  loadingNews = signal(true);

  private news = inject(NewsService);

  constructor() {
    this.loadNews();
  }

  async loadNews() {
    try {
      this.loadingNews.set(true);
      const allNews = await this.news.getAll();
      this.latestNews.set(allNews.slice(0, 3));
    } catch (err) {
      console.error('Fehler beim Laden der neuesten Beiträge:', err);
    } finally {
      this.loadingNews.set(false);
    }
  }
}
