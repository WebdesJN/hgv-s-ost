import { Component, signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MemberService } from '../../../services/member.service';
import { Member } from '../../../models/member.model';

@Component({
  selector: 'app-admin-member-list',
  standalone: true,
  imports: [FormsModule, RouterLink],
  template: `
    <div class="admin-page">
      <div class="page-header">
        <div>
          <h1>Mitglieder verwalten</h1>
          <p class="sub">Mitgliederdaten einsehen, bearbeiten und pflegen</p>
        </div>
        <a routerLink="new" class="btn">+ Neues Mitglied</a>
      </div>

      <div class="toolbar">
        <input [(ngModel)]="search" placeholder="Nach Name, E-Mail oder Mitgliedsnummer suchen …" aria-label="Suchen" />
      </div>

      @if (loading) {
        <p>Lade …</p>
      } @else if (filteredMembers().length === 0) {
        <p>Keine Mitglieder gefunden.</p>
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
            @for (m of filteredMembers(); track m.id) {
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
        <p class="hint">Insgesamt {{ members.length }} Mitglieder im Verzeichnis.</p>
      }
    </div>
  `,
  styles: [`
    .admin-page { max-width: 1000px; margin: 40px auto; padding: 0 20px; }
    .page-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; flex-wrap: wrap; gap: 12px; }
    .page-header h1 { margin: 0; color: #1f6f3f; }
    .sub { margin: 4px 0 0; color: #666; font-size: 14px; }
    table { width: 100%; border-collapse: collapse; background: #fff; border: 1px solid #ddd; border-radius: 8px; overflow: hidden; }
    th, td { padding: 12px 14px; text-align: left; border-bottom: 1px solid #eee; }
    th { background: #f4f9f4; font-weight: 600; color: #333; }
    tr:last-child td { border-bottom: none; }
    .actions { white-space: nowrap; }
    .badge { padding: 4px 10px; border-radius: 12px; font-size: 12px; font-weight: 600; }
    .badge.active { background: #d4edda; color: #155724; }
    .badge:not(.active) { background: #f8d7da; color: #721c24; }
    .btn { padding: 8px 16px; background: #1f6f3f; color: white; border: none; border-radius: 6px; font-weight: 600; cursor: pointer; text-decoration: none; font-size: 14px; }
    .btn-small { padding: 6px 12px; font-size: 13px; margin-right: 6px; }
    .btn-small.btn-delete { background: #dc3545; color: white; }
    .btn-small:hover { filter: brightness(0.9); }
    .toolbar { margin-bottom: 20px; }
    input { padding: 10px 12px; border: 1px solid #ccc; border-radius: 8px; font-size: 14px; width: 100%; max-width: 400px; box-sizing: border-box; }
    .hint { margin-top: 16px; font-size: 13px; color: #888; }
  `]
})
export class AdminMemberListComponent {
  members: Member[] = [];
  search = signal('');
  loading = true;

  filteredMembers = computed(() => {
    const q = this.search().toLowerCase().trim();
    if (!q) return this.members;
    return this.members.filter((m) =>
      (m.vorname + ' ' + m.nachname).toLowerCase().includes(q) ||
      m.email?.toLowerCase().includes(q) ||
      m.mitgliedsnummer?.toLowerCase().includes(q)
    );
  });

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
    if (!confirm("Mitglied '" + vorname + " " + nachname + "' wirklich löschen?")) return;
    try {
      await this.memberService.remove(id);
      this.members = this.members.filter((m) => m.id !== id);
    } catch (err) {
      alert('Fehler beim Löschen: ' + err);
    }
  }
}
