import { Injectable } from '@angular/core';
import { supabase } from '../supabase-client';
import { NewsItem } from '../models/news.model';

@Injectable({ providedIn: 'root' })
export class NewsService {
  private readonly table = 'news';

  async getAll(): Promise<NewsItem[]> {
    const { data, error } = await supabase
      .from(this.table)
      .select('*')
      .order('veroeffentlicht_am', { ascending: false });
    if (error) throw error;
    return (data ?? []) as NewsItem[];
  }

  async getCategories(): Promise<string[]> {
    const { data, error } = await supabase
      .from(this.table)
      .select('kategorie');
    if (error) throw error;
    const categories = [...new Set((data ?? []).map((n) => n.kategorie))].filter(Boolean).sort();
    return categories;
  }

  async getById(id: string): Promise<NewsItem | null> {
    const { data, error } = await supabase
      .from(this.table)
      .select('*')
      .eq('id', id)
      .single();
    if (error) throw error;
    return data as NewsItem;
  }

  async create(news: Omit<NewsItem, 'id' | 'createdAt' | 'updatedAt'>): Promise<NewsItem> {
    const { data, error } = await supabase
      .from(this.table)
      .insert([news])
      .select()
      .single();
    if (error) throw error;
    return data as NewsItem;
  }

  async update(id: string, changes: Partial<NewsItem>): Promise<NewsItem> {
    const { data, error } = await supabase
      .from(this.table)
      .update({ ...changes, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data as NewsItem;
  }

  async remove(id: string): Promise<void> {
    const { error } = await supabase.from(this.table).delete().eq('id', id);
    if (error) throw error;
  }
}

