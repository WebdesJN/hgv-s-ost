import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NewsService } from '../services/news.service';
import { NewsItem } from '../models/news.model';

@Component({
  selector: 'app-news-detail',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="news-detail-section">
      @if (loading()) {
        <div class="loading-state">Lade …</div>
      } @else if (item()) {
        <a routerLink="/aktuelles" class="btn btn-sm btn-ghost">← Zurück zu Aktuelles</a>
        <span class="badge bg-primary">{{ item()?.kategorie }}</span>
        <h1>{{ item()?.titel }}</h1>
        @if (item()?.bild_url) {
          <img [src]="item()?.bild_url" [alt]="item()?.titel" class="detail-image" />
        }
        <p class="meta">
          <span>Kategorie: {{ item()?.kategorie }}</span>
          <span>· Veröffentlicht: {{ item()?.veroeffentlicht_am }}</span>
          <span>· Zugriffe: {{ item()?.views }}</span>
        </p>
        @for (p of item()?.inhalt; track $index) {
          <p>{{ p }}</p>
        }
      } @else {
        <div class="empty-state">
          <h1>Nicht gefunden</h1>
          <p>Diesen Beitrag gibt es nicht.</p>
          <a routerLink="/aktuelles" class="btn btn-primary">Zurück zu Aktuelles</a>
        </div>
      }
    </section>
  `,
  styles: [`
    .news-detail-section {
      max-width: 800px;
      margin: 0 auto;
    }
    .loading-state {
      padding: var(--space-lg);
      color: var(--color-text-muted);
      text-align: center;
    }
    .back {
      color: var(--color-primary);
      text-decoration: none;
      font-size: 0.875rem;
      display: inline-block;
      margin-bottom: var(--space-sm);
    }
    .badge { margin-bottom: var(--space-sm); }
    h1 {
      margin: 0 0 var(--space-md);
      font-size: 1.75rem;
      color: var(--color-text);
    }
    .detail-image {
      width: 100%;
      max-height: 400px;
      object-fit: cover;
      border-radius: var(--radius-lg);
      margin: var(--space-md) 0;
      display: block;
    }
    .meta {
      color: var(--color-text-muted);
      font-size: 0.85rem;
      border-bottom: 1px solid var(--color-border);
      padding-bottom: var(--space-md);
      margin-bottom: var(--space-lg);
      display: flex;
      gap: var(--space-xs);
      flex-wrap: wrap;
      align-items: center;
    }
    p {
      line-height: 1.7;
      color: var(--color-text);
      margin-bottom: var(--space-md);
    }
    .empty-state {
      padding: var(--space-2xl);
      color: var(--color-text-muted);
      text-align: center;
      background: var(--color-surface);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-lg);
    }
    .empty-state h1 {
      color: var(--color-text);
      margin-bottom: var(--space-md);
    }
  `]
})
export class NewsDetailComponent {
  private route = inject(ActivatedRoute);
  private news = inject(NewsService);
  item = signal<NewsItem | null>(null);
  loading = signal(true);

  constructor() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.news.getById(id).then((found) => {
        this.item.set(found);
        this.loading.set(false);
        this.news.incrementViews(id).then(() => {
          const current = this.item();
          if (current) {
            this.item.set({ ...current, views: (current.views ?? 0) + 1 });
          }
        }).catch((err) => {
          console.error('Fehler beim Erhöhen des Zugriffszählers:', err);
        });
      }).catch(() => {
        this.item.set(null);
        this.loading.set(false);
      });
    } else {
      this.item.set(null);
      this.loading.set(false);
    }
  }
}


