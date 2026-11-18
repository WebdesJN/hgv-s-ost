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
      <div class="hero-content">
        <h1>Willkommen bei HGV Stuttgart Ost</h1>
        <p class="hero-sub">News, Infos und Tipps aus dem Stadtteil Stuttgart-Ost</p>
        <a routerLink="/aktuelles" class="btn btn-primary">Zu Aktuelles</a>
      </div>
    </section>

    <section class="feature-grid">
      <div class="feature-card">
        <div class="feature-icon">📰</div>
        <h3>Aktuelles</h3>
        <p>Nachrichten, Veranstaltungen, Märkte und Aufrufe aus dem Stadtteil.</p>
        <a routerLink="/aktuelles" class="feature-link">Mehr erfahren →</a>
      </div>
      <div class="feature-card">
        <div class="feature-icon">🏪</div>
        <h3>Mitglieder-Verzeichnis</h3>
        <p>Alle HGV-Mitglieder, Ärzte, Gastronomie & Co. (Demo-Platzhalter).</p>
        <a routerLink="/aktuelles" class="feature-link">Zum Verzeichnis →</a>
      </div>
      <div class="feature-card">
        <div class="feature-icon">📄</div>
        <h3>Zeitung & Service</h3>
        <p>Der HGV Ost, Service, Kontakt und mehr (Demo-Platzhalter).</p>
        <a routerLink="/kontakt" class="feature-link">Kontakt aufnehmen →</a>
      </div>
    </section>

    @if (loadingNews()) {
      <section class="news-preview">
        <div class="section-header">
          <h2>Neueste Beiträge</h2>
        </div>
        <div class="news-skeleton">Lade …</div>
      </section>
    } @else if (latestNews().length > 0) {
      <section class="news-preview">
        <div class="section-header">
          <h2>Neueste Beiträge</h2>
          <a routerLink="/aktuelles" class="btn btn-sm btn-ghost">Alle Beiträge</a>
        </div>
        <div class="news-list">
          @for (n of latestNews(); track n.id) {
            <article class="news-card">
              <span class="badge bg-primary">{{ n.kategorie }}</span>
              <h3><a [routerLink]="['/aktuelles', n.id]">{{ n.titel }}</a></h3>
              <p class="date">{{ n.veroeffentlicht_am }}</p>
              <p class="teaser">{{ n.teaser }}</p>
              <a [routerLink]="['/aktuelles', n.id]" class="read-more">Weiterlesen →</a>
            </article>
          }
        </div>
      </section>
    } @else {
      <section class="news-preview">
        <div class="section-header">
          <h2>Neueste Beiträge</h2>
        </div>
        <div class="empty-state">
          <p>Noch keine Beiträge vorhanden.</p>
        </div>
      </section>
    }
  `,
  styles: [`
    .hero {
      background: linear-gradient(135deg, var(--color-primary) 0%, #115e59 100%);
      color: var(--color-inverse);
      border-radius: var(--radius-lg);
      padding: var(--space-2xl) var(--space-lg);
      margin-bottom: var(--space-xl);
      text-align: center;
    }
    .hero h1 {
      margin: 0 0 var(--space-sm);
      font-size: 2rem;
      font-weight: 700;
      color: var(--color-inverse);
    }
    .hero-sub {
      margin: 0 0 var(--space-lg);
      font-size: 1.1rem;
      color: var(--color-primary-light);
      opacity: 0.95;
    }
    .feature-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: var(--space-md);
      margin-bottom: var(--space-xl);
    }
    .feature-card {
      background: var(--color-surface);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-lg);
      padding: var(--space-lg);
      transition: var(--transition);
      display: flex;
      flex-direction: column;
      gap: var(--space-sm);
    }
    .feature-card:hover {
      box-shadow: var(--shadow-md);
      border-color: var(--color-border-hover);
      transform: translateY(-2px);
    }
    .feature-icon {
      font-size: 2rem;
      margin-bottom: var(--space-xs);
    }
    .feature-card h3 {
      margin: 0 0 var(--space-sm);
      font-size: 1.1rem;
      color: var(--color-text);
    }
    .feature-card p {
      margin: 0 0 var(--space-md);
      color: var(--color-text-muted);
      font-size: 0.9rem;
      line-height: 1.5;
    }
    .feature-link {
      color: var(--color-primary);
      font-weight: 600;
      font-size: 0.875rem;
      align-self: flex-start;
    }
    .feature-link:hover {
      text-decoration: underline;
    }
    .section-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: var(--space-md);
      flex-wrap: wrap;
      gap: var(--space-sm);
    }
    .section-header h2 {
      margin: 0;
      font-size: 1.25rem;
      color: var(--color-text);
    }
    .news-preview {
      margin-top: var(--space-xl);
    }
    .news-skeleton {
      padding: var(--space-lg);
      color: var(--color-text-muted);
      font-size: 0.9rem;
    }
    .news-list {
      display: grid;
      gap: var(--space-md);
    }
    .news-card {
      background: var(--color-surface);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-lg);
      padding: var(--space-lg);
      transition: var(--transition);
    }
    .news-card:hover {
      box-shadow: var(--shadow-md);
      border-color: var(--color-border-hover);
    }
    .news-card .badge {
      margin-bottom: var(--space-sm);
    }
    .news-card h3 {
      margin: 0 0 var(--space-xs);
      font-size: 1.1rem;
    }
    .news-card h3 a {
      color: var(--color-text);
      font-weight: 600;
    }
    .news-card h3 a:hover {
      color: var(--color-primary);
    }
    .news-card .date {
      font-size: 0.85rem;
      color: var(--color-text-muted);
      margin: 0 0 var(--space-sm);
    }
    .news-card .teaser {
      font-size: 0.9rem;
      color: var(--color-text-muted);
      margin: 0 0 var(--space-md);
      line-height: 1.5;
    }
    .news-card .read-more {
      color: var(--color-primary);
      font-weight: 600;
      font-size: 0.875rem;
    }
    .news-card .read-more:hover {
      text-decoration: underline;
    }
    .empty-state {
      padding: var(--space-lg);
      color: var(--color-text-muted);
      text-align: center;
    }
    .btn-sm {
      padding: 0.4rem 0.8rem;
      font-size: 0.85rem;
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
