import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NewsService } from '../services/news.service';
import { NewsItem } from '../models/news.model';

@Component({
  selector: 'app-news-detail',
  standalone: true,
  imports: [RouterLink],
  template: `
    @if (loading()) {
      <p>Lade …</p>
    } @else if (item()) {
      <a routerLink="/aktuelles" class="back">← Zurück zu Aktuelles</a>
      <span class="badge">{{ item()?.kategorie }}</span>
      <h1>{{ item()?.titel }}</h1>
      <p class="meta">Details · Kategorie: {{ item()?.kategorie }} · Veröffentlicht: {{ item()?.veroeffentlicht_am }} · Zugriffe: {{ item()?.views }}</p>
      @for (p of item()?.inhalt; track $index) {
        <p>{{ p }}</p>
      }
    } @else {
      <h1>Nicht gefunden</h1>
      <p>Diesen Beitrag gibt es nicht.</p>
      <a routerLink="/aktuelles">Zurück</a>
    }
  `,
  styles: [`
    .back { color: #1f6f3f; text-decoration: none; font-size: 14px; display: inline-block; margin-bottom: 10px; }
    .badge { background: #1f6f3f; color: #fff; border-radius: 20px; padding: 2px 10px; font-size: 12px; }
    h1 { margin: 8px 0; }
    .meta { color: #666; font-size: 13px; border-bottom: 1px solid #eee; padding-bottom: 12px; }
    p { line-height: 1.6; }
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


