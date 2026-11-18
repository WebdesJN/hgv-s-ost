import { Component } from '@angular/core';

@Component({
  selector: 'app-kontakt',
  standalone: true,
  template: `
    <section class="kontakt-section">
      <div class="kontakt-header">
        <h1>Kontakt</h1>
        <p class="subtitle">HGV Stuttgart Ost e.V.</p>
      </div>
      <div class="kontakt-grid">
        <div class="kontakt-card">
          <h3>Adresse</h3>
          <p class="kontakt-item">Oster Hauptstraße</p>
          <p class="kontakt-item">70186 Stuttgart</p>
          <p class="kontakt-item">Deutschland</p>
        </div>
        <div class="kontakt-card">
          <h3>E-Mail</h3>
          <p class="kontakt-item"><a href="mailto:info&#64;ost-beispiel.de">info&#64;ost-beispiel.de</a></p>
        </div>
        <div class="kontakt-card">
          <h3>Öffnungszeiten</h3>
          <p class="kontakt-item">Mo–Fr: 09:00–17:00 Uhr</p>
          <p class="kontakt-item">Sa: 10:00–14:00 Uhr</p>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .kontakt-section {
      max-width: 800px;
      margin: 0 auto;
    }
    .kontakt-header {
      text-align: center;
      margin-bottom: var(--space-xl);
    }
    .kontakt-header h1 {
      margin: 0 0 var(--space-xs);
      color: var(--color-primary);
      font-size: 2rem;
    }
    .subtitle {
      margin: 0;
      color: var(--color-text-muted);
      font-size: 1rem;
    }
    .kontakt-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      gap: var(--space-lg);
    }
    .kontakt-card {
      background: var(--color-surface);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-lg);
      padding: var(--space-lg);
      box-shadow: var(--shadow-sm);
    }
    .kontakt-card h3 {
      margin: 0 0 var(--space-sm);
      color: var(--color-text);
      font-size: 1.1rem;
    }
    .kontakt-item {
      margin: 0 0 var(--space-xs);
      color: var(--color-text-muted);
      font-size: 0.95rem;
    }
    .kontakt-item a {
      color: var(--color-primary);
    }
    .kontakt-item a:hover {
      text-decoration: underline;
    }
  `],
})
export class KontaktComponent {}

