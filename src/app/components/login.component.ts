import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="login-card">
      <h2>Admin-Login</h2>
      @if (error) {
        <p class="error">{{ error }}</p>
      }
      <form (ngSubmit)="onSubmit()" #form="ngForm">
        <label>E-Mail</label>
        <input type="email" name="email" [(ngModel)]="email" required />

        <label>Passwort</label>
        <input type="password" name="password" [(ngModel)]="password" required />

        <button type="submit" [disabled]="loading">Anmelden</button>
      </form>
      @if (loading) {
        <p>Anmeldung …</p>
      }
      <p class="hint">Noch kein Zugang? Bitte den Administrator kontaktieren.</p>
    </div>
  `,
  styles: [`
    .login-card { max-width: 400px; margin: 80px auto; padding: 24px; border: 1px solid #ddd; border-radius: 12px; background: #fff; }
    .login-card h2 { margin-top: 0; color: #1f6f3f; text-align: center; }
    label { display: block; margin: 14px 0 4px; font-weight: 600; color: #333; }
    input { width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 6px; box-sizing: border-box; font-size: 14px; }
    button { width: 100%; margin-top: 20px; padding: 10px; background: #1f6f3f; color: white; border: none; border-radius: 6px; font-weight: 600; font-size: 15px; cursor: pointer; }
    button:disabled { opacity: 0.6; cursor: not-allowed; }
    .error { color: #d32f2f; background: #ffeaea; padding: 8px; border-radius: 4px; margin-bottom: 12px; font-size: 14px; }
    .hint { margin-top: 16px; font-size: 13px; color: #666; text-align: center; }
  `]
})
export class LoginComponent {
  email = '';
  password = '';
  error = '';
  loading = false;

  constructor(private auth: AuthService, private router: Router) {}

  async onSubmit() {
    this.error = '';
    this.loading = true;
    try {
      await this.auth.login(this.email, this.password);
      this.router.navigate(['/admin']);
    } catch (err: any) {
      this.error = err.message || 'Login fehlgeschlagen';
    } finally {
      this.loading = false;
    }
  }
}