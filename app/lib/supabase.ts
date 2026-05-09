import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = supabaseUrl && supabaseKey 
  ? createClient(supabaseUrl, supabaseKey)
  : null;

export async function getProducts(category?: string, search?: string) {
  if (!supabase) {
    return [];
  }

  let query = supabase.from('products').select('*').order('created_at', { ascending: false });
  if (category && category !== 'shop') {
    query = query.eq('category', category);
  }
  if (search) {
    query = query.ilike('name', `%${search}%`);
  }
  
  const { data, error } = await query;
  
  if (error) {
    console.error("Error fetching products from Supabase:", error.message);
    return [];
  }
  
  return data || [];
}

export async function createOrder(orderData: any) {
  if (!supabase) return { error: "Supabase not initialized" };
  const { data, error } = await supabase.from('orders').insert([orderData]);
  return { data, error: error?.message };
}
