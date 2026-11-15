import { Injectable } from '@angular/core';
import { NewsItem } from '../models/news.model';

@Injectable({ providedIn: 'root' })
export class NewsService {
  private items: NewsItem[] = [
    {
      id: 1,
      title: 'Impressionen aus Ost',
      category: 'Nachrichten',
      published: '2024-10-18',
      views: 1060,
      teaser: 'Wer mal per Internet durch unseren schönen Stadtteil streifen möchte: Schaut bei Facebook unter HGV Ost rein.',
      content: [
        'Wer mal per Internet durch unseren schönen Stadtteil streifen möchte, dem sei empfohlen dies über unsere Seite bei Facebook zu tun. Einfach eingeben: HGV Ost.',
        'Es warten viele Bilder, die einen guten Eindruck vermitteln, was es bei uns gibt und was bei uns los ist. Also, schaut mal rein.',
      ],
    },
    {
      id: 2,
      title: 'Drehorgeltreffen in Ost am 7.9.24',
      category: 'Veranstaltung',
      published: '2024-08-18',
      views: 1113,
      teaser: 'Am Samstag, den 7. September, findet das dritte Drehorgeltreffen entlang der Oster Hauptstraße statt.',
      content: [
        'Eine Veranstaltung, die man nicht versäumen sollte: Am Samstag, den 7. September, findet das dritte Drehorgeltreffen statt.',
        'Mehrere Solisten, Duette und Gruppen treten mit ihren Instrumenten zu bestimmten Zeiten an verschiedenen Orten entlang der Oster Hauptstraße bis zum Schmalzmarkt auf. Das Programm geht von Traditionellem über Pop zu Rock, Klassisches dürfte auch im Repertoire sein.',
        'Dazu gibt es Bewirtung durch den 1. Handharmonika-Club Stuttgart-Ost im oberen Hof der Oster Schule, Ponykutsche und ein Bähnle für die Kleinen.',
      ],
    },
    {
      id: 3,
      title: 'Da brat mir einer einen Storch? Upcycling in Ost',
      category: 'Nachhaltigkeit',
      published: '2024-08-18',
      views: 980,
      teaser: 'Aus Maibaum wird Weihnachtsbaum wird Windkraftwerk: Der HGV Ost lebt Upcycling.',
      content: [
        'Der HGV Ost bedient eines der Themen der heutigen Zeit, die Nachhaltigkeit. Das Stichwort lautet: Upcycling.',
        'So wurde aus dem letztjährigen Maibaum vor der Alten Schule / dem MUSE-O der Weihnachtsbaum. Daraus nochmals ein Maibaum und ein Windkraftwerk. Aktuell grüßt von oben herab ein Storchenpaar die Bewohner und Besucher Osts.',
      ],
    },
    {
      id: 4,
      title: 'Flohmarkt in Ost am 6. Juli 2024',
      category: 'Veranstaltung',
      published: '2024-07-22',
      views: 958,
      teaser: 'DIE Veranstaltung mit dem größten Besucheraufkommen: Über 200 Stände vom Schmalzmarkt bis zur Schule.',
      content: [
        'Es ist wieder soweit: DIE Veranstaltung in Ost, diejenige mit dem größten Besucheraufkommen, der alljährliche Flohmarkt, findet am 6. Juli statt.',
        'Mehr als 200 Standbetreiber bieten Waren aus ihren Haushalten an. Der Markt beginnt am Schmalzmarkt, geht entlang der Oster Hauptstraße bis zum Hof der Grund- und Werkrealschule Ost.',
        'Offiziell ab 8 Uhr morgens bis 16 Uhr – buntes Treiben, stöbern und kaufen.',
      ],
    },
    {
      id: 5,
      title: 'MUSE-O sucht Vogelfreunde für die Beobachtungsstation',
      category: 'Aufruf',
      published: '2024-06-26',
      views: 1170,
      teaser: 'Engagement für Mauersegler: Nachfolger für die Piep-Show unterm Dach des MUSE-O gesucht.',
      content: [
        'Mehr als 12 Jahre lang war die Piep-Show von Rolf Kayser unterm Dach des MUSE-O der Hit. Per Minikameras konnte man das Treiben in den Brutboxen der Mauersegler beobachten.',
        'Aus gesundheitlichen Gründen wird dringend ein oder mehrere Nachfolger gesucht. Bereits Ende April / Anfang Mai kommen die Mauersegler aus Afrika zurück.',
        'Interessierte mit Technik-Affinität können sich beim MUSE-O-Vorstand melden. Große Pflegearbeiten sind nicht nötig, keine ständige Präsenz erforderlich.',
      ],
    },
    {
      id: 6,
      title: 'Wochenmarkt Ost',
      category: 'Markt',
      published: '2024-02-22',
      views: 1092,
      teaser: 'Jeden Mittwoch 7 bis 12 Uhr auf dem Schmalzmarkt: Obst, Gemüse, Käse, Fisch, Blumen und mehr.',
      content: [
        'Ein vielfältiges Angebot an frischen Produkten bietet der Wochenmarkt Ost jeden Mittwoch von 7 bis 12 Uhr auf dem Schmalzmarkt.',
        'Obst, Gemüse, Backwaren, Wurst und Fleisch, Blumen, Käse und Fisch – darunter Metzgerei Häfele, Frischfisch von Ali Barcin, Blumen von Cirin Celebi, Bio von Salim Cil und der Eselsmühle, 100 Käsesorten bei Jürgen Borchardt und der größte Stand von Daniel Hönes.',
      ],
    },
    {
      id: 7,
      title: 'Sommerzeit = Gartenwirtschaftzeit',
      category: 'Gastronomie',
      published: '2023-10-31',
      views: 1038,
      teaser: 'Raus in die Oster Gartenwirtschaften – Tipps für laue Sommerabende im Stadtteil.',
      content: [
        'Wenn die Tage länger werden, laden die Gartenwirtschaften in Ost zum Verweilen ein.',
        'Ob nach dem Flohmarkt am 1. Juli oder nach dem Wochenmarkt – ein kühles Getränk und regionale Küche runden den Besuch ab.',
      ],
    },
  ];

  getAll(): NewsItem[] {
    return [...this.items].sort((a, b) => b.published.localeCompare(a.published));
  }

  getCategories(): string[] {
    return [...new Set(this.items.map((i) => i.category))].sort();
  }

  getById(id: number): NewsItem | undefined {
    return this.items.find((i) => i.id === id);
  }
}

