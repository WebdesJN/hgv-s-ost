export interface Member {
  id: string;
  vorname: string;
  nachname: string;
  email?: string;
  telefon?: string;
  strasse?: string;
  plz?: string;
  ort?: string;
  mitgliedsnummer?: string;
  eintrittsdatum?: string;
  aktiv: boolean;
  bild_url?: string;
  created_at?: string;
  updated_at?: string;
}