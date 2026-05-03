-- 1. Create the products table
CREATE TABLE IF NOT EXISTS public.products (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  name text NOT NULL,
  description text,
  price numeric NOT NULL,
  image_url text NOT NULL,
  tag text,
  category text,
  sizes text[]
);

-- 2. Allow all operations for now so the Admin panel works out of the box
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access on products" ON public.products FOR SELECT TO public USING (true);
CREATE POLICY "Allow public insert access on products" ON public.products FOR INSERT TO public WITH CHECK (true);
CREATE POLICY "Allow public delete access on products" ON public.products FOR DELETE TO public USING (true);
CREATE POLICY "Allow public update access on products" ON public.products FOR UPDATE TO public USING (true);

-- 3. Insert the dummy data so your frontend is instantly populated!
INSERT INTO public.products (name, description, price, image_url, tag, category, sizes)
VALUES 
  ('Pastel Cotton Onesie', 'Premium quality soft cotton onesie for babies.', 24.99, 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&q=80&w=400&h=500', 'New Arrival', 'new', ARRAY['VS', 'S', 'M']),
  ('Cozy Knit Cardigan', 'Warm and stylish knit cardigan perfect for winters.', 34.99, 'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?auto=format&fit=crop&q=80&w=400&h=500', 'Trending', 'trending', ARRAY['M', 'L', 'XL']),
  ('Organic Sleepsuit', '100% organic cotton sleepsuit.', 29.99, 'https://images.unsplash.com/photo-1522771930-78848d9293e8?auto=format&fit=crop&q=80&w=400&h=500', 'Essential', 'new', ARRAY['VS', 'S']),
  ('Soft Toddler Overalls', 'Durable and cute overalls for toddlers.', 39.99, 'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&q=80&w=400&h=500', 'New Arrival', 'new', ARRAY['S', 'M', 'L']),
  ('Floral Summer Romper', 'Breathable fabric with beautiful floral prints.', 27.99, 'https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&q=80&w=400&h=500', 'Trending', 'trending', ARRAY['S', 'M', 'L']),
  ('Winter Beanie Set', 'Keep your baby warm with this cozy beanie set.', 19.99, 'https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&q=80&w=400&h=500', '', 'shop', ARRAY['S', 'M']),
  ('Classic Denim Jacket', 'A timeless denim jacket for stylish kids.', 44.99, 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&q=80&w=400&h=500', 'Trending', 'trending', ARRAY['M', 'L', 'XL', 'XXL']),
  ('Polka Dot Party Dress', 'Adorable party dress with polka dots.', 49.99, 'https://images.unsplash.com/photo-1522771930-78848d9293e8?auto=format&fit=crop&q=80&w=400&h=500', 'New Arrival', 'new', ARRAY['S', 'M', 'L']);

-- 4. Create Orders Table
CREATE TABLE IF NOT EXISTS public.orders (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  customer_name text NOT NULL,
  customer_email text NOT NULL,
  customer_phone text NOT NULL,
  customer_address text NOT NULL,
  total_amount numeric NOT NULL,
  status text DEFAULT 'Pending' NOT NULL,
  items jsonb NOT NULL
);

-- Allow public inserts for checkout, but only authenticated users (admin) can read/update.
-- For now, allow public read/update to match the admin dashboard out-of-the-box.
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public all access on orders" ON public.orders FOR ALL TO public USING (true) WITH CHECK (true);
