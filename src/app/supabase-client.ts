import { createClient } from '@supabase/supabase-js';
import { environment } from '../environments/environment';

const supabaseUrl = environment.supabase.url;
const supabaseAnonKey = environment.supabase.anonKey;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);