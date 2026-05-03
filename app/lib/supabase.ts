import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = supabaseUrl && supabaseKey 
  ? createClient(supabaseUrl, supabaseKey)
  : null;

export async function getProducts(category?: string) {
  if (!supabase) {
    return [];
  }

  let query = supabase.from('products').select('*');
  if (category && category !== 'shop') {
    query = query.eq('category', category);
  }
  
  const { data, error } = await query;
  
  if (error) {
    console.error("Error fetching products from Supabase:", error.message);
    return [];
  }
  
  return data || [];
}
