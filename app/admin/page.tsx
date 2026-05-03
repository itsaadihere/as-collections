"use client";
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

interface Product {
  id: string;
  name: string;
  price: number;
  image_url: string;
  tag: string;
  category: string;
  description: string;
  sizes: string[];
}

interface Order {
  id: string;
  created_at: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  customer_address: string;
  total_amount: number;
  status: string;
  items: any;
}

const AVAILABLE_SIZES = ['VS', 'S', 'M', 'L', 'XL', 'XXL'];

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<'inventory' | 'orders'>('inventory');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('new');
  const [tag, setTag] = useState('');
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      fetchProducts();
      fetchOrders();
    }
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === 'anushaarif886@gmail.com' && password === 'anushajj4242') {
      setIsAuthenticated(true);
    } else {
      alert("Invalid email or password");
    }
  };

  const fetchProducts = async () => {
    if (supabase) {
      const { data } = await supabase.from('products').select('*').order('created_at', { ascending: false });
      if (data) setProducts(data);
    }
  };

  const fetchOrders = async () => {
    if (supabase) {
      const { data } = await supabase.from('orders').select('*').order('created_at', { ascending: false });
      if (data) setOrders(data);
    }
  };

  const updateOrderStatus = async (id: string, newStatus: string) => {
    if (supabase) {
      await supabase.from('orders').update({ status: newStatus }).eq('id', id);
      fetchOrders();
    }
  };

  const toggleSize = (size: string) => {
    setSelectedSizes(prev => 
      prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
    );
  };

  const handleAddProduct = async () => {
    if (!name || !price || !imageFile) return alert("Please provide a name, price, and image");
    
    setLoading(true);
    if (supabase) {
      try {
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const { error: uploadError } = await supabase.storage
          .from('products')
          .upload(fileName, imageFile);

        if (uploadError) {
          alert("Image upload failed! Make sure you created a public 'products' storage bucket in Supabase.");
          setLoading(false);
          return;
        }

        const { data: { publicUrl } } = supabase.storage
          .from('products')
          .getPublicUrl(fileName);

        const { error } = await supabase.from('products').insert([
          { 
            name, 
            description,
            price: parseFloat(price), 
            category,
            tag,
            sizes: selectedSizes,
            image_url: publicUrl 
          }
        ]);

        if (error) throw error;
        
        alert("Product Added successfully!");
        setName(''); setDescription(''); setPrice(''); setTag(''); setImageFile(null); setSelectedSizes([]);
        fetchProducts();
      } catch (err: any) {
        alert("Error: " + err.message);
      }
    } else {
      alert("Supabase environment variables missing.");
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (supabase) {
      await supabase.from('products').delete().eq('id', id);
      fetchProducts();
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="flex-1 bg-[#fffbf9] flex items-center justify-center p-6 min-h-screen">
        <form onSubmit={handleLogin} className="bg-white p-8 rounded-3xl shadow-sm border border-[#fdf3f5] max-w-sm w-full">
          <h2 className="text-2xl font-bold text-center text-[#3b234a] mb-6 italic">Admin Login</h2>
          <div className="grid gap-4">
            <input 
              type="email" required placeholder="Email Address" 
              value={email} onChange={e => setEmail(e.target.value)}
              className="w-full bg-[#fcfcfb] p-3 rounded-xl border border-gray-200 outline-none focus:border-[#f17a7e] text-sm"
            />
            <input 
              type="password" required placeholder="Password" 
              value={password} onChange={e => setPassword(e.target.value)}
              className="w-full bg-[#fcfcfb] p-3 rounded-xl border border-gray-200 outline-none focus:border-[#f17a7e] text-sm"
            />
            <button type="submit" className="w-full bg-[#f17a7e] text-white py-3 rounded-xl font-bold tracking-wider hover:opacity-90 transition-opacity mt-2">
              LOGIN
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-[#fffbf9] p-4 md:p-10 font-sans text-[#3b234a] min-h-screen">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold italic mb-2 text-[#3b234a]">Admin Dashboard</h1>
          <p className="text-sm text-[#65586d]">Manage your store products & inventory</p>
          <div className="flex justify-center gap-4 mt-6">
            <button 
              onClick={() => setActiveTab('inventory')}
              className={`px-6 py-2 rounded-full font-bold text-sm transition-colors ${activeTab === 'inventory' ? 'bg-[#3b234a] text-white' : 'bg-white text-[#65586d] border border-gray-200'}`}
            >
              Inventory Management
            </button>
            <button 
              onClick={() => setActiveTab('orders')}
              className={`px-6 py-2 rounded-full font-bold text-sm transition-colors ${activeTab === 'orders' ? 'bg-[#3b234a] text-white' : 'bg-white text-[#65586d] border border-gray-200'}`}
            >
              Track Orders
            </button>
          </div>
        </header>

        {activeTab === 'inventory' && (
          <div className="grid md:grid-cols-12 gap-8">
            {/* PRODUCT ADDITION */}
            <div className="md:col-span-5 bg-white p-8 rounded-3xl shadow-sm border border-[#fdf3f5]">
              <h2 className="text-lg font-bold mb-6 flex items-center gap-2 text-[#3b234a]">
                <span className="w-2 h-2 bg-[#f17a7e] rounded-full"></span>
                Add New Product
              </h2>
              <div className="grid gap-4">
                <input 
                  type="text" placeholder="Product Name *" value={name} onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#fcfcfb] p-3 rounded-xl border border-gray-200 outline-none focus:border-[#f17a7e] text-sm"
                />
                <textarea 
                  placeholder="Product Description" rows={3} value={description} onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-[#fcfcfb] p-3 rounded-xl border border-gray-200 outline-none focus:border-[#f17a7e] text-sm"
                />
                <div className="grid grid-cols-2 gap-4">
                  <input 
                    type="number" placeholder="Price (PKR) *" value={price} onChange={(e) => setPrice(e.target.value)}
                    className="bg-[#fcfcfb] p-3 rounded-xl border border-gray-200 outline-none focus:border-[#f17a7e] text-sm"
                  />
                  <select 
                    value={category} onChange={(e) => setCategory(e.target.value)}
                    className="bg-[#fcfcfb] p-3 rounded-xl border border-gray-200 outline-none focus:border-[#f17a7e] text-sm"
                  >
                    <option value="new">New Arrival</option>
                    <option value="trending">Trending</option>
                    <option value="shop">Regular Shop</option>
                  </select>
                </div>
                
                <div className="bg-[#fcfcfb] p-3 rounded-xl border border-gray-200">
                  <p className="text-xs font-semibold text-[#65586d] mb-2 uppercase tracking-wide">Available Sizes</p>
                  <div className="flex flex-wrap gap-2">
                    {AVAILABLE_SIZES.map(size => (
                      <button 
                        key={size} onClick={() => toggleSize(size)}
                        className={`px-3 py-1 text-xs font-bold rounded-md border transition-colors ${
                          selectedSizes.includes(size) ? 'bg-[#3b234a] text-white border-[#3b234a]' : 'bg-white text-[#65586d] border-gray-200 hover:border-[#f17a7e]'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                <input 
                  type="text" placeholder="Tag (e.g. 'Trending', 'New Arrival')" value={tag} onChange={(e) => setTag(e.target.value)}
                  className="w-full bg-[#fcfcfb] p-3 rounded-xl border border-gray-200 outline-none focus:border-[#f17a7e] text-sm"
                />
                
                <div className="bg-[#fcfcfb] p-3 rounded-xl border border-gray-200">
                  <p className="text-xs font-semibold text-[#65586d] mb-2 uppercase tracking-wide">Product Image *</p>
                  <input 
                    type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                    className="w-full text-sm text-[#65586d] file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-[#f17a7e] file:text-white hover:file:opacity-90 cursor-pointer"
                  />
                </div>

                <button 
                  onClick={handleAddProduct} disabled={loading}
                  className="w-full bg-[#f17a7e] text-white py-3 rounded-xl font-bold tracking-wider hover:opacity-90 transition-opacity mt-2"
                >
                  {loading ? 'Uploading & Adding...' : 'Publish Product'}
                </button>
              </div>
            </div>

            {/* PRODUCT LIST */}
            <div className="md:col-span-7 bg-white p-8 rounded-3xl shadow-sm border border-[#fdf3f5]">
              <h2 className="text-lg font-bold mb-6 flex items-center gap-2 text-[#3b234a]">
                <span className="w-2 h-2 bg-[#f17a7e] rounded-full"></span>
                Current Inventory
              </h2>
              <div className="overflow-y-auto max-h-[600px] pr-2">
                {products.length === 0 ? (
                  <p className="text-sm text-[#65586d]">No products found in DB.</p>
                ) : (
                  <div className="grid gap-4">
                    {products.map(p => (
                      <div key={p.id} className="flex items-center justify-between p-4 border border-gray-100 rounded-xl">
                        <div className="flex items-center gap-4">
                          <img src={p.image_url} alt={p.name} className="w-16 h-16 object-cover rounded-md" />
                          <div>
                            <p className="font-bold text-sm text-[#3b234a]">{p.name}</p>
                            <p className="text-xs text-[#65586d]">Rs. {p.price} • {p.category}</p>
                            {p.sizes && p.sizes.length > 0 && (
                              <p className="text-[10px] text-[#f17a7e] mt-1 font-semibold tracking-wider">
                                SIZES: {p.sizes.join(', ')}
                              </p>
                            )}
                          </div>
                        </div>
                        <button onClick={() => handleDelete(p.id)} className="text-red-500 hover:bg-red-50 p-2 rounded-md transition-colors text-xs font-bold">
                          Delete
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-[#fdf3f5]">
            <h2 className="text-lg font-bold mb-6 flex items-center gap-2 text-[#3b234a]">
              <span className="w-2 h-2 bg-[#f17a7e] rounded-full"></span>
              Recent Orders
            </h2>
            
            {orders.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-[#65586d] mb-2">No orders have been placed yet.</p>
                <p className="text-sm text-[#f17a7e]">Once customers checkout, their orders will appear here.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-gray-100 text-[#65586d]">
                      <th className="pb-3 font-semibold">Order ID</th>
                      <th className="pb-3 font-semibold">Customer</th>
                      <th className="pb-3 font-semibold">Date</th>
                      <th className="pb-3 font-semibold">Total</th>
                      <th className="pb-3 font-semibold">Status</th>
                      <th className="pb-3 font-semibold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map(order => (
                      <tr key={order.id} className="border-b border-gray-50 last:border-0">
                        <td className="py-4 font-mono text-xs">{order.id.slice(0, 8)}</td>
                        <td className="py-4">
                          <p className="font-bold text-[#3b234a]">{order.customer_name}</p>
                          <p className="text-xs text-[#65586d]">{order.customer_phone}</p>
                        </td>
                        <td className="py-4 text-[#65586d]">{new Date(order.created_at).toLocaleDateString()}</td>
                        <td className="py-4 font-bold text-[#f17a7e]">Rs. {order.total_amount}</td>
                        <td className="py-4">
                          <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                            order.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                            order.status === 'Shipped' ? 'bg-blue-100 text-blue-700' :
                            order.status === 'Delivered' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                          }`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="py-4 text-right">
                          <select 
                            value={order.status}
                            onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                            className="bg-[#fcfcfb] border border-gray-200 text-xs rounded-md p-1 outline-none focus:border-[#f17a7e]"
                          >
                            <option value="Pending">Pending</option>
                            <option value="Shipped">Shipped</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}