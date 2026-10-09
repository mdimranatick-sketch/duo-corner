import Image from "next/image";
import { products, taka, type Product } from "@/lib/data";

type ProductGridProps = {
  onDetails: (product: Product) => void;
  onOrder: (product: Product) => void;
};

export default function ProductGrid({ onDetails, onOrder }: ProductGridProps) {
  return (
    <section className="px-4 mt-6 mb-14">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {products.map((product) => (
          <article
            key={product.id}
            className="relative flex flex-col justify-between overflow-hidden rounded-3xl border border-rose-100/80 bg-white p-4 shadow-soft transition duration-300 hover:-translate-y-1 hover:shadow-lift md:p-6"
          >
            <span className="absolute top-6 right-6 z-10 rounded-full bg-gradient-to-r from-rose-600 to-pink-600 px-3 py-1 text-[10px] font-black uppercase text-white shadow-md md:text-xs">
              {product.badge}
            </span>

            <div>
              <div
                onClick={() => onDetails(product)}
                className="group relative mb-4 h-56 cursor-pointer overflow-hidden rounded-2xl border border-rose-100/60 bg-rose-50/40 shadow-inner md:h-64"
              >
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
                <span className="absolute bottom-2 left-2 z-10 rounded-lg bg-gray-900/70 px-2.5 py-0.5 text-[11px] font-bold text-white backdrop-blur-md">
                  ✨ {product.saving}
                </span>
              </div>

              <h3
                onClick={() => onDetails(product)}
                className="mb-1.5 cursor-pointer text-base font-semibold leading-snug text-gray-900 transition hover:text-rose-600 md:text-xl"
              >
                {product.name}
              </h3>
              <p className="mb-3 line-clamp-2 text-[11px] leading-relaxed text-gray-500 md:text-xs">
                {product.description}
              </p>
            </div>

            <div>
              <div className="mb-3 flex items-center gap-2 rounded-xl border border-rose-100/80 bg-rose-50/50 p-2.5">
                <span className="text-2xl font-black text-rose-600 md:text-3xl">
                  {taka(product.basePrice)}
                </span>
                <span className="text-sm font-semibold text-gray-400 line-through">
                  {product.originalPrice}
                </span>
                <span className="ml-auto rounded-md border border-emerald-100 bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700">
                  In Stock
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => onDetails(product)}
                  className="w-full cursor-pointer rounded-xl border border-gray-200 bg-white py-3 text-xs font-bold text-gray-700 transition hover:border-gray-300 hover:bg-gray-50"
                >
                  👁️ Details
                </button>
                <button
                  onClick={() => onOrder(product)}
                  className="flex w-full cursor-pointer items-center justify-center gap-1 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 py-3 text-xs font-bold text-white shadow-soft transition hover:from-rose-700 hover:to-pink-700 active:scale-95"
                >
                  🛒 Order Now
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
