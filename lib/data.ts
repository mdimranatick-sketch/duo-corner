export type ProductAttribute = { label: string; value: string };

export type Product = {
  id: number;
  name: string;
  shortName: string;
  basePrice: number;
  originalPrice: string;
  images: string[];
  videoUrl: string;
  badge: string;
  saving: string;
  description: string;
  attributes: ProductAttribute[];
};

export const merchantSpecialNote =
  "⚠️ বিশেষ নির্দেশনা:  প্রিয় গ্রাহক, আপনি জেনেছেন আমাদের লভ্যাংশের টাকা দিয়ে অসহায় দুঃস্থ মানুষদের খাবারের ব্যবস্থা করা হবে , আপনিও আমাদের সেই মহৎ কাজের সঙ্গী হতে চলেছেন🥀 ❌বিনা প্রয়োজনে ফেইক অর্ডার করে এক টাকারও ক্ষতি করলে সেটা লভ্যাংশ থেকে কমে যাবে এবং সেই দায় আপনার উপরে থাকবে, ✅আপনার বিশ্বস্ততার জন্য সম্পূর্ণ ক্যাশ অন ডেলিভারিতে প্রোডাক্টটি পাঠানো হবে! ধন্যবাদ,";

export const bangladeshData: { [key: string]: string[] } = {
  "Dhaka": ["Dhaka Sadar", "Gulshan", "Banani", "Dhanmondi", "Mirpur", "Uttara", "Savar", "Keraniganj"],
  "Habiganj": ["Habiganj Sadar", "Bahubal", "Chunarughat", "Madhabpur", "Nabiganj", "Ajmiriganj", "Baniachong", "Lakhai", "Shaistaganj"],
  "Sylhet": ["Sylhet Sadar", "Beanibazar", "Vishwanath", "Companiganj", "Fenchuganj", "Golapganj", "Gowainghat", "Jaintapur", "Kanaighat"],
  "Chittagong": ["Chittagong Sadar", "Pahartali", "Kotwali", "Chandgaon", "Double Mooring", "Hathazari", "Sitakunda"],
  "Barishal": ["Barishal Sadar", "Bakerganj", "Babuganj", "Wazirpur", "Mehendiganj", "Muladi", "Hizla"],
  "Rajshahi": ["Rajshahi Sadar", "Boalia", "Motihar", "Shah Makhdum", "Paba", "Tanore"],
  "Khulna": ["Khulna Sadar", "Sonadanga", "Khalishpur", "Daulatpur", "Khan Jahan Ali"],
};

export const products: Product[] = [
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

export const taka = (amount: number) => `৳${amount}`;

export const whatsappLink = "https://wa.me/8801777156691";

export const whatsappChatLink =
  "https://wa.me/8801777156691?text=Hi%20Duo%20Corner,%20I%20want%20to%20know%20more%20about%20your%20products.";
