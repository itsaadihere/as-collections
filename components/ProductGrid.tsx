"use client";
import { useCart } from "@/app/context/CartContext";

export default function ProductGrid({ products, title, subtitle, linkText, linkHref }: { products: any[], title?: string, subtitle?: string, linkText?: string, linkHref?: string }) {
  const { addToCart } = useCart();

  const handleAddToCart = (product: any, e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image_url || product.image,
      quantity: 1
    });
    alert(`${product.name} added to cart!`);
  };

  return (
    <section className="bg-transparent pb-20">
      <div className="max-w-7xl mx-auto px-6">
        
        {(title || subtitle) && (
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-[#e5e0d8] pb-6">
            <div>
              {title && <h2 className="font-serif text-3xl md:text-4xl text-[#4a4238] mb-3">{title}</h2>}
              {subtitle && <p className="text-[12px] text-[#8c8273] tracking-wide">{subtitle}</p>}
            </div>
            {linkText && linkHref && (
              <a href={linkHref} className="text-[9px] font-bold text-[#8c8273] tracking-[0.2em] uppercase hover:text-[#4a4238] mt-4 md:mt-0 transition-colors">
                {linkText}
              </a>
            )}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {products.map((product) => (
            <div key={product.id} className="group cursor-pointer">
              <div className="relative bg-[#f5f5f5] overflow-hidden aspect-[3/4] mb-5">
                <img 
                  src={product.image_url || product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
                />
                {/* Quick Add Overlay */}
                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-8">
                  <button onClick={(e) => handleAddToCart(product, e)} className="bg-white text-[#4a4238] text-[10px] uppercase tracking-[0.2em] font-bold px-10 py-3.5 shadow-sm transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 hover:bg-[#4a4238] hover:text-white">
                    Add to Cart
                  </button>
                </div>
              </div>
              <p className="text-[9px] text-[#8c8273] uppercase tracking-[0.2em] mb-2">{product.category || 'Collection'}</p>
              <h3 className="font-serif text-[19px] text-[#4a4238] leading-tight mb-2">{product.name}</h3>
              <p className="text-[#4a4238] text-[13px] font-medium tracking-wide">Rs. {product.price}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
