'use client';
import { useState } from 'react';
import Image from 'next/image';
import CheckoutForm from './CheckoutForm';
import type { Product } from '@/lib/data';

type ProductDetailProps = {
  product: Product;
  onBack: () => void;
};

export default function ProductDetail({ product, onBack }: ProductDetailProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const scrollToCheckout = () => {
    const formElement = document.getElementById('one-page-checkout');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="px-4 mt-5 mb-14 animate-fadeIn">
      <button
        onClick={onBack}
        className="mb-4 cursor-pointer rounded-xl border border-gray-200 bg-white px-3.5 py-2 text-xs font-bold text-gray-700 shadow-sm transition hover:bg-gray-50 flex items-center gap-2"
      >
        ← Back to Home
      </button>

      <div className="space-y-6 rounded-3xl border border-rose-100/80 bg-white p-4 shadow-card md:p-8">
        <div>
          {/* ছবি ও গ্যালারি */}
          <div className="relative mb-3 h-72 overflow-hidden rounded-2xl border border-rose-100/60 bg-rose-50/40 shadow-inner md:h-80">
            <Image
              src={product.images[activeImageIndex]}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-cover transition-all duration-300"
            />
          </div>

          {product.images.length > 1 && (
            <div className="mb-4 flex justify-center gap-2">
              {product.images.map((img: string, idx: number) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveImageIndex(idx)}
                  aria-label={`View image ${idx + 1}`}
                  className={`relative h-14 w-14 cursor-pointer overflow-hidden rounded-xl border-2 transition ${
                    activeImageIndex === idx
                      ? 'border-rose-600 scale-105 shadow-md'
                      : 'border-gray-200 opacity-70 hover:opacity-100'
                  }`}
                >
                  <Image src={img} alt="" width={56} height={56} className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* অর্ডার শর্টকাট বাটন */}
          <div className="mb-6">
            <button
              onClick={scrollToCheckout}
              className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-rose-600 to-pink-600 py-4 text-sm font-black text-white shadow-soft transition transform hover:from-rose-700 hover:to-pink-700 active:scale-95"
            >
              🛒 অর্ডার করতে এখানে ক্লিক করুন (Order Now) 👇
            </button>
          </div>

          {/* ভিডিও প্রিভিউ */}
          {product.videoUrl && (
            <div className="mb-5 overflow-hidden rounded-2xl border border-rose-100 bg-black shadow-soft">
              <div className="flex items-center gap-1.5 bg-gradient-to-r from-rose-600 to-pink-600 px-3 py-1.5 text-[11px] font-bold text-white">
                <span>▶️</span> Product Live Video Preview
              </div>
              <video
                controls
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                className="h-64 w-full object-cover"
              >
                <source src={product.videoUrl} type="video/mp4" />
                আপনার ব্রাউজার ভিডিও ট্যাগ সাপোর্ট করছে না।
              </video>
            </div>
          )}

          {/* প্রডাক্টের ডিটেইলস ও স্পেসিফিকেশন টেবিল */}
          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-soft">
            <div className="flex items-center justify-between border-b border-gray-200 bg-gray-50 px-3 py-2.5 text-[11px] font-black uppercase tracking-wider text-gray-800">
              <span>⚡ Product Specifications</span>
              <span className="font-semibold text-rose-600">100% Original</span>
            </div>
            <div className="divide-y divide-gray-100 text-xs">
              {product.attributes.map((attr, idx) => (
                <div key={idx} className="grid grid-cols-2 px-3 py-2.5">
                  <span className="font-bold text-gray-500">{attr.label}</span>
                  <span className="font-medium text-gray-800">{attr.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* অর্ডার কনফার্মেশন ফর্ম */}
        <CheckoutForm product={product} onBackHome={onBack} />
      </div>
    </section>
  );
}
