'use client';
import { useState, useTransition } from 'react';

const merchantSpecialNote = "⚠️ বিশেষ নির্দেশনা: প্রিয় গ্রাহক, আমাদের লভ্যাংশের কিছু অংশ অসহায় দুঃস্থ মানুষদের খাবারের জন্য ব্যয় করা হয়। বিনা প্রয়োজনে ফেক অর্ডার করবেন না। আপনার বিশ্বস্ততার জন্য ক্যাশ অন ডেলিভারিতে প্রোডাক্টটি পাঠানো হবে! ধন্যবাদ!";

const bangladeshData: { [key: string]: string[] } = {
  "Dhaka": ["Dhaka Sadar", "Gulshan", "Banani", "Dhanmondi", "Mirpur", "Uttara", "Savar", "Keraniganj"],
  "Habiganj": ["Habiganj Sadar", "Bahubal", "Chunarughat", "Madhabpur", "Nabiganj", "Ajmiriganj", "Baniachong", "Lakhai", "Shaistaganj"],
  "Sylhet": ["Sylhet Sadar", "Beanibazar", "Vishwanath", "Companiganj", "Fenchuganj", "Golapganj", "Gowainghat", "Jaintapur", "Kanaighat"],
  "Chittagong": ["Chittagong Sadar", "Pahartali", "Kotwali", "Chandgaon", "Double Mooring", "Hathazari", "Sitakunda"],
  "Barishal": ["Barishal Sadar", "Bakerganj", "Babuganj", "Wazirpur", "Mehendiganj", "Muladi", "Hizla"],
  "Rajshahi": ["Rajshahi Sadar", "Boalia", "Motihar", "Shah Makhdum", "Paba", "Tanore"],
  "Khulna": ["Khulna Sadar", "Sonadanga", "Khalishpur", "Daulatpur", "Khan Jahan Ali"],
};

const products = [
  {
    id: 1,
    name: "12 Rose Gift Box with Pearl Necklace, Earrings & Ring",
    shortName: "12 Rose Gift Box & Jewelry Set",
    basePrice: 849,
    originalPrice: "৳1049",
    images: ["/parl.jpg", "/parl1.jpg", "/parl2.jpg"],
    videoUrl: "/video.mp4", 
    badge: "🔥 20% OFF",
    saving: "Save ৳200",
    description: "The ultimate romantic gift combo including 12 artificial roses, a pearl necklace in a clam shell, earrings, and a finger ring inside a luxury gift box.",
    attributes: [
      { label: "Flower Type", value: "12 Roses (PE Foam)" },
      { label: "Material", value: "Metal + Foam & Paper Box" },
      { label: "Box Size", value: "18 x 4.5 x 13.2 cm" },
      { label: "Total Weight", value: "230g" },
      { label: "Includes", value: "Roses + Pearl Shell + Necklace + Earrings + Ring + Handbag" }
    ]
  },
  {
    id: 2,
    name: "Magnetic Couple Bracelet Set",
    shortName: "Magnetic Couple Bracelet",
    basePrice: 599,
    originalPrice: "৳799",
    images: ["/necklace.jpg"],
    videoUrl: "", 
    badge: "⚡ Trending",
    saving: "Save ৳200",
    description: "Matching distance bracelets with magnetic bells that attract each other when close.",
    attributes: [
      { label: "Material", value: "Magnetic Bell & Cord" },
      { label: "Style", value: "Matching Distance" },
      { label: "Quantity", value: "2x Bracelets (Set)" }
    ]
  },
];

export default function Home() {
  const [viewMode, setViewMode] = useState<'home' | 'detail'>('home');
  const [activeProduct, setActiveProduct] = useState<any>(null);
  
  const [quantity, setQuantity] = useState(1);
  const [deliveryArea, setDeliveryArea] = useState('inside');
  const [paymentMethod, setPaymentMethod] = useState('cod');
  
  const [selectedDistrict, setSelectedDistrict] = useState('Habiganj');
  const [selectedThana, setSelectedThana] = useState('Habiganj Sadar');
  
  const [formData, setFormData] = useState({ name: '', phone: '', address: '', note: '', trxId: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isPending, startTransition] = useTransition();

  const deliveryCharge = deliveryArea === 'inside' ? 70 : 130;
  const productTotal = activeProduct ? activeProduct.basePrice * quantity : 0;
  const grandTotal = productTotal + deliveryCharge;

  const handleOpenDetail = (product: any) => {
    setActiveProduct(product);
    setActiveImageIndex(0);
    setViewMode('detail');
    setIsSubmitted(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDirectOrder = (product: any) => {
    setActiveProduct(product);
    setActiveImageIndex(0);
    setViewMode('detail');
    setIsSubmitted(false);
    setTimeout(() => {
      const formElement = document.getElementById('one-page-checkout');
      if (formElement) {
        formElement.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const scrollToCheckout = () => {
    const formElement = document.getElementById('one-page-checkout');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleDistrictChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const district = e.target.value;
    setSelectedDistrict(district);
    setSelectedThana(bangladeshData[district]?.[0] || '');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^01[3-9]\d{8}$/.test(formData.phone)) {
      alert('দয়া করে সঠিক ১১ ডিজিটের মোবাইল নাম্বার দিন (যেমন: 01712345678)');
      return;
    }

    startTransition(async () => {
      try {
        const res = await fetch('/api/save-order', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...formData,
            thana: selectedThana,
            district: selectedDistrict,
            productName: activeProduct?.name,
            quantity,
            deliveryCharge,
            totalPrice: grandTotal,
            paymentMethod,
          }),
        });
        const data = await res.json();
        if (data.success) {
          setIsSubmitted(true);
          if (typeof window !== 'undefined' && (window as any).fbq) {
            (window as any).fbq('track', 'Purchase', { value: grandTotal, currency: 'BDT' });
          }
        } else {
          alert('অর্ডার সেভ করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।');
        }
      } catch (err) {
        alert('সার্ভার এরর!');
      }
    });
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-rose-50/60 via-pink-50/40 to-white pb-24 font-sans text-gray-900 max-w-md mx-auto md:max-w-4xl relative">
      {/* টপ প্রমোশনাল বার */}
      <div className="bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 text-white text-[11px] md:text-sm py-2 px-3 text-center font-bold shadow-md tracking-wide">
        🔥 সীমিত সময়ের মেগা অফার! ফ্রি গিফট বক্স ও ক্যাশ অন ডেলিভারি! 🎁
      </div>

      {/* হেডার */}
      <header className="px-4 pt-8 pb-6 text-center">
        <span onClick={() => setViewMode('home')} className="bg-pink-100 text-pink-700 text-xs font-black px-3.5 py-1 rounded-full uppercase tracking-widest border border-pink-200 mb-2 inline-block shadow-sm cursor-pointer hover:bg-pink-200 transition">
          ✨ Official Store
        </span>
        <h1 className="text-3xl md:text-5xl font-black text-gray-900 mb-1 tracking-tight cursor-pointer" onClick={() => setViewMode('home')}>
          Duo Corner
        </h1>
        <p className="text-gray-600 text-xs md:text-sm font-medium">
          Make your moments special with our exclusive couple collection
        </p>
      </header>

      {/* ১. হোম পেজ */}
      {viewMode === 'home' && (
        <section className="px-4 mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {products.map((product) => (
              <div key={product.id} className="bg-white rounded-3xl shadow-lg overflow-hidden border border-pink-100 p-4 md:p-6 flex flex-col justify-between relative">
                <span className="absolute top-4 right-4 z-10 bg-gradient-to-r from-pink-600 to-rose-600 text-white text-[10px] md:text-xs font-black px-3 py-1 rounded-full shadow uppercase">
                  {product.badge}
                </span>
                <div>
                  <div 
                    onClick={() => handleOpenDetail(product)}
                    className="h-56 md:h-64 rounded-2xl overflow-hidden mb-4 bg-pink-50 relative border cursor-pointer group shadow-inner"
                  >
                    <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                    <span className="absolute bottom-2 left-2 bg-black/70 backdrop-blur-md text-white text-[11px] font-bold px-2.5 py-0.5 rounded-md">
                      ✨ {product.saving}
                    </span>
                  </div>
                  <h3 
                    onClick={() => handleOpenDetail(product)}
                    className="text-base md:text-xl font-bold text-gray-900 mb-1.5 cursor-pointer hover:text-pink-600 transition"
                  >
                    {product.name}
                  </h3>
                  <p className="text-[11px] md:text-xs text-gray-500 mb-3 line-clamp-2">{product.description}</p>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-3 bg-pink-50 p-2.5 rounded-xl border border-pink-100">
                    <span className="text-2xl md:text-3xl font-black text-pink-600">{product.basePrice}</span>
                    <span className="text-gray-400 line-through text-sm font-semibold">{product.originalPrice}</span>
                    <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-0.5 rounded ml-auto">In Stock</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button 
                      onClick={() => handleOpenDetail(product)}
                      className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-3 rounded-xl text-xs cursor-pointer transition border border-gray-200"
                    >
                      👁️ Details
                    </button>
                    <button 
                      onClick={() => handleDirectOrder(product)}
                      className="w-full bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 text-white font-bold py-3 rounded-xl text-xs cursor-pointer shadow transition flex items-center justify-center gap-1"
                    >
                      🛒 Order Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ২. প্রোডাক্ট ডিটেইলস পেজ */}
      {viewMode === 'detail' && activeProduct && (
        <section className="px-4 mb-16 animate-fadeIn">
          <button 
            onClick={() => setViewMode('home')} 
            className="mb-4 bg-white border border-gray-300 px-3 py-2 rounded-xl text-xs font-bold shadow-sm hover:bg-gray-50 cursor-pointer flex items-center gap-2 transition"
          >
            ← Back to Home
          </button>

          <div className="bg-white rounded-3xl shadow-xl p-4 md:p-8 border border-pink-100 space-y-6">
            <div>
              {/* ছবি ও গ্যালারি */}
              <div className="h-72 md:h-80 rounded-2xl overflow-hidden bg-pink-50 mb-3 border border-pink-100 shadow-inner relative">
                <img src={activeProduct.images[activeImageIndex]} alt={activeProduct.name} className="w-full h-full object-cover transition-all duration-300" />
              </div>
              
              {activeProduct.images.length > 1 && (
                <div className="flex gap-2 justify-center mb-4">
                  {activeProduct.images.map((img: string, idx: number) => (
                    <button key={idx} type="button" onClick={() => setActiveImageIndex(idx)} className={`w-12 h-12 rounded-lg overflow-hidden border-2 cursor-pointer transition ${activeImageIndex === idx ? 'border-pink-600 scale-105 shadow' : 'border-gray-200 opacity-70'}`}>
                      <img src={img} alt="thumb" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              {/* অর্ডার শর্টকাট বাটন */}
              <div className="mb-6">
                <button 
                  onClick={scrollToCheckout}
                  className="w-full bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 text-white font-black py-4 rounded-2xl shadow-lg text-sm cursor-pointer transition transform active:scale-95 flex items-center justify-center gap-2"
                >
                  🛒 অর্ডার করতে এখানে ক্লিক করুন (Order Now) 👇
                </button>
              </div>

              {/* ভিডিও প্রিভিউ */}
              {activeProduct.videoUrl && (
                <div className="mb-5 bg-black rounded-2xl overflow-hidden border border-pink-200 shadow-md">
                  <div className="bg-pink-600 text-white text-[11px] font-bold px-3 py-1.5 flex items-center gap-1.5">
                    <span>▶️</span> Product Live Video Preview
                  </div>
                  <video 
                    controls 
                    autoPlay 
                    muted 
                    loop 
                    playsInline
                    className="w-full h-64 object-cover"
                  >
                    <source src={activeProduct.videoUrl} type="video/mp4" />
                    আপনার ব্রাউজার ভিডিও ট্যাগ সাপোর্ট করছে না।
                  </video>
                </div>
              )}

              {/* প্রডাক্টের ডিটেইলস ও স্পেসিফিকেশন টেবিল */}
              <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
                <div className="bg-gray-100 px-3 py-2 font-bold text-gray-800 text-[11px] border-b border-gray-200 uppercase flex items-center justify-between">
                  <span>⚡ Product Specifications</span>
                  <span className="text-pink-600 font-semibold">100% Original</span>
                </div>
                <div className="divide-y divide-gray-200 text-xs">
                  {activeProduct.attributes.map((attr: any, idx: number) => (
                    <div key={idx} className="grid grid-cols-2 px-3 py-2">
                      <span className="font-bold text-gray-500">{attr.label}</span>
                      <span className="text-gray-800 font-medium">{attr.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* অর্ডার কনফার্মেশন ফর্ম */}
            <div id="one-page-checkout" className="bg-pink-50/50 p-4 md:p-6 rounded-3xl border border-pink-200">
              <h2 className="text-xl font-black text-gray-900 mb-1">{activeProduct.name}</h2>
              <p className="text-[11px] text-gray-500 mb-3">{activeProduct.description}</p>
              
              <div className="flex items-center gap-3 mb-4 bg-white p-3 rounded-2xl border border-pink-100 shadow-sm">
                <span className="text-2xl font-black text-pink-600">{activeProduct.basePrice}</span>
                <span className="text-gray-400 line-through text-sm font-semibold">{activeProduct.originalPrice}</span>
                <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-0.5 rounded ml-auto">COD Available</span>
              </div>

              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-3">
                  <div className="flex items-center justify-between bg-white p-2.5 rounded-xl border border-pink-100">
                    <span className="text-xs font-bold text-gray-700">Quantity (পরিমাণ):</span>
                    <div className="flex items-center gap-2">
                      <button type="button" onClick={() => setQuantity(q => Math.max(1, q - 1))} className="w-7 h-7 bg-gray-100 rounded-lg font-bold text-pink-600 cursor-pointer border border-pink-200">-</button>
                      <span className="font-bold text-sm text-gray-800">{quantity}</span>
                      <button type="button" onClick={() => setQuantity(q => q + 1)} className="w-7 h-7 bg-gray-100 rounded-lg font-bold text-pink-600 cursor-pointer border border-pink-200">+</button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-gray-700 mb-1">Delivery Area (এলাকা)</label>
                    <div className="grid grid-cols-2 gap-2">
                      <button type="button" onClick={() => setDeliveryArea('inside')} className={`py-2 px-2 rounded-xl border text-[11px] font-bold cursor-pointer transition ${deliveryArea === 'inside' ? 'border-pink-600 bg-white text-pink-600 shadow-sm' : 'border-gray-200 bg-white/50 text-gray-600'}`}>Inside Dhaka (৳70)</button>
                      <button type="button" onClick={() => setDeliveryArea('outside')} className={`py-2 px-2 rounded-xl border text-[11px] font-bold cursor-pointer transition ${deliveryArea === 'outside' ? 'border-pink-600 bg-white text-pink-600 shadow-sm' : 'border-gray-200 bg-white/50 text-gray-600'}`}>Outside Dhaka (৳130)</button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-gray-700 mb-1">Full Name (আপনার নাম)</label>
                    <input type="text" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="Write your full name" className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs font-bold bg-white focus:ring-2 focus:ring-pink-500 focus:outline-none" />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-gray-700 mb-1">Phone Number (১১ ডিজিট)</label>
                    <input type="tel" required maxLength={11} value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value.replace(/\D/g, '')})} placeholder="01712345678" className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs font-bold bg-white focus:ring-2 focus:ring-pink-500 focus:outline-none" />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[11px] font-bold text-gray-700 mb-1">District (জেলা)</label>
                      <select value={selectedDistrict} onChange={handleDistrictChange} className="w-full px-2 py-2 rounded-xl border border-gray-300 text-xs font-bold cursor-pointer bg-white">
                        {Object.keys(bangladeshData).map(d => <option key={d} value={d}>{d}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-gray-700 mb-1">Thana (থানা)</label>
                      <select value={selectedThana} onChange={e => setSelectedThana(e.target.value)} className="w-full px-2 py-2 rounded-xl border border-gray-300 text-xs font-bold cursor-pointer bg-white">
                        {bangladeshData[selectedDistrict]?.map(t => <option key={t} value={t}>{t}</option>)}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-gray-700 mb-1">Detailed Address (ঠিকানা)</label>
                    <input type="text" required value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} placeholder="House no, Road, Area" className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs font-bold bg-white focus:ring-2 focus:ring-pink-500 focus:outline-none" />
                  </div>

                  <div className="bg-white p-3 rounded-xl space-y-1 text-xs border border-pink-100 shadow-sm">
                    <div className="flex justify-between text-gray-600"><span>Product Price:</span><span>{productTotal}</span></div>
                    <div className="flex justify-between text-gray-600"><span>Delivery Charge:</span><span>৳{deliveryCharge}</span></div>
                    <div className="border-t pt-1 flex justify-between font-extrabold text-sm text-pink-600"><span>Grand Total:</span><span>{grandTotal}</span></div>
                  </div>

                  <div className="bg-amber-50 border border-amber-200 p-2.5 rounded-xl text-[10px] font-bold text-amber-900 leading-relaxed">
                    {merchantSpecialNote}
                  </div>

                  <button type="submit" disabled={isPending} className="w-full bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 text-white font-bold py-3.5 rounded-2xl transition shadow-lg text-xs cursor-pointer transform active:scale-95 flex items-center justify-center gap-1">
                    {isPending ? 'Processing...' : `✅ CONFIRM ORDER (${grandTotal})`}
                  </button>
                </form>
              ) : (
                <div className="text-center py-10">
                  <div className="w-14 h-14 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-2xl mx-auto mb-2 shadow-inner">✓</div>
                  <h3 className="text-lg font-bold text-gray-800 mb-1">Order Placed Successfully!</h3>
                  <p className="text-gray-600 text-[11px] mb-4">আপনার অর্ডারটি আমাদের অ্যাডমিন প্যানেলে জমা হয়েছে।</p>
                  <button onClick={() => setViewMode('home')} className="bg-pink-600 text-white text-xs font-bold px-5 py-2.5 rounded-xl cursor-pointer shadow hover:bg-pink-700 transition">Back to Home</button>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* WhatsApp লাইভ চ্যাট বাটন */}
      <a 
        href="https://wa.me/8801777156691?text=Hi%20Duo%20Corner,%20I%20want%20to%20know%20more%20about%20your%20products." 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white p-3.5 rounded-full shadow-2xl flex items-center justify-center transition transform hover:scale-110 active:scale-95"
        title="Chat on WhatsApp"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" viewBox="0 0 16 16">
          <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.068 7.925c0 1.399.366 2.76 1.057 3.965L0 16l4.223-1.107a7.85 7.85 0 0 0 3.772.96h.004c4.363 0 7.926-3.558 7.926-7.93 0-2.11-.822-4.102-2.324-5.607zM7.994 14.521c-1.17 0-2.315-.315-3.314-.912l-.238-.142-2.477.65.66-2.414-.155-.246A6.36 6.36 0 0 1 1.558 7.925c0-3.548 2.891-6.439 6.436-6.439 1.72 0 3.336.67 4.553 1.889a6.36 6.36 0 0 1 1.888 4.55c0 3.549-2.891 6.436-6.441 6.436v-.002zm3.504-4.814c-.192-.096-1.137-.562-1.313-.626-.176-.064-.304-.096-.432.096-.128.192-.496.626-.608.754-.112.128-.224.144-.416.048-.192-.096-.811-.299-1.547-.954-.573-.512-.961-1.143-1.073-1.335-.112-.192-.012-.296.084-.392.087-.087.192-.224.288-.336.096-.112.128-.192.192-.32.064-.128.032-.24-.016-.336-.048-.096-.432-1.04-.592-1.424-.156-.376-.315-.325-.432-.331l-.369-.007c-.128 0-.336.048-.512.24-.176.192-.672.656-.672 1.6 0 .944.688 1.856.784 1.984.096.128 1.356 2.072 3.287 2.903.46.198.819.317 1.101.405.462.147.883.126 1.214.077.371-.055 1.137-.464 1.297-.912.16-.448.16-.832.112-.912-.048-.08-.176-.128-.368-.224z"/>
        </svg>
      </a>
    </main>
  );
}