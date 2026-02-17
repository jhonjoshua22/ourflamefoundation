import { createClient } from '@supabase/supabase-js';

// Hardcoded for your specific project
const supabaseUrl = 'https://wujohzkcngjdqagbsaer.supabase.co';
// !!! MAKE SURE THE KEY BELOW IS INSIDE SINGLE QUOTES !!!
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind1am9oemtjbmdqZHFhZ2JzYWVyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEzMzAzNjksImV4cCI6MjA4NjkwNjM2OX0.J1o1pKZwDsaiCB0O58Qie15Wi31UyEegiBqfyValhZ8'; 

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
