'use client';
import { useState } from 'react';

// ==========================================
// 💡 ব্যবসায়ীর বিশেষ নোটিশ ও কনফিগারেশন
// ==========================================
const merchantSpecialNote = "⚠️ বিশেষ নির্দেশনা: পার্সেল হাতে পেয়ে ডেলিভারি ম্যানের সামনে চেক করে নিন। কোনো সমস্যা হলে সাথে সাথে আমাদের কল করুন।";

// বাংলাদেশের জেলা ও থানার তালিকা
const bangladeshData: { [key: string]: string[] } = {
  "ঢাকা": ["ঢাকা সদর", "গুলশান", "বনানী", "ধানমন্ডি", "মিরপুর", "উত্তরা", "সাভার", "কেরানীগঞ্জ"],
  "হবিগঞ্জ": ["হবিগঞ্জ সদর", "বাহুবল", "চুনারুঘাট", "মাধবপুর", "নবীগঞ্জ", "আজমিরীগঞ্জ", "বানিয়াচং", "লাখাই", "শায়েস্তাগঞ্জ"],
  "সিলেট": ["সিলেট সদর", "বিয়ানীবাজার", "বিশ্বনাথ", "কোম্পানীগঞ্জ", "ফেঞ্চুগঞ্জ", "গোলাপগঞ্জ", "গোয়াইনঘাট", "জৈন্তাপুর", "কানাইঘাট"],
  "চট্টগ্রাম": ["চট্টগ্রাম সদর", "পাহাড়তলী", "কোতোয়ালী", "চান্দগাঁও", "ডবলমুরিং", "হাটহাজারী", "সীতাকুণ্ড"],
  "বরিশাল": ["বরিশাল সদর", "বাকেরগঞ্জ", "বাবুগঞ্জ", "উজিরপুর", "মেহেন্দিগঞ্জ", "মুলাদী", "হিজলা"],
  "রাজশাহী": ["রাজশাহী সদর", "বোয়ালিয়া", "মতিহার", "শাহ মখদুম", "পবা", "তানোর"],
  "খুলনা": ["খুলনা সদর", "সোনাডাঙ্গা", "খালিশপুর", "দৌলতপুর", "খান জাহান আলী"],
};

const products = [
  {
    id: 1,
    name: "লাভ পার্ল নেকলেস উইথ গিফট বক্স",
    basePrice: 849,
    originalPrice: "৳১০৪৯",
    images: ["/parl.jpg", "/parl1.jpg", "/parl2.jpg"],
    badge: "🔥 ২০% ছাড়",
    saving: "২০০ টাকা সাশ্রয়"
  },
  {
    id: 2,
    name: "ম্যাগনেটিক কাপল ব্রুসল্যাট সেট",
    basePrice: 599,
    originalPrice: "৳৭৯৯",
    images: ["/necklace.jpg"],
    badge: "⚡ ট্রেন্ডিং ডিল",
    saving: "২০০ টাকা সাশ্রয়"
  },
];

export default function Home() {
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [quantity, setQuantity] = useState(1);
  const [deliveryArea, setDeliveryArea] = useState('inside');
  const [paymentMethod, setPaymentMethod] = useState('cod');
  
  const [selectedDistrict, setSelectedDistrict] = useState('হবিগঞ্জ');
  const [selectedThana, setSelectedThana] = useState('হবিগঞ্জ সদর');
  
  // ফর্ম ইনপুট স্টেটসমূহ
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [customerNote, setCustomerNote] = useState('');
  const [trxId, setTrxId] = useState('');
  
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const deliveryCharge = deliveryArea === 'inside' ? 70 : 130;
  const productTotal = selectedProduct ? selectedProduct.basePrice * quantity : 0;
  const grandTotal = productTotal + deliveryCharge;

  const handleOpenModal = (product: any) => {
    setSelectedProduct(product);
    setQuantity(1);
    setDeliveryArea('inside');
    setPaymentMethod('cod');
    setSelectedDistrict('হবিগঞ্জ');
    setSelectedThana('হবিগঞ্জ সদর');
    setCustomerName('');
    setCustomerPhone('');
    setCustomerAddress('');
    setCustomerNote('');
    setTrxId('');
    setIsSubmitted(false);
    setActiveImageIndex(0);
  };

  const handleDistrictChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const district = e.target.value;
    setSelectedDistrict(district);
    if (bangladeshData[district] && bangladeshData[district].length > 0) {
      setSelectedThana(bangladeshData[district][0]);
    } else {
      setSelectedThana('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const phoneRegex = /^01[3-9]\d{8}$/;
    if (!phoneRegex.test(customerPhone)) {
      alert('দয়া করে সঠিক ১১ ডিজিটের বাংলাদেশি মোবাইল নাম্বার দিন (যেমন: 01712345678)');
      return;
    }

    try {
      const orderData = {
        name: customerName,
        phone: customerPhone,
        address: customerAddress,
        thana: selectedThana,
        district: selectedDistrict,
        productName: selectedProduct?.name,
        quantity: quantity,
        deliveryCharge: deliveryCharge,
        totalPrice: grandTotal,
        paymentMethod: paymentMethod,
        trxId: trxId,
        note: customerNote,
        timestamp: new Date().toISOString()
      };

      const res = await fetch('/api/save-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      });
      
      const data = await res.json();
      if (data.success) {
        setIsSubmitted(true);
      } else {
        alert('অর্ডার সেভ করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।');
      }
    } catch (err) {
      alert('সার্ভার এরর!');
    }
  };

  return (
    <main className="min-h-screen bg-pink-50/50 pb-16 font-sans text-gray-900">
      
      {/* ১. সবার উপরের টপ প্রমোশনাল অফার বার */}
      <div className="bg-gradient-to-r from-pink-600 to-rose-600 text-white text-xs md:text-sm py-2 px-4 text-center font-bold shadow-md">
        🔥 সীমিত সময়ের মেগা অফার! ফ্রি গিফট বক্স ও ক্যাশ অন ডেলিভারি সুবিধা! 🎁
      </div>

      {/* ২. ডুও কর্নার ব্র্যান্ড ব্যানার ও হেডার */}
      <header className="max-w-4xl mx-auto px-4 pt-10 pb-6 text-center">
        <div className="inline-block bg-pink-100 text-pink-700 text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-widest border border-pink-200 mb-3 shadow-sm">
          ✨ Official Store
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-2 tracking-tight">
          Duo Corner <span className="text-pink-600">(ডুও কর্নার)</span>
        </h1>
        <p className="text-gray-600 text-sm md:text-base font-medium max-w-lg mx-auto">
          আপনার ভালোবাসার মানুষকে দিন সেরা কাপল কালেকশনের প্রিমিয়াম উপহার
        </p>
      </header>

      {/* ৩. প্রোডাক্ট দুটি পাশাপাশি/গ্রিড আকারে এবং কর্নারে সুন্দর অফার উপস্থাপন */}
      <section className="max-w-5xl mx-auto px-4 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-3xl shadow-xl overflow-hidden border border-pink-100 p-6 flex flex-col justify-between relative hover:shadow-2xl transition duration-300">
              
              {/* কর্নারে আকর্ষণীয় অফার ব্যাজ */}
              <div className="absolute top-6 right-6 z-10 bg-gradient-to-r from-pink-600 to-rose-600 text-white text-xs font-black px-3.5 py-1.5 rounded-full shadow-lg uppercase tracking-wide">
                {product.badge}
              </div>

              <div>
                <div className="h-60 rounded-2xl overflow-hidden mb-5 bg-pink-50 relative border">
                  <img 
                    src={product.images[0]} 
                    alt={product.name} 
                    className="w-full h-full object-cover hover:scale-105 transition duration-500"
                  />
                  <span className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-lg">
                    ✨ {product.saving}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {product.name}
                </h3>
              </div>

              <div>
                <div className="flex items-center gap-3 mb-5 bg-pink-50/60 p-3 rounded-2xl border border-pink-100">
                  <span className="text-3xl font-black text-pink-600">৳{product.basePrice}</span>
                  <span className="text-gray-400 line-through text-base font-semibold">{product.originalPrice}</span>
                  <span className="bg-green-100 text-green-700 text-xs font-bold px-2.5 py-1 rounded-lg ml-auto">ইন স্টক</span>
                </div>

                <button 
                  onClick={() => handleOpenModal(product)}
                  className="w-full bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 text-white font-bold py-3.5 rounded-2xl transition duration-300 shadow-lg text-base cursor-pointer flex items-center justify-center gap-2"
                >
                  🛒 অর্ডার করুন (Order Now)
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ৪. চেকআউট পপআপ মোডাল (অর্ডার ফর্ম) */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 md:p-8 shadow-2xl relative border border-pink-100 my-8">
            <button 
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl font-bold w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 cursor-pointer shadow-sm transition"
            >
              &times;
            </button>

            {!isSubmitted ? (
              <div>
                {/* Product Image Preview in Modal */}
                {selectedProduct.images && selectedProduct.images.length > 1 ? (
                  <div className="mb-4">
                    <div className="h-48 rounded-2xl overflow-hidden bg-pink-50 mb-2 border border-pink-100 shadow-inner">
                      <img 
                        src={selectedProduct.images[activeImageIndex]} 
                        alt={selectedProduct.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex gap-2 justify-center">
                      {selectedProduct.images.map((img: string, idx: number) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setActiveImageIndex(idx)}
                          className={`w-12 h-12 rounded-xl overflow-hidden border-2 cursor-pointer transition ${activeImageIndex === idx ? 'border-pink-600 scale-105 shadow-md' : 'border-gray-200 opacity-70'}`}
                        >
                          <img src={img} alt="thumb" className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="h-40 rounded-2xl overflow-hidden bg-pink-50 mb-4 shadow-inner">
                    <img 
                      src={selectedProduct.images[0]} 
                      alt={selectedProduct.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-2xl font-bold text-gray-900">অর্ডার কনফার্ম করুন</h3>
                  <span className="text-[11px] bg-green-100 text-green-700 font-bold px-2.5 py-0.5 rounded-full">🔐 সিকিওর চেকআউট</span>
                </div>
                <p className="text-sm text-pink-600 font-bold mb-5">{selectedProduct.name}</p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Quantity Selector */}
                  <div className="flex items-center justify-between bg-pink-50 p-3.5 rounded-2xl border border-pink-100">
                    <span className="text-sm font-bold text-gray-700">পরিমাণ (Quantity):</span>
                    <div className="flex items-center gap-3">
                      <button 
                        type="button"
                        onClick={() => setQuantity(q => Math.max(1, q - 1))}
                        className="w-9 h-9 bg-white rounded-xl shadow-sm font-bold text-pink-600 hover:bg-pink-100 cursor-pointer flex items-center justify-center border border-pink-200"
                      >
                        -
                      </button>
                      <span className="font-bold text-lg text-gray-800">{quantity}</span>
                      <button 
                        type="button"
                        onClick={() => setQuantity(q => q + 1)}
                        className="w-9 h-9 bg-white rounded-xl shadow-sm font-bold text-pink-600 hover:bg-pink-100 cursor-pointer flex items-center justify-center border border-pink-200"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Delivery Location */}
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1.5">ডেলিভারি এলাকা (Delivery Area)</label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setDeliveryArea('inside')}
                        className={`py-2.5 px-3 rounded-xl border text-sm font-bold transition cursor-pointer ${deliveryArea === 'inside' ? 'border-pink-600 bg-pink-50 text-pink-600 shadow-sm' : 'border-gray-200 text-gray-600 bg-white'}`}
                      >
                        ঢাকার ভেতরে (৳৭০)
                      </button>
                      <button
                        type="button"
                        onClick={() => setDeliveryArea('outside')}
                        className={`py-2.5 px-3 rounded-xl border text-sm font-bold transition cursor-pointer ${deliveryArea === 'outside' ? 'border-pink-600 bg-pink-50 text-pink-600 shadow-sm' : 'border-gray-200 text-gray-600 bg-white'}`}
                      >
                        ঢাকার বাইরে (৳১৩০)
                      </button>
                    </div>
                  </div>

                  {/* Customer Details */}
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1.5">আপনার নাম (Full Name)</label>
                    <input 
                      type="text" 
                      required 
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="আপনার সম্পূর্ণ নাম লিখুন"
                      style={{ color: '#000000', backgroundColor: '#ffffff', opacity: 1 }}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500 text-sm font-bold shadow-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1.5">ফোন নাম্বার (Phone Number - 11 Digits)</label>
                    <input 
                      type="tel" 
                      required 
                      maxLength={11}
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value.replace(/\D/g, ''))}
                      placeholder="01712345678"
                      style={{ color: '#000000', backgroundColor: '#ffffff', opacity: 1 }}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500 text-sm font-bold shadow-sm"
                    />
                    <p className="text-[11px] text-gray-500 mt-1">অবশ্যই ১১ ডিজিটের সঠিক মোবাইল নাম্বার দিতে হবে</p>
                  </div>

                  {/* District & Thana Selection Dropdowns */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-1.5">জেলা (District)</label>
                      <select
                        value={selectedDistrict}
                        onChange={handleDistrictChange}
                        style={{ color: '#000000', backgroundColor: '#ffffff', opacity: 1 }}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500 text-sm font-bold cursor-pointer shadow-sm"
                      >
                        {Object.keys(bangladeshData).map((district) => (
                          <option key={district} value={district}>{district}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-1.5">থানা / উপজেলা (Thana)</label>
                      <select
                        value={selectedThana}
                        onChange={(e) => setSelectedThana(e.target.value)}
                        style={{ color: '#000000', backgroundColor: '#ffffff', opacity: 1 }}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500 text-sm font-bold cursor-pointer shadow-sm"
                      >
                        {bangladeshData[selectedDistrict]?.map((thana) => (
                          <option key={thana} value={thana}>{thana}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1.5">বাসা নং / রোড / এলাকা (Detailed Address)</label>
                    <input 
                      type="text" 
                      required 
                      value={customerAddress}
                      onChange={(e) => setCustomerAddress(e.target.value)}
                      placeholder="বাসা নং, রোড বা এলাকার নাম"
                      style={{ color: '#000000', backgroundColor: '#ffffff', opacity: 1 }}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500 text-sm font-bold shadow-sm"
                    />
                  </div>

                  {/* Customer Note Field */}
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1.5">কাস্টমার নোট / বিশেষ নির্দেশনা (Optional)</label>
                    <textarea 
                      rows={2}
                      value={customerNote}
                      onChange={(e) => setCustomerNote(e.target.value)}
                      placeholder="পণ্য বা ডেলিভারি সম্পর্কে কোনো বিশেষ কথা থাকলে এখানে লিখুন..."
                      style={{ color: '#000000', backgroundColor: '#ffffff', opacity: 1 }}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500 text-sm font-bold resize-none shadow-sm"
                    ></textarea>
                  </div>

                  {/* Payment Method Options */}
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1.5">পেমেন্ট পদ্ধতি (Payment Method)</label>
                    <div className="grid grid-cols-2 gap-3 mb-3">
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('cod')}
                        className={`py-2.5 px-3 rounded-xl border text-sm font-bold transition cursor-pointer ${paymentMethod === 'cod' ? 'border-pink-600 bg-pink-50 text-pink-600 shadow-sm' : 'border-gray-200 text-gray-600 bg-white'}`}
                      >
                        ক্যাশ অন ডেলিভারি
                      </button>
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('bkash')}
                        className={`py-2.5 px-3 rounded-xl border text-sm font-bold transition cursor-pointer ${paymentMethod === 'bkash' ? 'border-pink-600 bg-pink-50 text-pink-600 shadow-sm' : 'border-gray-200 text-gray-600 bg-white'}`}
                      >
                        বিকাশ / নগদ পেমেন্ট
                      </button>
                    </div>

                    {paymentMethod === 'bkash' && (
                      <div className="bg-pink-50 p-3.5 rounded-2xl border border-pink-200 animate-in fade-in duration-200 shadow-inner">
                        <p className="text-xs text-pink-900 font-bold mb-2">আমাদের বিকাশ পার্সোনাল নম্বরে টাকা পাঠিয়ে ট্রানজেকশন আইডি দিন:</p>
                        <input 
                          type="text"
                          value={trxId}
                          onChange={(e) => setTrxId(e.target.value)}
                          placeholder="TrxID (যেমন: 9J74H3K2)"
                          style={{ color: '#000000', backgroundColor: '#ffffff', opacity: 1 }}
                          className="w-full px-3 py-2.5 rounded-xl border border-pink-300 focus:outline-none text-xs font-bold uppercase shadow-sm"
                        />
                      </div>
                    )}
                  </div>

                  {/* Bill Summary */}
                  <div className="bg-gray-50 p-4 rounded-2xl space-y-2 text-sm border border-gray-200 shadow-inner">
                    <div className="flex justify-between text-gray-600 font-medium">
                      <span>প্রোডাক্ট মূল্য ({quantity} টি):</span>
                      <span>৳{productTotal}</span>
                    </div>
                    <div className="flex justify-between text-gray-600 font-medium">
                      <span>ডেলিভারি চার্জ:</span>
                      <span>৳{deliveryCharge}</span>
                    </div>
                    <div className="border-t border-gray-200 pt-2 flex justify-between font-extrabold text-base text-pink-600">
                      <span>সর্বমোট প্রদেয় (Grand Total):</span>
                      <span>৳{grandTotal}</span>
                    </div>
                  </div>

                  {/* 💡 BUSINESS OWNER'S SPECIAL NOTE */}
                  <div className="bg-amber-100 border border-amber-300 p-4 rounded-2xl text-xs font-bold text-amber-900 leading-relaxed shadow-sm">
                    {merchantSpecialNote}
                  </div>

                  <button 
                    type="submit"
                    className="w-full bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 text-white font-bold py-3.5 rounded-2xl transition duration-300 shadow-xl text-base cursor-pointer flex items-center justify-center gap-2"
                  >
                    ✅ অর্ডার কনফার্ম করুন (৳{grandTotal})
                  </button>
                </form>
              </div>
            ) : (
              <div className="text-center py-10">
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-4xl mx-auto mb-4 shadow-inner">
                  ✓
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">অর্ডার সফলভাবে সম্পন্ন হয়েছে!</h3>
                <p className="text-gray-600 text-sm mb-2">আপনার অর্ডারটি আমাদের সিস্টেমে নিরাপদে রেকর্ড করা হয়েছে।</p>
                <p className="text-xs text-gray-400 mb-6 font-mono">অর্ডার আইডি: #DUO-{Math.floor(1000 + Math.random() * 9000)}</p>
                <button 
                  onClick={() => setSelectedProduct(null)}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold px-8 py-3 rounded-xl transition duration-300 text-sm cursor-pointer shadow-sm"
                >
                  বন্ধ করুন
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  );
}