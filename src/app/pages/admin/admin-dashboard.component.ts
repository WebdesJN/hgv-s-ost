import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MemberService } from '../../services/member.service';
import { NewsService } from '../../services/news.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="dashboard">
      <h1>Admin-Bereich</h1>
      <p>Willkommen im Verwaltungsbereich der HGV-Website.</p>

      <div class="stats">
        <div class="stat-card">
          <h3>{{ memberCount }}</h3>
          <p>Mitglieder</p>
        </div>
        <div class="stat-card">
          <h3>{{ newsCount }}</h3>
          <p>News-Beiträge</p>
        </div>
      </div>

      <div class="actions">
        <a routerLink="members" class="btn">Mitglieder verwalten</a>
        <a routerLink="news" class="btn btn-secondary">News verwalten</a>
        <button class="btn btn-danger" (click)="logout()">Abmelden</button>
      </div>
    </div>
  `,
  styles: [`
    .dashboard { max-width: 900px; margin: 40px auto; padding: 0 20px; }
    h1 { color: #1f6f3f; margin-bottom: 8px; }
    .stats { display: flex; gap: 20px; margin: 30px 0; }
    .stat-card { flex: 1; background: #f4f9f4; border: 1px solid #e3e8e3; border-radius: 12px; padding: 20px; text-align: center; }
    .stat-card h3 { margin: 0; font-size: 32px; color: #1f6f3f; }
    .stat-card p { margin: 6px 0 0; color: #666; }
    .actions { display: flex; gap: 12px; flex-wrap: wrap; }
    .btn { padding: 12px 20px; border-radius: 8px; border: none; font-weight: 600; cursor: pointer; text-decoration: none; display: inline-block; font-size: 15px; }
    .btn { background: #1f6f3f; color: white; }
    .btn-secondary { background: #6c757d; color: white; }
    .btn-danger { background: #dc3545; color: white; }
    .btn:hover { filter: brightness(0.95); }
  `]
})
export class AdminDashboardComponent {
  memberCount = 0;
  newsCount = 0;

  private memberService = inject(MemberService);
  private newsService = inject(NewsService);
  private auth = inject(AuthService);

  constructor() {
    this.loadStats();
  }

  async loadStats() {
    try {
      const members = await this.memberService.getAllIncludingInactive();
      const news = await this.newsService.getAll();
      this.memberCount = members.length;
      this.newsCount = news.length;
    } catch (err) {
      console.error('Fehler beim Laden der Statistiken:', err);
    }
  }

  async logout() {
    await this.auth.logout();
    location.href = '/login';
  }
}