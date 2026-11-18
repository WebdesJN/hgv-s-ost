import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="login-page">
      <div class="login-card">
        <div class="login-header">
          <h2>Admin-Login</h2>
          <p class="login-sub">Melden Sie sich an, um den Admin-Bereich zu nutzen.</p>
        </div>
        @if (error) {
          <div class="alert alert-error">{{ error }}</div>
        }
        <form (ngSubmit)="onSubmit()" #form="ngForm">
          <div class="form-group">
            <label for="email">E-Mail-Adresse</label>
            <input type="email" id="email" name="email" [(ngModel)]="email" required placeholder="name@example.de" />
          </div>
          <div class="form-group">
            <label for="password">Passwort</label>
            <input type="password" id="password" name="password" [(ngModel)]="password" required placeholder="••••••••" />
          </div>
          <button type="submit" class="btn btn-primary" [disabled]="loading">Anmelden</button>
        </form>
        @if (loading) {
          <p class="loading-text">Anmeldung …</p>
        }
        <p class="hint">Noch kein Zugang? Bitte kontaktieren Sie den Administrator.</p>
      </div>
    </div>
  `,
  styles: [`
    .login-page {
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 60vh;
      padding: var(--space-lg);
    }
    .login-card {
      width: 100%;
      max-width: 420px;
      background: var(--color-surface);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-lg);
      padding: var(--space-xl);
      box-shadow: var(--shadow-lg);
    }
    .login-header {
      text-align: center;
      margin-bottom: var(--space-xl);
    }
    .login-header h2 {
      margin: 0 0 var(--space-xs);
      color: var(--color-primary);
      font-size: 1.5rem;
      font-weight: 700;
    }
    .login-sub {
      margin: 0;
      color: var(--color-text-muted);
      font-size: 0.9rem;
    }
    .form-group {
      margin-bottom: var(--space-md);
    }
    label {
      display: block;
      margin-bottom: var(--space-xs);
      font-size: 0.875rem;
      font-weight: 600;
      color: var(--color-text);
    }
    input {
      width: 100%;
      padding: 0.75rem 1rem;
      font-size: 1rem;
      border: 1px solid var(--color-border);
      border-radius: var(--radius-md);
      background: var(--color-surface);
      color: var(--color-text);
      transition: var(--transition);
    }
    input:focus {
      outline: none;
      border-color: var(--color-primary);
      box-shadow: 0 0 0 3px var(--color-primary-light);
    }
    button.btn-primary {
      width: 100%;
      margin-top: var(--space-xs);
      padding: 0.75rem;
    }
    .alert-error {
      margin-bottom: var(--space-md);
      padding: var(--space-sm) var(--space-md);
      background: var(--color-error-bg);
      color: var(--color-error);
      border-radius: var(--radius-md);
      font-size: 0.875rem;
      border: 1px solid var(--color-error);
    }
    .loading-text {
      margin-top: var(--space-sm);
      color: var(--color-text-muted);
      font-size: 0.875rem;
      text-align: center;
    }
    .hint {
      margin-top: var(--space-lg);
      font-size: 0.85rem;
      color: var(--color-text-muted);
      text-align: center;
    }
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