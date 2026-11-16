import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MemberService } from '../../../services/member.service';
import { Member } from '../../../models/member.model';

@Component({
  selector: 'app-admin-member-list',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="admin-page">
      <div class="page-header">
        <h1>Mitglieder</h1>
        <a routerLink="new" class="btn">+ Neues Mitglied</a>
      </div>

      @if (loading) {
        <p>Lade …</p>
      } @else if (members.length === 0) {
        <p>Noch keine Mitglieder vorhanden.</p>
      } @else {
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>E-Mail</th>
              <th>Telefon</th>
              <th>Mitgliedsnummer</th>
              <th>Status</th>
              <th class="actions">Aktionen</th>
            </tr>
          </thead>
          <tbody>
            @for (m of members; track m.id) {
              <tr>
                <td>{{ m.vorname }} {{ m.nachname }}</td>
                <td>{{ m.email || '-' }}</td>
                <td>{{ m.telefon || '-' }}</td>
                <td>{{ m.mitgliedsnummer || '-' }}</td>
                <td><span class="badge" [class.active]="m.aktiv">{{ m.aktiv ? 'aktiv' : 'inaktiv' }}</span></td>
                <td class="actions">
                  <a [routerLink]="[m.id, 'edit']" class="btn-small">Bearbeiten</a>
                  <button class="btn-small btn-delete" (click)="delete(m.id!, m.vorname, m.nachname)">Löschen</button>
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
    .badge { padding: 4px 10px; border-radius: 12px; font-size: 12px; font-weight: 600; }
    .badge.active { background: #d4edda; color: #155724; }
    .badge:not(.active) { background: #f8d7da; color: #721c24; }
    .actions { white-space: nowrap; }
    .btn { padding: 8px 16px; background: #1f6f3f; color: white; border: none; border-radius: 6px; font-weight: 600; cursor: pointer; text-decoration: none; font-size: 14px; }
    .btn-small { padding: 6px 12px; font-size: 13px; margin-right: 6px; }
    .btn-small.btn-delete { background: #dc3545; color: white; }
    .btn-small:hover { filter: brightness(0.9); }
  `]
})
export class AdminMemberListComponent {
  members: Member[] = [];
  loading = true;

  constructor(private memberService: MemberService) {
    this.load();
  }

  async load() {
    try {
      this.loading = true;
      this.members = await this.memberService.getAllIncludingInactive();
    } catch (err) {
      console.error('Fehler beim Laden der Mitglieder:', err);
    } finally {
      this.loading = false;
    }
  }

  async delete(id: string, vorname: string, nachname: string) {
    if (!confirm(`Mitglied "${vorname} {{ nachname }}" wirklich löschen?`)) return;
    try {
      await this.memberService.remove(id);
      this.members = this.members.filter((m) => m.id !== id);
    } catch (err) {
      alert('Fehler beim Löschen: ' + err);
    }
  }
}