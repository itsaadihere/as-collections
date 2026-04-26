"use client";
import { useState } from 'react';
import { createClient } from '@/utils/supabase/client';

export default function AdminPage() {
  const [category, setCategory] = useState('');
  const supabase = createClient();

  const handleAddCategory = async () => {
    const { data, error } = await supabase
      .from('categories')
      .insert([{ name: category }]);
    
    if (error) alert("Error adding category");
    else {
      alert("Category added successfully!");
      setCategory('');
    }
  };

  return (
    <div className="p-8 bg-as-cream min-h-screen">
      <h1 className="text-3xl font-bold text-as-charcoal mb-8">AS Collection Admin</h1>
      
      {/* Category Section */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-as-sand max-w-md">
        <h2 className="text-xl font-semibold mb-4 text-as-charcoal">Add New Category</h2>
        <input 
          type="text" 
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="e.g. Summer Collection"
          className="w-full p-2 border rounded mb-4 focus:ring-2 focus:ring-as-coral outline-none"
        />
        <button 
          onClick={handleAddCategory}
          className="w-full bg-as-coral text-white py-2 rounded font-medium hover:opacity-90 transition"
        >
          Save Category
        </button>
      </div>
    </div>
  );
}