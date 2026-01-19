import { products } from "../data/product";
import ProductCard from "../components/ProductCard";
import Skeleton from "../components/Skeleton";

export default function Home({ search }) {
  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6 bg-gray-300 dark:bg-gray-900 min-h-screen">
      <div className="grid gap-6 bg-gray-200 dark:bg-gray-900 md:grid-cols-3">
        {filtered.length === 0
          ? <Skeleton />
          : filtered.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
      </div>
    </div>
  );
}
