"use client";
import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client'; // Double check this path exists!

export default function AdminPage() {
  const [categoryName, setCategoryName] = useState('');
  const [categories, setCategories] = useState<any[]>([]);
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const supabase = createClient();

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
      fetchCategories();
    }
  };

  const handleAddProduct = async () => {
    const { error } = await supabase.from('products').insert([
      { 
        title: productName, // Changed from 'name' to 'title' to match your SQL
        price: parseFloat(price), 
        category_id: selectedCategory,
        images: [imageUrl] // Changed from 'image_url' to 'images' array to match your SQL
      }
    ]);

    if (error) alert("Error: " + error.message);
    else {
      alert("Product added successfully!");
      setProductName('');
      setPrice('');
      setImageUrl('');
    }
  };

  return (
    <div className="p-8 bg-[#F2EFE9] min-h-screen">
      <h1 className="text-3xl font-bold text-[#5A5452] mb-8">AS Collection Admin</h1>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <h2 className="text-xl font-semibold mb-4">Add Category</h2>
          <input type="text" value={categoryName} onChange={(e) => setCategoryName(e.target.value)} placeholder="Category Name" className="w-full p-2 border rounded mb-4"/>
          <button onClick={handleAddCategory} className="w-full bg-[#FF8A7A] text-white py-2 rounded">Save Category</button>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <h2 className="text-xl font-semibold mb-4">Add Product</h2>
          <input type="text" placeholder="Product Title" value={productName} onChange={(e) => setProductName(e.target.value)} className="w-full p-2 border rounded mb-2"/>
          <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} className="w-full p-2 border rounded mb-2"/>
          <select className="w-full p-2 border rounded mb-2" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
            <option value="">Select Category</option>
            {categories.map((cat) => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
          </select>
          <input type="text" placeholder="Image URL" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} className="w-full p-2 border rounded mb-4"/>
          <button onClick={handleAddProduct} className="w-full bg-[#FF8A7A] text-white py-2 rounded">Upload Product</button>
        </div>
      </div>
    </div>
  );
}