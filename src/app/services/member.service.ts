import { Injectable } from '@angular/core';
import { supabase } from '../supabase-client';
import { Member } from '../models/member.model';

@Injectable({ providedIn: 'root' })
export class MemberService {
  private readonly table = 'members';

  async getAll(): Promise<Member[]> {
    const { data, error } = await supabase
      .from(this.table)
      .select('*')
      .eq('aktiv', true)
      .order('nachname', { ascending: true });
    if (error) throw error;
    return (data ?? []) as Member[];
  }

  async getAllIncludingInactive(): Promise<Member[]> {
    const { data, error } = await supabase
      .from(this.table)
      .select('*')
      .order('nachname', { ascending: true });
    if (error) throw error;
    return (data ?? []) as Member[];
  }

  async getById(id: string): Promise<Member | null> {
    const { data, error } = await supabase
      .from(this.table)
      .select('*')
      .eq('id', id)
      .single();
    if (error) throw error;
    return data as Member;
  }

  async create(member: Omit<Member, 'id' | 'createdAt' | 'updatedAt'>): Promise<Member> {
    const { data, error } = await supabase
      .from(this.table)
      .insert([member])
      .select()
      .single();
    if (error) throw error;
    return data as Member;
  }

  async update(id: string, changes: Partial<Member>): Promise<Member> {
    const { data, error } = await supabase
      .from(this.table)
      .update({ ...changes, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data as Member;
  }

  async remove(id: string): Promise<void> {
    const { error } = await supabase.from(this.table).delete().eq('id', id);
    if (error) throw error;
  }
}