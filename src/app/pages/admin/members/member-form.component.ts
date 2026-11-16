import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MemberService } from '../../../services/member.service';
import { Member } from '../../../models/member.model';

@Component({
  selector: 'app-admin-member-form',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="admin-page">
      <div class="page-header">
        <h1>{{ isEdit ? 'Mitglied bearbeiten' : 'Neues Mitglied' }}</h1>
        <a (click)="goBack()" class="btn">Zurück zur Liste</a>
      </div>

      <form (ngSubmit)="onSubmit()" #form="ngForm" class="form-card">
        <div class="form-grid">
          <div class="field">
            <label>Vorname *</label>
            <input type="text" name="vorname" [(ngModel)]="member.vorname" required />
          </div>
          <div class="field">
            <label>Nachname *</label>
            <input type="text" name="nachname" [(ngModel)]="member.nachname" required />
          </div>
          <div class="field">
            <label>E-Mail</label>
            <input type="email" name="email" [(ngModel)]="member.email" />
          </div>
          <div class="field">
            <label>Telefon</label>
            <input type="text" name="telefon" [(ngModel)]="member.telefon" />
          </div>
          <div class="field">
            <label>Straße</label>
            <input type="text" name="strasse" [(ngModel)]="member.strasse" />
          </div>
          <div class="field">
            <label>PLZ</label>
            <input type="text" name="plz" [(ngModel)]="member.plz" />
          </div>
          <div class="field">
            <label>Ort</label>
            <input type="text" name="ort" [(ngModel)]="member.ort" />
          </div>
          <div class="field">
            <label>Mitgliedsnummer</label>
            <input type="text" name="mitgliedsnummer" [(ngModel)]="member.mitgliedsnummer" />
          </div>
          <div class="field">
            <label>Eintrittsdatum</label>
            <input type="date" name="eintrittsdatum" [(ngModel)]="member.eintrittsdatum" />
          </div>
          <div class="field">
            <label>Aktiv</label>
            <select name="aktiv" [(ngModel)]="member.aktiv">
              <option value="true">Ja</option>
              <option value="false">Nein</option>
            </select>
          </div>
          <div class="field">
            <label>Bild-URL</label>
            <input type="text" name="bildUrl" placeholder="https://..." [(ngModel)]="member.bild_url" />
          </div>
        </div>

        <div class="form-actions">
          <button type="submit" [disabled]="loading" class="btn">Speichern</button>
          <button type="button" *ngIf="isEdit" (click)="remove()" class="btn btn-delete">Mitglied löschen</button>
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
    .form-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 16px; }
    .field { display: flex; flex-direction: column; }
    label { font-weight: 600; margin-bottom: 6px; font-size: 14px; color: #333; }
    input, select { padding: 10px; border: 1px solid #ccc; border-radius: 6px; font-size: 14px; }
    .form-actions { display: flex; gap: 12px; margin-top: 24px; }
    .btn { padding: 10px 20px; border-radius: 8px; border: none; font-weight: 600; cursor: pointer; font-size: 14px; }
    .btn { background: #1f6f3f; color: white; }
    .btn-delete { background: #dc3545; color: white; }
    .btn:disabled { opacity: 0.6; cursor: not-allowed; }
    .error { color: #d32f2f; background: #ffeaea; padding: 8px; border-radius: 4px; margin-top: 12px; font-size: 14px; }
  `]
})
export class AdminMemberFormComponent {
  member: Member = {
    id: '',
    vorname: '',
    nachname: '',
    aktiv: true,
  };
  isEdit = false;
  loading = false;
  error = '';

  private memberService = inject(MemberService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  constructor() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.loadMember(id);
    }
  }

  async loadMember(id: string) {
    try {
      this.member = await this.memberService.getById(id) ?? this.member;
    } catch (err) {
      this.error = 'Mitglied konnte nicht geladen werden';
    }
  }

  async onSubmit() {
    this.error = '';
    this.loading = true;
    try {
      if (this.isEdit && this.member.id) {
        await this.memberService.update(this.member.id, this.member);
      } else {
        const { id, ...payload } = this.member;
        await this.memberService.create(payload as Omit<Member, 'id'>);
      }
      this.router.navigate(['../'], { relativeTo: this.route });
    } catch (err: any) {
      this.error = err.message || 'Speichern fehlgeschlagen';
    } finally {
      this.loading = false;
    }
  }

  async remove() {
    if (!this.member.id) return;
    if (!confirm(`Mitglied "${this.member.vorname} ${this.member.nachname}" wirklich löschen?`)) return;
    try {
      await this.memberService.remove(this.member.id);
      this.router.navigate(['../'], { relativeTo: this.route });
    } catch (err: any) {
      this.error = err.message || 'Löschen fehlgeschlagen';
    }
  }

  goBack() {
    this.router.navigate(['/admin/members']);
  }
}