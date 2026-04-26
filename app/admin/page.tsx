"use client";
import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';

export default function AdminPage() {
  const [categoryName, setCategoryName] = useState('');
  const [categories, setCategories] = useState<any[]>([]);
  
  // Product State
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const supabase = createClient();

  // Load categories when page opens
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const { data } = await supabase.from('categories').select('*');
    if (data) setCategories(data);
  };

  const handleAddCategory = async () => {
    const { error } = await supabase.from('categories').insert([{ name: categoryName }]);
    if (error) alert("Error adding category");
    else {
      alert("Category added!");
      setCategoryName('');
      fetchCategories(); // Refresh the list
    }
  };

  const handleAddProduct = async () => {
    const { error } = await supabase.from('products').insert([
      { 
        name: productName, 
        price: parseFloat(price), 
        category_id: selectedCategory,
        image_url: imageUrl 
      }
    ]);

    if (error) alert("Error adding product: " + error.message);
    else {
      alert("Product added to AS Collection!");
      setProductName('');
      setPrice('');
      setImageUrl('');
    }
  };

  return (
    <div className="p-8 bg-as-cream min-h-screen font-sans text-as-charcoal">
      <h1 className="text-4xl font-bold mb-10 border-b pb-4">AS Collection Dashboard</h1>
      
      <div className="grid md:grid-cols-2 gap-10">
        
        {/* SECTION 1: CATEGORIES */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-as-sand">
          <h2 className="text-xl font-semibold mb-4 text-as-coral">1. Manage Categories</h2>
          <div className="space-y-4">
            <input 
              type="text" 
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              placeholder="New Category Name"
              className="w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-as-coral"
            />
            <button 
              onClick={handleAddCategory}
              className="w-full bg-as-charcoal text-white py-3 rounded-xl font-medium hover:bg-opacity-90"
            >
              Save Category
            </button>
          </div>
        </div>

        {/* SECTION 2: PRODUCTS */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-as-sand">
          <h2 className="text-xl font-semibold mb-4 text-as-coral">2. Add New Product</h2>
          <div className="space-y-4">
            <input 
              type="text" 
              placeholder="Product Name (e.g. Floral Summer Dress)" 
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className="w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-as-coral"
            />
            <input 
              type="number" 
              placeholder="Price (e.g. 2500)" 
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-as-coral"
            />
            <select 
              className="w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-as-coral bg-white"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
            <input 
              type="text" 
              placeholder="Image Link (URL)" 
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-as-coral"
            />
            <button 
              onClick={handleAddProduct}
              className="w-full bg-as-coral text-white py-3 rounded-xl font-bold hover:shadow-lg transition"
            >
              Upload Product
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}