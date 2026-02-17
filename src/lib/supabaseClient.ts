import { createClient } from '@supabase/supabase-js';

// These reference the variables in your .env file
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Validation to help you debug during development
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables. Check your .env file!");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
