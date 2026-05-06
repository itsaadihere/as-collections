"use client";
import { useState } from "react";
import { useCart } from "@/app/context/CartContext";
import { createOrder } from "@/app/lib/supabase";
import Link from "next/link";

export default function CheckoutPage() {
  const { cartItems, cartTotal, removeFromCart, updateQuantity, clearCart } = useCart();
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', address: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cartItems.length === 0) return alert("Your cart is empty");
    
    setLoading(true);
    const orderData = {
      customer_name: formData.name,
      customer_email: formData.email,
      customer_phone: formData.phone,
      customer_address: formData.address,
      total_amount: cartTotal,
      status: 'Pending',
      items: cartItems
    };

    const res = await createOrder(orderData);
    if (res.error) {
      alert("Failed to place order. " + res.error);
    } else {
      setSuccess(true);
      clearCart();
    }
    setLoading(false);
  };

  if (success) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center min-h-[60vh] text-center p-6">
        <h1 className="text-4xl font-bold text-[#3b234a] italic mb-4">Order Placed Successfully!</h1>
        <p className="text-[#65586d] mb-8">Thank you for shopping with A.S Collection. Your order is being processed.</p>
        <Link href="/shop" className="bg-[#f17a7e] text-white px-8 py-3 rounded-full font-bold hover:opacity-90">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="flex-1 max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-2 gap-12">
      <div>
        <h2 className="text-3xl font-bold text-[#3b234a] italic mb-6">Your Cart</h2>
        {cartItems.length === 0 ? (
          <p className="text-[#65586d]">Your cart is empty.</p>
        ) : (
          <div className="space-y-4">
            {cartItems.map(item => (
              <div key={item.id} className="flex gap-4 items-center bg-white p-4 rounded-xl shadow-sm border border-[#fdf3f5]">
                <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-md" />
                <div className="flex-1">
                  <h3 className="font-bold text-[#3b234a]">{item.name}</h3>
                  <p className="text-[#f17a7e] font-bold">Rs. {item.price}</p>
                </div>
                <div className="flex items-center gap-3">
                  <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="bg-gray-100 w-8 h-8 rounded-full font-bold hover:bg-gray-200 transition-colors">-</button>
                  <span className="font-bold text-[#3b234a] w-4 text-center">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="bg-gray-100 w-8 h-8 rounded-full font-bold hover:bg-gray-200 transition-colors">+</button>
                </div>
                <button onClick={() => removeFromCart(item.id)} className="text-red-400 hover:text-red-600 p-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
                </button>
              </div>
            ))}
            <div className="text-right text-xl font-bold text-[#3b234a] pt-4 border-t border-gray-100">
              Total: Rs. {cartTotal}
            </div>
          </div>
        )}
      </div>

      <div className="bg-white p-8 rounded-3xl shadow-sm border border-[#fdf3f5] h-fit sticky top-24">
        <h2 className="text-2xl font-bold text-[#3b234a] italic mb-6 flex items-center gap-2">
          <span className="w-2 h-2 bg-[#f17a7e] rounded-full"></span>
          Checkout Details
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input required type="text" placeholder="Full Name *" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-[#fcfcfb] p-3 rounded-xl border border-gray-200 outline-none focus:border-[#f17a7e] text-sm text-[#3b234a]" />
          <input required type="email" placeholder="Email Address *" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full bg-[#fcfcfb] p-3 rounded-xl border border-gray-200 outline-none focus:border-[#f17a7e] text-sm text-[#3b234a]" />
          <input required type="tel" placeholder="Phone Number *" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full bg-[#fcfcfb] p-3 rounded-xl border border-gray-200 outline-none focus:border-[#f17a7e] text-sm text-[#3b234a]" />
          <textarea required placeholder="Complete Delivery Address *" rows={3} value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} className="w-full bg-[#fcfcfb] p-3 rounded-xl border border-gray-200 outline-none focus:border-[#f17a7e] text-sm text-[#3b234a]" />
          
          <div className="bg-orange-50 p-4 rounded-xl border border-orange-100 my-4">
            <p className="text-xs text-orange-800 font-semibold flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 8v4"/><path d="M12 16h.01"/></svg>
              Payment Method: Cash on Delivery (COD) only.
            </p>
          </div>

          <button type="submit" disabled={loading || cartItems.length === 0} className="w-full bg-[#f17a7e] text-white py-4 rounded-xl font-bold tracking-wider hover:opacity-90 transition-opacity disabled:opacity-50">
            {loading ? 'PLACING ORDER...' : 'PLACE ORDER'}
          </button>
        </form>
      </div>
    </div>
  );
}
