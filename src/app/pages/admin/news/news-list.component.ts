import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NewsService } from '../../../services/news.service';
import { NewsItem } from '../../../models/news.model';

@Component({
  selector: 'app-admin-news-list',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="admin-page">
      <div class="page-header">
        <h1>News-Beiträge</h1>
        <a routerLink="new" class="btn">+ Neuer Beitrag</a>
      </div>

      @if (loading) {
        <p>Lade …</p>
      } @else if (news.length === 0) {
        <p>Noch keine Beiträge vorhanden.</p>
      } @else {
        <table>
          <thead>
            <tr>
              <th>Titel</th>
              <th>Kategorie</th>
              <th>Veröffentlicht</th>
              <th class="actions">Aktionen</th>
            </tr>
          </thead>
          <tbody>
            @for (n of news; track n.id) {
              <tr>
                <td>
                  @if (n.bild_url) {
                    <img [src]="n.bild_url" [alt]="n.titel" class="admin-thumb" />
                  }
                  {{ n.titel }}
                </td>
                <td>{{ n.kategorie || '-' }}</td>
                <td>{{ n.veroeffentlicht_am || '-' }}</td>
                <td class="actions">
                  <a [routerLink]="[n.id, 'edit']" class="btn-small">Bearbeiten</a>
                  <button class="btn-small btn-delete" (click)="delete(n.id!, n.titel)">Löschen</button>
                </td>
              </tr>
            }
          </tbody>
        </table>
      }
    </div>
  `,
  styles: [`
    .admin-page { max-width: 1000px; margin: 40px auto; padding: 0 20px; }
    .page-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; flex-wrap: wrap; gap: 12px; }
    .page-header h1 { margin: 0; color: #1f6f3f; }
    table { width: 100%; border-collapse: collapse; background: #fff; border: 1px solid #ddd; border-radius: 8px; overflow: hidden; }
    th, td { padding: 12px 14px; text-align: left; border-bottom: 1px solid #eee; }
    th { background: #f4f9f4; font-weight: 600; color: #333; }
    tr:last-child td { border-bottom: none; }
    .actions { white-space: nowrap; }
    .admin-thumb { width: 50px; height: 50px; object-fit: cover; border-radius: 6px; margin-right: 8px; vertical-align: middle; border: 1px solid #ddd; }
    .btn { padding: 8px 16px; background: #1f6f3f; color: white; border: none; border-radius: 6px; font-weight: 600; cursor: pointer; text-decoration: none; font-size: 14px; }
    .btn-small { padding: 6px 12px; font-size: 13px; margin-right: 6px; }
    .btn-small.btn-delete { background: #dc3545; color: white; }
    .btn-small:hover { filter: brightness(0.9); }
  `]
})
export class AdminNewsListComponent {
  news: NewsItem[] = [];
  loading = true;

  constructor(private newsService: NewsService) {
    this.load();
  }

  async load() {
    try {
      this.loading = true;
      this.news = await this.newsService.getAll();
    } catch (err) {
      console.error('Fehler beim Laden der News:', err);
    } finally {
      this.loading = false;
    }
  }

  async delete(id: string, title: string) {
    if (!confirm(`Beitrag "${title}" wirklich löschen?`)) return;
    try {
      await this.newsService.remove(id);
      this.news = this.news.filter((n) => n.id !== id);
    } catch (err) {
      alert('Fehler beim Löschen: ' + err);
    }
  }
}