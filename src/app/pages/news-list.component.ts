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
    <h1>Aktuelles</h1>
    <p class="sub">Nachrichten und Infos aus dem Stadtteil Stuttgart-Ost</p>

    @if (loading()) {
      <p>Lade …</p>
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
              <span class="badge">{{ n.kategorie }}</span>
              <span>Veröffentlicht: {{ n.veroeffentlicht_am }}</span>
              <span>Zugriffe: {{ n.views }}</span>
            </div>
            <h2><a [routerLink]="['/aktuelles', n.id]">{{ n.titel }}</a></h2>
            <p>{{ n.teaser }}</p>
            <a [routerLink]="['/aktuelles', n.id]" class="details">Details →</a>
          </article>
        } @empty {
          <p>Keine Einträge gefunden.</p>
        }
      </div>

      <p class="hint">Start · Zurück · 1 · Weiter · Ende</p>
    }
  `,
  styles: [`
    h1 { color: #1f6f3f; margin-bottom: 0; }
    .sub { color: #555; margin-top: 4px; }
    .toolbar { display: flex; gap: 10px; margin: 16px 0; flex-wrap: wrap; }
    input, select { padding: 10px 12px; border: 1px solid #ccc; border-radius: 8px; font-size: 14px; }
    input { flex: 1; min-width: 200px; }
    .list { display: grid; gap: 14px; }
    .item { border: 1px solid #e3e3e3; border-radius: 12px; padding: 16px; background: #fff; }
    .item-image { width: 100%; height: 180px; object-fit: cover; border-radius: 8px; margin-bottom: 12px; display: block; }
    .item h2 { margin: 8px 0; font-size: 20px; }
    .item h2 a { color: #1a1a1a; text-decoration: none; }
    .item h2 a:hover { color: #1f6f3f; text-decoration: underline; }
    .meta { display: flex; gap: 12px; flex-wrap: wrap; font-size: 13px; color: #666; align-items: center; }
    .badge { background: #1f6f3f; color: #fff; border-radius: 20px; padding: 2px 10px; font-size: 12px; }
    .details { color: #1f6f3f; font-weight: 600; text-decoration: none; font-size: 14px; }
    .hint { color: #888; font-size: 13px; margin-top: 16px; }
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



