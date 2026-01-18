import { products } from "../data/product";
import ProductCard from "../components/ProductCard";
import Skeleton from "../components/Skeleton";

export default function Home({ search }) {
  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="grid gap-6 md:grid-cols-3">
        {filtered.length === 0
          ? <Skeleton />
          : filtered.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
      </div>
    </div>
  );
}
