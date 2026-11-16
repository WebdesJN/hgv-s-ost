export interface NewsItem {
  id: string;
  titel: string;
  teaser: string;
  inhalt: string[];
  kategorie: string;
  veroeffentlicht_am: string;
  views: number;
  bild_url?: string;
  created_at?: string;
  updated_at?: string;
}
