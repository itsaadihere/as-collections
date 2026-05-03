export default function ProductGrid({ products, title, subtitle, linkText, linkHref }: { products: any[], title?: string, subtitle?: string, linkText?: string, linkHref?: string }) {
  return (
    <section className="bg-white py-20 relative z-20">
      <div className="max-w-7xl mx-auto px-6">
        
        {(title || subtitle) && (
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              {title && <h2 className="text-3xl font-bold text-[#3b234a] italic mb-2">{title}</h2>}
              {subtitle && <p className="text-[#65586d]">{subtitle}</p>}
            </div>
            {linkText && linkHref && (
              <a href={linkHref} className="text-[#f17a7e] font-semibold mt-4 md:mt-0 hover:underline">
                {linkText} &rarr;
              </a>
            )}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product.id} className="group cursor-pointer">
              <div className="relative bg-[#fffbf9] rounded-lg overflow-hidden aspect-[4/5] mb-4">
                {product.tag && (
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-[#3b234a] text-xs font-bold px-2 py-1 rounded shadow-sm z-10">
                    {product.tag}
                  </div>
                )}
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* Quick Add Overlay */}
                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-4">
                  <button className="bg-white text-[#3b234a] text-sm font-bold px-6 py-2 rounded-full shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform hover:bg-[#f17a7e] hover:text-white">
                    Add to Cart
                  </button>
                </div>
              </div>
              <h3 className="text-[#3b234a] font-semibold text-sm mb-1">{product.name}</h3>
              <p className="text-[#f17a7e] font-bold">Rs. {product.price}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
