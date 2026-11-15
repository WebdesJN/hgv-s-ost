import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NewsService } from '../services/news.service';

@Component({
  selector: 'app-news-detail',
  standalone: true,
  imports: [RouterLink],
  template: `
    @if (item) {
      <a routerLink="/aktuelles" class="back">← Zurück zu Aktuelles</a>
      <span class="badge">{{ item.category }}</span>
      <h1>{{ item.title }}</h1>
      <p class="meta">Details · Kategorie: {{ item.category }} · Veröffentlicht: {{ item.published }} · Zugriffe: {{ item.views }}</p>
      @for (p of item.content; track $index) {
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
  item = this.news.getById(Number(this.route.snapshot.paramMap.get('id')));
}


