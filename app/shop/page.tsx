import ProductGrid from "@/components/ProductGrid";
import { getProducts } from "@/app/lib/supabase";

export const revalidate = 0;

export default async function ShopPage(props: { searchParams?: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const searchParams = props.searchParams ? await props.searchParams : {};
  const category = typeof searchParams.category === 'string' ? searchParams.category : undefined;
  const search = typeof searchParams.search === 'string' ? searchParams.search : undefined;
  const products = await getProducts(category, search);
  
  let title = "All Products";
  if (search) title = `Search Results for "${search}"`;
  else if (category) title = `${category.charAt(0).toUpperCase() + category.slice(1)} Products`;

  return (
    <div className="flex-1 bg-white pt-10">
      <div className="max-w-7xl mx-auto px-6 mb-8 text-center">
        <h1 className="text-4xl font-bold text-[#3b234a] italic mb-4">{title}</h1>
        <p className="text-[#65586d] max-w-xl mx-auto">Browse our complete collection of baby essentials, fashion, and nursery items.</p>
      </div>
      <ProductGrid products={products.map(p => ({ ...p, image: p.image_url }))} />
    </div>
  );
}
