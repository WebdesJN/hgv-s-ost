import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NewsService } from '../services/news.service';
import { NewsItem } from '../models/news.model';

@Component({
  selector: 'app-news-list',
  standalone: true,
  imports: [FormsModule, RouterLink],
  template: `
    <section class="news-list-section">
      <div class="section-header">
        <h1>Aktuelles</h1>
        <p class="sub">Nachrichten und Infos aus dem Stadtteil Stuttgart-Ost</p>
      </div>

      @if (loading()) {
        <div class="loading-state">Lade …</div>
      } @else {
        <div class="toolbar">
          <input [(ngModel)]="search" placeholder="Suchen …" aria-label="Suchen" />
          <select [(ngModel)]="category" aria-label="Kategorie">
            <option value="">Alle Kategorien</option>
            @for (c of categories(); track c) {
              <option [value]="c">{{ c }}</option>
            }
          </select>
        </div>

        <div class="list">
          @for (n of filtered(); track n.id) {
            <article class="item">
              @if (n.bild_url) {
                <img [src]="n.bild_url" [alt]="n.titel" class="item-image" />
              }
              <div class="meta">
                <span class="badge bg-primary">{{ n.kategorie }}</span>
                <span>Veröffentlicht: {{ n.veroeffentlicht_am }}</span>
                <span>Zugriffe: {{ n.views }}</span>
              </div>
              <h2><a [routerLink]="['/aktuelles', n.id]">{{ n.titel }}</a></h2>
              <p>{{ n.teaser }}</p>
              <a [routerLink]="['/aktuelles', n.id]" class="details">Details →</a>
            </article>
          } @empty {
            <div class="empty-state">
              <p>Keine Einträge gefunden.</p>
            </div>
          }
        </div>
      }
    </section>
  `,
  styles: [`
    .news-list-section {
      max-width: 800px;
      margin: 0 auto;
    }
    .section-header {
      margin-bottom: var(--space-lg);
    }
    h1 {
      margin: 0 0 var(--space-xs);
      color: var(--color-primary);
      font-size: 2rem;
    }
    .sub {
      margin: 0;
      color: var(--color-text-muted);
      font-size: 1rem;
    }
    .toolbar {
      display: flex;
      gap: var(--space-sm);
      margin: var(--space-md) 0;
      flex-wrap: wrap;
    }
    input, select {
      padding: 0.75rem 1rem;
      border: 1px solid var(--color-border);
      border-radius: var(--radius-md);
      font-size: 0.95rem;
      background: var(--color-surface);
      color: var(--color-text);
    }
    input { flex: 1; min-width: 220px; }
    input:focus, select:focus {
      outline: none;
      border-color: var(--color-primary);
      box-shadow: 0 0 0 3px var(--color-primary-light);
    }
    .list { display: grid; gap: var(--space-md); }
    .item {
      background: var(--color-surface);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-lg);
      padding: var(--space-lg);
      transition: var(--transition);
    }
    .item:hover {
      box-shadow: var(--shadow-md);
      border-color: var(--color-border-hover);
    }
    .item-image {
      width: 100%;
      height: 200px;
      object-fit: cover;
      border-radius: var(--radius-md);
      margin-bottom: var(--space-sm);
      display: block;
    }
    .item h2 { margin: 0 0 var(--space-xs); font-size: 1.25rem; }
    .item h2 a { color: var(--color-text); font-weight: 600; }
    .item h2 a:hover { color: var(--color-primary); text-decoration: underline; }
    .meta { display: flex; gap: var(--space-sm); flex-wrap: wrap; font-size: 0.85rem; color: var(--color-text-muted); align-items: center; margin-bottom: var(--space-sm); }
    .badge { margin-bottom: 0; }
    .details {
      color: var(--color-primary);
      font-weight: 600;
      font-size: 0.875rem;
      display: inline-block;
      margin-top: var(--space-xs);
    }
    .details:hover { text-decoration: underline; }
    .empty-state {
      padding: var(--space-lg);
      color: var(--color-text-muted);
      text-align: center;
      background: var(--color-surface);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-lg);
    }
    .loading-state {
      padding: var(--space-lg);
      color: var(--color-text-muted);
      text-align: center;
    }
  `]
})
export class NewsListComponent {
  search = signal('');
  category = signal('');
  categories = signal<string[]>([]);
  newsItems = signal<NewsItem[]>([]);
  loading = signal(true);

  filtered = computed(() => {
    const q = this.search().toLowerCase().trim();
    const cat = this.category();
    return this.newsItems()
      .filter((n) => (!cat || n.kategorie === cat) && (!q || (n.titel + n.teaser).toLowerCase().includes(q)));
  });

  constructor(private news: NewsService) {
    this.load();
  }

  async load() {
    try {
      this.loading.set(true);
      const [items, cats] = await Promise.all([this.news.getAll(), this.news.getCategories()]);
      this.newsItems.set(items);
      this.categories.set(cats);
    } catch (err) {
      console.error('Fehler beim Laden der News:', err);
    } finally {
      this.loading.set(false);
    }
  }
}



