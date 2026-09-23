'use client';
import { useState, useEffect } from 'react';

// ==========================================
// 💡 ব্যবসায়ীর বিশেষ নোটিশ (প্রয়োজনে পরিবর্তন করতে পারেন)
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
    // ৩টি ছবি অ্যারে হিসেবে দেওয়া হলো
    images: ["/parl.jpg", "/parl1.jpg", "/parl2.jpg"],
    badge: "বিশেষ অফার"
  },
  {
    id: 2,
    name: "ম্যাগনেটিক কাপল ব্রুসল্যাট সেট",
    basePrice: 599,
    originalPrice: "৳৭৯৯",
    images: ["/necklace.jpg"],
    badge: "ট্রেন্ডিং"
  },
];

export default function Home() {
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [quantity, setQuantity] = useState(1);
  const [deliveryArea, setDeliveryArea] = useState('inside');
  const [paymentMethod, setPaymentMethod] = useState('cod');
  
  const [selectedDistrict, setSelectedDistrict] = useState('হবিগঞ্জ');
  const [selectedThana, setSelectedThana] = useState('হবিগঞ্জ সদর');
  const [customerNote, setCustomerNote] = useState('');
  const [trxId, setTrxId] = useState('');
  
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  // লাভ পার্ল নেকলেসের মাল্টিপল ছবি পরিবর্তনের জন্য স্টেট
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <main className="min-h-screen bg-pink-50 p-4 md:p-12 relative font-sans">
      {/* Top Security & Trust Banner */}
      <div className="max-w-6xl mx-auto bg-gray-900 text-white text-xs py-2 px-4 rounded-xl mb-6 flex flex-wrap justify-between items-center gap-2 shadow-sm">
        <span className="flex items-center gap-1.5">🔒 ১০০% নিরাপদ ও ভেরিফাইড চেকআউট</span>
        <span className="flex items-center gap-1.5">🚚 স্টেডফাস্ট কুরিয়ার সার্ভিস যুক্ত</span>
        <span className="flex items-center gap-1.5">⚡ ফেক অর্ডার সুরক্ষিত</span>
      </div>

      {/* Top Header */}
      <div className="max-w-6xl mx-auto text-center mb-10">
        <h1 className="text-4xl font-extrabold text-pink-600 mb-2">Duo Corner (ডুও কর্নার)</h1>
        <p className="text-gray-600 text-lg">আপনার ভালোবাসার মানুষকে দিন বিশেষ কাপল কালেকশনের উপহার</p>
      </div>

      {/* Product Grid Section */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => {
          // প্রথম প্রোডাক্টের ক্ষেত্রে স্লাইডার বা ডিফল্ট প্রথম ছবি দেখানোর ব্যবস্থা
          const currentImg = product.images[0];

          return (
            <div key={product.id} className="bg-white rounded-2xl shadow-xl overflow-hidden border border-pink-100 p-4 flex flex-col justify-between">
              <div>
                <div className="h-52 rounded-xl overflow-hidden mb-4 bg-pink-100 relative">
                  <img 
                    src={currentImg} 
                    alt={product.name} 
                    className="w-full h-full object-cover"
                  />
                </div>

                <span className="bg-pink-500 text-white text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
                  {product.badge}
                </span>

                <h2 className="text-lg font-bold text-gray-800 mt-3 mb-2 line-clamp-2">
                  {product.name}
                </h2>
              </div>

              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xl font-extrabold text-pink-600">৳{product.basePrice}</span>
                  <span className="text-gray-400 line-through text-sm">{product.originalPrice}</span>
                </div>

                <button 
                  onClick={() => handleOpenModal(product)}
                  className="w-full bg-pink-600 hover:bg-pink-700 text-white font-bold py-2.5 rounded-xl transition duration-300 shadow-md text-sm cursor-pointer"
                >
                  অর্ডার করুন (Order Now)
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Advanced Enterprise Checkout Popup Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl relative border border-pink-100 my-8">
            <button 
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl font-bold w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 cursor-pointer"
            >
              &times;
            </button>

            {!isSubmitted ? (
              <div>
                {/* Product Image Preview in Modal with multi-image support */}
                {selectedProduct.images && selectedProduct.images.length > 1 ? (
                  <div className="mb-4">
                    <div className="h-48 rounded-xl overflow-hidden bg-pink-50 mb-2 border">
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
                          className={`w-14 h-14 rounded-lg overflow-hidden border-2 cursor-pointer ${activeImageIndex === idx ? 'border-pink-600 scale-105' : 'border-gray-200 opacity-70'}`}
                        >
                          <img src={img} alt="thumb" className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="h-40 rounded-xl overflow-hidden bg-pink-50 mb-4">
                    <img 
                      src={selectedProduct.images[0]} 
                      alt={selectedProduct.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-2xl font-bold text-gray-800">অর্ডার কনফার্ম করুন</h3>
                  <span className="text-[10px] bg-green-100 text-green-700 font-bold px-2 py-0.5 rounded-full">সিকিওর</span>
                </div>
                <p className="text-sm text-pink-600 font-semibold mb-4">{selectedProduct.name}</p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Quantity Selector */}
                  <div className="flex items-center justify-between bg-pink-50 p-3 rounded-xl">
                    <span className="text-sm font-medium text-gray-700">পরিমাণ (Quantity):</span>
                    <div className="flex items-center gap-3">
                      <button 
                        type="button"
                        onClick={() => setQuantity(q => Math.max(1, q - 1))}
                        className="w-8 h-8 bg-white rounded-lg shadow font-bold text-pink-600 hover:bg-pink-100 cursor-pointer"
                      >
                        -
                      </button>
                      <span className="font-bold text-lg text-gray-800">{quantity}</span>
                      <button 
                        type="button"
                        onClick={() => setQuantity(q => q + 1)}
                        className="w-8 h-8 bg-white rounded-lg shadow font-bold text-pink-600 hover:bg-pink-100 cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Delivery Location */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">ডেলিভারি এলাকা (Delivery Area)</label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setDeliveryArea('inside')}
                        className={`py-2 px-3 rounded-xl border text-sm font-medium transition cursor-pointer ${deliveryArea === 'inside' ? 'border-pink-600 bg-pink-50 text-pink-600' : 'border-gray-200 text-gray-600'}`}
                      >
                        ঢাকার ভেতরে (৳৭০)
                      </button>
                      <button
                        type="button"
                        onClick={() => setDeliveryArea('outside')}
                        className={`py-2 px-3 rounded-xl border text-sm font-medium transition cursor-pointer ${deliveryArea === 'outside' ? 'border-pink-600 bg-pink-50 text-pink-600' : 'border-gray-200 text-gray-600'}`}
                      >
                        ঢাকার বাইরে (৳১৩০)
                      </button>
                    </div>
                  </div>

                  {/* Customer Details */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">আপনার নাম (Full Name)</label>
                    <input 
                      type="text" 
                      required 
                      placeholder="আপনার সম্পূর্ণ নাম লিখুন"
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-500 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">ফোন নাম্বার (Phone Number)</label>
                    <input 
                      type="tel" 
                      required 
                      placeholder="01XXXXXXXXX"
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-500 text-sm"
                    />
                  </div>

                  {/* District & Thana Selection Dropdowns */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">জেলা (District)</label>
                      <select
                        value={selectedDistrict}
                        onChange={handleDistrictChange}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-500 text-sm bg-white cursor-pointer"
                      >
                        {Object.keys(bangladeshData).map((district) => (
                          <option key={district} value={district}>{district}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">থানা / উপজেলা (Thana)</label>
                      <select
                        value={selectedThana}
                        onChange={(e) => setSelectedThana(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-500 text-sm bg-white cursor-pointer"
                      >
                        {bangladeshData[selectedDistrict]?.map((thana) => (
                          <option key={thana} value={thana}>{thana}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">বাসা নং / রোড / এলাকা (Detailed Address)</label>
                    <input 
                      type="text" 
                      required 
                      placeholder="বাসা নং, রোড বা এলাকার নাম"
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-500 text-sm"
                    />
                  </div>

                  {/* Customer Note Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">কাস্টমার নোট / বিশেষ নির্দেশনা (Optional)</label>
                    <textarea 
                      rows={2}
                      value={customerNote}
                      onChange={(e) => setCustomerNote(e.target.value)}
                      placeholder="পণ্য বা ডেলিভারি সম্পর্কে কোনো বিশেষ কথা থাকলে এখানে লিখুন..."
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-500 text-sm resize-none"
                    ></textarea>
                  </div>

                  {/* Payment Method & Fraud Prevention Options */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">পেমেন্ট পদ্ধতি (Payment Method)</label>
                    <div className="grid grid-cols-2 gap-3 mb-3">
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('cod')}
                        className={`py-2 px-3 rounded-xl border text-sm font-medium transition cursor-pointer ${paymentMethod === 'cod' ? 'border-pink-600 bg-pink-50 text-pink-600' : 'border-gray-200 text-gray-600'}`}
                      >
                        ক্যাশ অন ডেলিভারি
                      </button>
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('bkash')}
                        className={`py-2 px-3 rounded-xl border text-sm font-medium transition cursor-pointer ${paymentMethod === 'bkash' ? 'border-pink-600 bg-pink-50 text-pink-600' : 'border-gray-200 text-gray-600'}`}
                      >
                        বিকাশ / নগদ
                      </button>
                    </div>

                    {paymentMethod === 'bkash' && (
                      <div className="bg-pink-50 p-3 rounded-xl border border-pink-200 animate-in fade-in duration-200">
                        <p className="text-xs text-pink-800 font-medium mb-1.5">আমাদের বিকাশ পার্সোনাল নম্বরে (`01XXXXXXXXX`) টাকা পাঠিয়ে ট্রানজেকশন আইডি দিন:</p>
                        <input 
                          type="text"
                          value={trxId}
                          onChange={(e) => setTrxId(e.target.value)}
                          placeholder="TrxID (যেমন: 9J74H3K2)"
                          className="w-full px-3 py-2 rounded-lg border border-pink-300 focus:outline-none text-xs bg-white font-bold uppercase"
                        />
                      </div>
                    )}
                  </div>

                  {/* Bill Summary */}
                  <div className="bg-gray-50 p-4 rounded-xl space-y-2 text-sm">
                    <div className="flex justify-between text-gray-600">
                      <span>প্রোডাক্ট মূল্য ({quantity} টি):</span>
                      <span>৳{productTotal}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>ডেলিভারি চার্জ:</span>
                      <span>৳{deliveryCharge}</span>
                    </div>
                    <div className="border-t pt-2 flex justify-between font-bold text-base text-pink-600">
                      <span>সর্বমোট প্রদেয় (Grand Total):</span>
                      <span>৳{grandTotal}</span>
                    </div>
                  </div>

                  {/* 💡 BUSINESS OWNER'S SPECIAL NOTE */}
                  <div className="bg-amber-100 border border-amber-300 p-4 rounded-xl text-xs font-bold text-amber-900 leading-relaxed shadow-sm">
                    {merchantSpecialNote}
                  </div>

                  <button 
                    type="submit"
                    className="w-full bg-pink-600 hover:bg-pink-700 text-white font-bold py-3 rounded-xl transition duration-300 shadow-lg text-base cursor-pointer"
                  >
                    অর্ডার কনফার্ম করুন (৳{grandTotal})
                  </button>
                </form>
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 text-green-500 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
                  ✓
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">অর্ডার সফলভাবে সম্পন্ন হয়েছে!</h3>
                <p className="text-gray-600 text-sm mb-2">আপনার অর্ডারটি আমাদের সিস্টেমে নিরাপদে রেকর্ড করা হয়েছে।</p>
                <p className="text-xs text-gray-400 mb-6">অর্ডার আইডি: #DUO-{Math.floor(1000 + Math.random() * 9000)}</p>
                <button 
                  onClick={() => setSelectedProduct(null)}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold px-6 py-2.5 rounded-xl transition duration-300 text-sm cursor-pointer"
                >
                  বন্ধ করুন
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  )
}