import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NewsService } from '../../../services/news.service';
import { NewsItem } from '../../../models/news.model';

@Component({
  selector: 'app-admin-news-form',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="admin-page">
      <div class="page-header">
        <h1>{{ isEdit ? 'Beitrag bearbeiten' : 'Neuer Beitrag' }}</h1>
        <a (click)="goBack()" class="btn">Zurück zur Liste</a>
      </div>

      <form (ngSubmit)="onSubmit()" #form="ngForm" class="form-card">
        <div class="field full">
          <label>Titel *</label>
          <input type="text" name="titel" [(ngModel)]="newsItem.titel" required />
        </div>

        <div class="field">
          <label>Teaser</label>
          <textarea name="teaser" [(ngModel)]="newsItem.teaser" rows="3"></textarea>
        </div>

        <div class="field full">
          <label>Inhalt (Absätze mit Zeilenumbruch trennen) *</label>
          <textarea name="inhalt" [(ngModel)]="contentText" rows="8" required></textarea>
          <small class="hint">Jede Zeile wird als eigener Absatz gespeichert.</small>
        </div>

        <div class="field">
          <label>Kategorie</label>
          <input type="text" name="kategorie" [(ngModel)]="newsItem.kategorie" placeholder="z. B. Veranstaltung" />
        </div>

        <div class="field">
          <label>Veröffentlichungsdatum</label>
          <input type="date" name="veroeffentlicht_am" [(ngModel)]="newsItem.veroeffentlicht_am" />
        </div>

        <div class="field">
          <label>Bild-URL</label>
          <input type="text" name="bildUrl" placeholder="https://..." [(ngModel)]="newsItem.bild_url" />
        </div>

        <div class="form-actions">
          <button type="submit" [disabled]="loading" class="btn">Speichern</button>
          <button type="button" *ngIf="isEdit" (click)="remove()" class="btn btn-delete">Beitrag löschen</button>
        </div>
        @if (error) {
          <p class="error">{{ error }}</p>
        }
      </form>
    </div>
  `,
  styles: [`
    .admin-page { max-width: 700px; margin: 40px auto; padding: 0 20px; }
    .page-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; flex-wrap: wrap; gap: 12px; }
    .page-header h1 { margin: 0; color: #1f6f3f; }
    .form-card { background: #fff; border: 1px solid #ddd; border-radius: 12px; padding: 24px; }
    .field { display: flex; flex-direction: column; margin-bottom: 16px; }
    .field.full { grid-column: 1 / -1; }
    label { font-weight: 600; margin-bottom: 6px; font-size: 14px; color: #333; }
    input, textarea { padding: 10px; border: 1px solid #ccc; border-radius: 6px; font-size: 14px; width: 100%; box-sizing: border-box; }
    textarea { font-family: inherit; resize: vertical; }
    .hint { font-size: 12px; color: #666; margin-top: 4px; display: block; }
    .form-actions { display: flex; gap: 12px; margin-top: 24px; }
    .btn { padding: 10px 20px; border-radius: 8px; border: none; font-weight: 600; cursor: pointer; font-size: 14px; }
    .btn { background: #1f6f3f; color: white; }
    .btn-delete { background: #dc3545; color: white; }
    .btn:disabled { opacity: 0.6; cursor: not-allowed; }
    .error { color: #d32f2f; background: #ffeaea; padding: 8px; border-radius: 4px; margin-top: 12px; font-size: 14px; }
  `]
})
export class AdminNewsFormComponent {
  newsItem: NewsItem = {
    id: '',
    titel: '',
    kategorie: '',
    veroeffentlicht_am: '',
    views: 0,
    teaser: '',
    inhalt: [],
  };
  contentText = '';
  isEdit = false;
  loading = false;
  error = '';

  private newsService = inject(NewsService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  constructor() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.loadNews(id);
    }
  }

  async loadNews(id: string) {
    try {
      const item = await this.newsService.getById(id);
      if (item) {
        this.newsItem = item;
        this.contentText = (item.inhalt ?? []).join('\n');
      }
    } catch (err) {
      this.error = 'Beitrag konnte nicht geladen werden';
    }
  }

  async onSubmit() {
    this.error = '';
    this.loading = true;
    try {
      const payload: Omit<NewsItem, 'id' | 'created_at' | 'updated_at'> = {
        titel: this.newsItem.titel,
        teaser: this.newsItem.teaser ?? '',
        inhalt: this.contentText.split('\n').filter((line) => line.trim().length > 0),
        kategorie: this.newsItem.kategorie ?? '',
        veroeffentlicht_am: this.newsItem.veroeffentlicht_am,
        bild_url: this.newsItem.bild_url,
        views: this.newsItem.views ?? 0,
      };

      if (this.isEdit && this.newsItem.id) {
        await this.newsService.update(this.newsItem.id, payload as Partial<NewsItem>);
      } else {
        await this.newsService.create(payload);
      }
      this.router.navigate(['../'], { relativeTo: this.route });
    } catch (err: any) {
      this.error = err.message || 'Speichern fehlgeschlagen';
    } finally {
      this.loading = false;
    }
  }

  async remove() {
    if (!this.newsItem.id) return;
    if (!confirm(`Beitrag "${this.newsItem.titel}" wirklich löschen?`)) return;
    try {
      await this.newsService.remove(this.newsItem.id);
      this.router.navigate(['../'], { relativeTo: this.route });
    } catch (err: any) {
      this.error = err.message || 'Löschen fehlgeschlagen';
    }
  }

  goBack() {
    this.router.navigate(['/admin/news']);
  }
}