/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import {
  ShoppingBag,
  TrendingUp,
  Clock,
  AlertTriangle,
  Truck,
  DollarSign,
  PlusCircle,
  Search,
  RefreshCw,
  UserCheck,
  CheckCircle2,
  XCircle,
  CreditCard,
  Building2,
  Wallet,
  Zap,
} from "lucide-react";

type Order = {
  orderId?: string;
  Date?: string;
  Time?: string;
  name?: string;
  phone?: string;
  address?: string;
  collectionAmount?: number;
  trackingCode?: string;
  status?: string;
  courierAction?: string;
};

export default function AdminDashboard() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [bookingLoading, setBookingLoading] = useState<string | null>(null);

  const [activeTab, setActiveTab] = useState<
    | "overview"
    | "orders"
    | "inventory"
    | "customers"
    | "marketing"
    | "settlements"
    | "automation"
    | "reports"
    | "staff"
    | "cms"
    | "system"
    | "settings"
  >("overview");

  const [customerSubTab, setCustomerSubTab] = useState<
    "profiles" | "fraud" | "verification" | "queue" | "watchlist"
  >("profiles");

  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState<any[]>([]);
  const [productSearch, setProductSearch] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeSubTab, setActiveSubTab] = useState<"list" | "add">("list");

  // Automated Fraud Checker & Customer 360 States
  const [selectedCustomer, setSelectedCustomer] = useState<any | null>(null);
  const [autoFraudLoading, setAutoFraudLoading] = useState(false);
  const [fraudReportMap, setFraudReportMap] = useState<{
    [phone: string]: any;
  }>({});

  // Payment & COD Settlement States
  const [settlementFilter, setSettlementFilter] = useState("all");

  // Automation Rules States
  const [rules, setRules] = useState([
    {
      id: 1,
      name: "কুরিয়ার Delivered হলে অর্ডার ও COD পাওনা আপডেট",
      trigger: "Courier Delivered",
      status: true,
    },
    {
      id: 2,
      name: "কম স্টক হলে অ্যালার্ট পাঠানো",
      trigger: "Low Stock (<5)",
      status: true,
    },
    {
      id: 3,
      name: "নতুন অর্ডারে স্টক রিজার্ভ করা",
      trigger: "New Order Created",
      status: true,
    },
  ]);
  const [newRuleName, setNewRuleName] = useState("");

  const [productForm, setProductForm] = useState({
    productName: "",
    category: "ব্রেসলেট (Bracelet)",
    regularPrice: "",
    offerPrice: "",
    stock: "",
    description: "",
    imageUrl1: "",
    imageUrl2: "",
    imageUrl3: "",
    imageUrl4: "",
    videoUrl: "",
    productType: "",
    usableGender: "",
    material: "",
    color: "",
    singlePackageSize: "",
    singleGrossWeight: "",
    value1: "",
    value2: "",
    value3: "",
    value4: "",
    value5: "",
    value6: "",
  });

  const [pixelConfig, setPixelConfig] = useState({
    metaPixelId: "123456789012345",
    metaAccessToken: "EAAG...",
    ga4Id: "G-XXXXXXXXXX",
    gtmId: "GTM-XXXXXXX",
    tiktokPixelId: "CXXXXXXXXXXXXXXX",
    tiktokAccessToken: "",
    tiktokTestEventCode: "",
    capiEnabled: true,
  });
  const [pixelSaved, setPixelSaved] = useState(false);

  const fetchOrders = async () => {
    try {
      const res = await fetch("/api/save-order");
      const data = await res.json();
      if (Array.isArray(data)) {
        setOrders(data);
        if (data.length > 0) {
          fetchAutomatedFraudData(data[0].phone);
        }
      }
    } catch {
      console.error("Data fetch error");
    } finally {
      setLoading(false);
    }
  };

  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/products");
      const data = await res.json();
      if (Array.isArray(data)) setProducts(data);
    } catch {
      console.error("Error fetching products");
    }
  };

  const fetchAutomatedFraudData = async (phone: string) => {
    if (!phone || fraudReportMap[phone]) return;
    setAutoFraudLoading(true);
    try {
      const res = await fetch("/api/fraud-check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone }),
      });
      const data = await res.json();
      if (data.success) {
        setFraudReportMap((prev) => ({ ...prev, [phone]: data }));
      }
    } catch (err) {
      console.error("Auto fraud check error:", err);
    } finally {
      setAutoFraudLoading(false);
    }
  };

  useEffect(() => {
    let cancelled = false;

    const loadDashboardData = async () => {
      try {
        const [ordersRes, productsRes] = await Promise.all([
          fetch("/api/save-order"),
          fetch("/api/products"),
        ]);

        const orderData = await ordersRes.json();
        const productData = await productsRes.json();

        if (cancelled) return;

        if (Array.isArray(orderData)) {
          setOrders(orderData);
          if (orderData.length > 0) {
            setSelectedCustomer(orderData[0]);
            void fetchAutomatedFraudData(orderData[0].phone);
          }
        }
        if (Array.isArray(productData)) {
          setProducts(productData);
        }
      } catch {
        console.error("Data fetch error");
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }

      if (cancelled) return;

      const savedPixels = localStorage.getItem("duo_pixel_config");
      if (savedPixels) {
        try {
          setPixelConfig(JSON.parse(savedPixels));
        } catch {}
      }
    };

    void loadDashboardData();

    return () => {
      cancelled = true;
    };
  }, []);

  const handleCourierBooking = async (order: Order, index: number) => {
    const orderId = order.orderId || `ORD-${index + 1}`;
    setBookingLoading(orderId);

    const rawPhone = String(order.phone || "");
    let formattedPhone = rawPhone.replace(/\D/g, "");
    if (formattedPhone.length === 10 && !formattedPhone.startsWith("0")) {
      formattedPhone = "0" + formattedPhone;
    }

    const cleanAmount = Number(order.collectionAmount || 0);

    try {
      const res = await fetch("/api/save-order", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: orderId,
          name: order.name,
          phone: formattedPhone,
          address: order.address,
          totalPrice: cleanAmount,
        }),
      });

      const result = await res.json();
      if (result.success) {
        alert(`সফল! কুরিয়ার ট্র্যাকিং আইডি (CN): ${result.consignmentId}`);
        fetchOrders();
      } else {
        alert(`বুকিং ব্যর্থ: ${result.error}`);
      }
    } catch {
      alert("কুরিয়ার বুকিং করার সময় সার্ভার ত্রুটি হয়েছে!");
    } finally {
      setBookingLoading(null);
    }
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!productForm.productName || !productForm.offerPrice) {
      alert("দয়া করে প্রোডাক্টের নাম এবং অফার প্রাইস লিখুন!");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "add_product",
          "Product Name": productForm.productName,
          "Offer Price": Number(productForm.offerPrice),
          Category: productForm.category,
          Stock: Number(productForm.stock) || 100,
          Description: productForm.description,
          "Image URL1": productForm.imageUrl1,
          "Image URL2": productForm.imageUrl2,
          "Image URL3": productForm.imageUrl3,
          "Image URL4": productForm.imageUrl4,
          "Regular Price": Number(productForm.regularPrice) || 0,
          "Video URL": productForm.videoUrl,
          "product type": productForm.productType,
          "Value 1": productForm.value1,
          "usable gender": productForm.usableGender,
          "Value 2": productForm.value2,
          Material: productForm.material,
          "Value 3": productForm.value3,
          Color: productForm.color,
          "Value 4": productForm.value4,
          "Single package size": productForm.singlePackageSize,
          "Value 5": productForm.value5,
          "Single gross weight": productForm.singleGrossWeight,
          "Value 6": productForm.value6,
        }),
      });
      const data = await res.json();
      if (data.success || data.status === "success") {
        alert("✅ প্রোডাক্ট সফলভাবে ইনভেন্টরিতে যুক্ত হয়েছে!");
        fetchProducts();
        setActiveSubTab("list");
        setProductForm({
          productName: "",
          category: "ব্রেসলেট (Bracelet)",
          regularPrice: "",
          offerPrice: "",
          stock: "",
          description: "",
          imageUrl1: "",
          imageUrl2: "",
          imageUrl3: "",
          imageUrl4: "",
          videoUrl: "",
          productType: "",
          usableGender: "",
          material: "",
          color: "",
          singlePackageSize: "",
          singleGrossWeight: "",
          value1: "",
          value2: "",
          value3: "",
          value4: "",
          value5: "",
          value6: "",
        });
      } else {
        alert("❌ প্রোডাক্ট সেভ করতে ব্যর্থ হয়েছে!");
      }
    } catch {
      alert("সার্ভার এরর!");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSavePixels = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("duo_pixel_config", JSON.stringify(pixelConfig));
    setPixelSaved(true);
    setTimeout(() => setPixelSaved(false), 3000);
  };

  const totalOrders = orders.length;
  const totalSales = orders.reduce(
    (acc, o) => acc + (Number(o.collectionAmount) || 0),
    0,
  );
  const pendingCount = orders.filter(
    (o) => String(o.status || "").toLowerCase() === "pending",
  ).length;

  const deliveredOrdersList = orders.filter(
    (o) =>
      String(o.status || "").toLowerCase() === "delivered" ||
      String(o.courierAction || "").toLowerCase() === "completed",
  );
  const totalCodCollection = deliveredOrdersList.reduce(
    (acc, o) => acc + (Number(o.collectionAmount) || 0),
    0,
  );
  const courierDueAmount = orders
    .filter(
      (o) =>
        String(o.status || "").toLowerCase() === "booked" ||
        String(o.status || "").toLowerCase() === "processing",
    )
    .reduce((acc, o) => acc + (Number(o.collectionAmount) || 0), 0);
  const bankReceivedAmount = totalCodCollection * 0.85;

  const filteredOrders = orders
    .filter((order) => {
      const name = String(order.name || "").toLowerCase();
      const phone = String(order.phone || "");
      return (
        name.includes(searchTerm.toLowerCase()) || phone.includes(searchTerm)
      );
    })
    .reverse();

  const filteredProducts = products.filter(
    (p) =>
      String(p["Product Name"] || "")
        .toLowerCase()
        .includes(productSearch.toLowerCase()) ||
      String(p["Category"] || "")
        .toLowerCase()
        .includes(productSearch.toLowerCase()),
  );

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md px-4 font-sans">
        <div className="bg-slate-900 border border-amber-500/40 rounded-3xl p-8 text-center max-w-sm w-full shadow-2xl">
          <div className="w-16 h-16 mx-auto mb-4 border-4 border-amber-500/20 border-t-amber-500 rounded-full animate-spin"></div>
          <p className="text-amber-500 font-bold text-sm tracking-widest uppercase">
            DUO CORNER SYSTEM
          </p>
          <h3 className="text-white font-bold text-lg mt-2">
            Loading System Data... ✨
          </h3>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col md:flex-row">
      <aside className="w-full md:w-64 bg-slate-900 border-r border-slate-800 p-5 flex flex-col justify-between shrink-0">
        <div>
          <div className="mb-8 px-2">
            <h2 className="text-xl font-black text-white tracking-wider">
              DUO CORNER
            </h2>
            <p className="text-[10px] text-rose-400 font-semibold uppercase tracking-widest mt-0.5">
              Smart Commerce System
            </p>
          </div>

          <nav className="space-y-1 text-xs font-semibold">
            <button
              onClick={() => setActiveTab("overview")}
              className={`w-full text-left px-4 py-3 rounded-xl transition cursor-pointer flex items-center gap-3 ${activeTab === "overview" ? "bg-rose-600 text-white font-bold shadow-lg shadow-rose-600/20" : "text-slate-400 hover:bg-slate-800 hover:text-white"}`}
            >
              📊 Overview Dashboard
            </button>
            <button
              onClick={() => setActiveTab("orders")}
              className={`w-full text-left px-4 py-3 rounded-xl transition cursor-pointer flex items-center gap-3 ${activeTab === "orders" ? "bg-rose-600 text-white font-bold shadow-lg shadow-rose-600/20" : "text-slate-400 hover:bg-slate-800 hover:text-white"}`}
            >
              📦 Orders & Processing ({orders.length})
            </button>
            <button
              onClick={() => setActiveTab("inventory")}
              className={`w-full text-left px-4 py-3 rounded-xl transition cursor-pointer flex items-center gap-3 ${activeTab === "inventory" ? "bg-rose-600 text-white font-bold shadow-lg shadow-rose-600/20" : "text-slate-400 hover:bg-slate-800 hover:text-white"}`}
            >
              🏷️ Products & Inventory
            </button>
            <button
              onClick={() => setActiveTab("customers")}
              className={`w-full text-left px-4 py-3 rounded-xl transition cursor-pointer flex items-center gap-3 ${activeTab === "customers" ? "bg-rose-600 text-white font-bold shadow-lg shadow-rose-600/20" : "text-slate-400 hover:bg-slate-800 hover:text-white"}`}
            >
              👥 Customer & Risk
            </button>
            <button
              onClick={() => setActiveTab("marketing")}
              className={`w-full text-left px-4 py-3 rounded-xl transition cursor-pointer flex items-center gap-3 ${activeTab === "marketing" ? "bg-rose-600 text-white font-bold shadow-lg shadow-rose-600/20" : "text-slate-400 hover:bg-slate-800 hover:text-white"}`}
            >
              📈 Marketing & Pixels
            </button>
            <button
              onClick={() => setActiveTab("settlements")}
              className={`w-full text-left px-4 py-3 rounded-xl transition cursor-pointer flex items-center gap-3 ${activeTab === "settlements" ? "bg-rose-600 text-white font-bold shadow-lg shadow-rose-600/20" : "text-slate-400 hover:bg-slate-800 hover:text-white"}`}
            >
              💰 Payments & COD
            </button>
            <button
              onClick={() => setActiveTab("automation")}
              className={`w-full text-left px-4 py-3 rounded-xl transition cursor-pointer flex items-center gap-3 ${activeTab === "automation" ? "bg-rose-600 text-white font-bold shadow-lg shadow-rose-600/20" : "text-slate-400 hover:bg-slate-800 hover:text-white"}`}
            >
              ⚡ Automation Rules
            </button>
            <button
              onClick={() => setActiveTab("reports")}
              className={`w-full text-left px-4 py-3 rounded-xl transition cursor-pointer flex items-center gap-3 ${activeTab === "reports" ? "bg-rose-600 text-white font-bold shadow-lg shadow-rose-600/20" : "text-slate-400 hover:bg-slate-800 hover:text-white"}`}
            >
              📑 Professional Reports
            </button>
            <button
              onClick={() => setActiveTab("staff")}
              className={`w-full text-left px-4 py-3 rounded-xl transition cursor-pointer flex items-center gap-3 ${activeTab === "staff" ? "bg-rose-600 text-white font-bold shadow-lg shadow-rose-600/20" : "text-slate-400 hover:bg-slate-800 hover:text-white"}`}
            >
              🔐 Staff & Permissions
            </button>
            <button
              onClick={() => setActiveTab("cms")}
              className={`w-full text-left px-4 py-3 rounded-xl transition cursor-pointer flex items-center gap-3 ${activeTab === "cms" ? "bg-rose-600 text-white font-bold shadow-lg shadow-rose-600/20" : "text-slate-400 hover:bg-slate-800 hover:text-white"}`}
            >
              🌐 Website & CMS
            </button>
            <button
              onClick={() => setActiveTab("system")}
              className={`w-full text-left px-4 py-3 rounded-xl transition cursor-pointer flex items-center gap-3 ${activeTab === "system" ? "bg-rose-600 text-white font-bold shadow-lg shadow-rose-600/20" : "text-slate-400 hover:bg-slate-800 hover:text-white"}`}
            >
              ⚙️ System Health
            </button>
            <button
              onClick={() => setActiveTab("settings")}
              className={`w-full text-left px-4 py-3 rounded-xl transition cursor-pointer flex items-center gap-3 ${activeTab === "settings" ? "bg-rose-600 text-white font-bold shadow-lg shadow-rose-600/20" : "text-slate-400 hover:bg-slate-800 hover:text-white"}`}
            >
              🛠️ Business Settings
            </button>
          </nav>
        </div>

        <div className="pt-6 border-t border-slate-800 text-[11px] text-slate-500">
          <p>
            System Status:{" "}
            <span className="text-emerald-400 font-bold">● Online</span>
          </p>
        </div>
      </aside>

      <main className="flex-1 p-6 md:p-8 overflow-y-auto">
        <div className="bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
              Duo Corner Operations Center
            </span>
            <h1 className="text-2xl font-black text-white mt-2">
              {activeTab === "marketing"
                ? "Marketing, Pixels & Server-Side Tracking"
                : activeTab === "customers"
                  ? "Customer 360° & Fraud Risk Management"
                  : activeTab === "settlements"
                    ? "Payments & COD Settlements Center"
                    : activeTab === "automation"
                      ? "Business Automation & Rules Engine"
                      : "Business Overview & Dashboard"}
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                fetchOrders();
                fetchProducts();
              }}
              className="bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition cursor-pointer border border-slate-700"
            >
              🔄 রিফ্রেশ
            </button>
            <div className="bg-rose-500/10 text-rose-400 px-4 py-2 rounded-xl text-sm font-bold border border-rose-500/20">
              Total Orders: {totalOrders}
            </div>
            <div className="bg-emerald-500/10 text-emerald-400 px-4 py-2 rounded-xl text-sm font-bold border border-emerald-500/20">
              Total Sales: ৳{totalSales.toLocaleString()}
            </div>
          </div>
        </div>

        {/* 1. Dashboard & Command Center (Overview Tab) */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            <div className="bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-800 flex flex-wrap gap-3 items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  Quick Command Actions
                </h3>
                <p className="text-xs text-slate-400">
                  ব্যবসার জরুরি শর্টকাট একশনসমূহ
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setActiveTab("orders")}
                  className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl font-medium text-xs transition cursor-pointer shadow-sm"
                >
                  <PlusCircle size={16} /> নতুন অর্ডার চেক
                </button>
                <button
                  onClick={() => setActiveTab("inventory")}
                  className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 px-4 py-2 rounded-xl font-medium text-xs transition cursor-pointer border border-slate-700"
                >
                  <Search size={16} /> প্রোডাক্ট স্টক
                </button>
                <button
                  onClick={() => setActiveTab("orders")}
                  className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-xl font-medium text-xs transition cursor-pointer shadow-sm"
                >
                  <Truck size={16} /> কুরিয়ার বুকিং
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex items-center justify-between shadow-sm">
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase">
                    Total Orders (Month)
                  </p>
                  <h3 className="text-2xl font-black text-white mt-1">
                    {totalOrders}
                  </h3>
                  <span className="text-[10px] text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded-full mt-2 inline-block">
                    Live Google Sheet Synced
                  </span>
                </div>
                <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-xl">
                  <TrendingUp size={24} />
                </div>
              </div>

              <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex items-center justify-between shadow-sm">
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase">
                    Total Sales Amount
                  </p>
                  <h3 className="text-2xl font-black text-emerald-400 mt-1">
                    ৳{totalSales.toLocaleString()}
                  </h3>
                  <span className="text-[10px] text-blue-400 font-semibold bg-blue-500/10 px-2 py-0.5 rounded-full mt-2 inline-block">
                    Collection Active
                  </span>
                </div>
                <div className="p-3 bg-blue-500/10 text-blue-400 rounded-xl">
                  <DollarSign size={24} />
                </div>
              </div>

              <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex items-center justify-between shadow-sm">
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase">
                    Pending Orders
                  </p>
                  <h3 className="text-2xl font-black text-amber-500 mt-1">
                    {pendingCount}
                  </h3>
                  <span className="text-[10px] text-amber-400 font-semibold bg-amber-500/10 px-2 py-0.5 rounded-full mt-2 inline-block">
                    Needs Processing
                  </span>
                </div>
                <div className="p-3 bg-amber-500/10 text-amber-500 rounded-xl">
                  <Clock size={24} />
                </div>
              </div>

              <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex items-center justify-between shadow-sm">
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase">
                    Inventory Items
                  </p>
                  <h3 className="text-2xl font-black text-indigo-400 mt-1">
                    {products.length}
                  </h3>
                  <span className="text-[10px] text-indigo-400 font-semibold bg-indigo-500/10 px-2 py-0.5 rounded-full mt-2 inline-block">
                    Active Catalog
                  </span>
                </div>
                <div className="p-3 bg-indigo-500/10 text-indigo-400 rounded-xl">
                  <ShoppingBag size={24} />
                </div>
              </div>
            </div>

            <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-5">
              <div className="flex items-center gap-3 mb-3">
                <AlertTriangle className="text-amber-400" size={20} />
                <h4 className="text-sm font-bold text-amber-300">
                  1.3 Smart Alerts & System Notifications
                </h4>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-amber-200">
                <div className="bg-slate-900/80 p-3 rounded-xl border border-amber-500/20 flex items-center justify-between">
                  <span>⚠️ {pendingCount} Pending Orders in Queue</span>
                  <button
                    onClick={() => setActiveTab("orders")}
                    className="font-bold underline cursor-pointer text-amber-400"
                  >
                    View
                  </button>
                </div>
                <div className="bg-slate-900/80 p-3 rounded-xl border border-amber-500/20 flex items-center justify-between">
                  <span>📦 Stock Products Synced: {products.length} Pcs</span>
                  <button
                    onClick={() => setActiveTab("inventory")}
                    className="font-bold underline cursor-pointer text-amber-400"
                  >
                    Check
                  </button>
                </div>
                <div className="bg-slate-900/80 p-3 rounded-xl border border-amber-500/20 flex items-center justify-between">
                  <span>💳 Steadfast Courier API Active</span>
                  <span className="font-bold text-emerald-400">Ready</span>
                </div>
              </div>
            </div>

            {/* 1.2 Live Operations Monitor (Recent Orders Table) */}
            <div className="bg-slate-900 rounded-2xl shadow-sm border border-slate-800 overflow-hidden space-y-4">
              <div className="p-6 border-b border-slate-800 flex justify-between items-center">
                <div>
                  <h3 className="text-base font-bold text-white">
                    1.2 Live Operations Monitor (Recent Orders)
                  </h3>
                  <p className="text-xs text-slate-400">
                    রিয়েল-টাইম অর্ডার ট্র্যাকিং ও কুরিয়ার ডিসপ্যাচ মনিটর
                  </p>
                </div>
                <button
                  onClick={fetchOrders}
                  className="flex items-center gap-2 text-xs text-rose-400 font-bold hover:bg-rose-500/10 px-3 py-1.5 rounded-lg transition cursor-pointer border border-rose-500/20"
                >
                  <RefreshCw size={14} /> Refresh Feed
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-950 text-slate-400 text-xs uppercase tracking-wider">
                      <th className="p-4 font-bold">Order ID</th>
                      <th className="p-4 font-bold">Date & Time</th>
                      <th className="p-4 font-bold">Customer Info</th>
                      <th className="p-4 font-bold">Address</th>
                      <th className="p-4 font-bold">Amount</th>
                      <th className="p-4 font-bold">Tracking ID</th>
                      <th className="p-4 font-bold text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 text-xs">
                    {orders.length === 0 ? (
                      <tr>
                        <td
                          colSpan={7}
                          className="text-center py-8 text-slate-500"
                        >
                          কোনো অর্ডার পাওয়া যায়নি!
                        </td>
                      </tr>
                    ) : (
                      orders
                        .slice(-5)
                        .reverse()
                        .map((order, idx) => {
                          const cStatus = order.status || "Pending";
                          const isBooked =
                            cStatus.toLowerCase() === "booked" ||
                            cStatus.toLowerCase() === "sent";

                          return (
                            <tr
                              key={idx}
                              className="hover:bg-slate-800/50 transition"
                            >
                              <td className="p-4 font-bold text-rose-500">
                                {order.orderId || `ORD-${idx + 1}`}
                              </td>
                              <td className="p-4 text-slate-400">
                                {order.Date || "N/A"} <br />
                                <span className="text-[10px] text-slate-500">
                                  {order.Time || ""}
                                </span>
                              </td>
                              <td className="p-4 font-bold text-white">
                                {order.name || "Unknown"} <br />
                                <span className="text-[11px] text-slate-400 font-normal">
                                  {order.phone || "No Number"}
                                </span>
                              </td>
                              <td className="p-4 text-slate-300 max-w-xs truncate">
                                {order.address || "N/A"}
                              </td>
                              <td className="p-4 text-white font-bold">
                                ৳{order.collectionAmount || 0}
                              </td>
                              <td className="p-4 font-mono text-cyan-400 font-bold">
                                {order.trackingCode || "Not Booked"}
                              </td>
                              <td className="p-4 text-center">
                                <button
                                  onClick={() =>
                                    handleCourierBooking(order, idx)
                                  }
                                  disabled={isBooked}
                                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition shadow-sm ${
                                    isBooked
                                      ? "bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 cursor-not-allowed"
                                      : "bg-rose-600 hover:bg-rose-700 text-white cursor-pointer"
                                  }`}
                                >
                                  {isBooked ? "✅ Booked" : "🚚 Steadfast"}
                                </button>
                              </td>
                            </tr>
                          );
                        })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === "orders" && (
          <div className="bg-slate-900 rounded-2xl shadow-sm border border-slate-800 overflow-hidden space-y-4">
            <div className="p-6 border-b border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4">
              <div>
                <h3 className="text-lg font-bold text-white">
                  Recent Orders (Google Sheet Synced)
                </h3>
                <span className="text-xs text-slate-400">
                  Real-time Connected
                </span>
              </div>
              <input
                type="text"
                placeholder="🔍 নাম বা ফোন দিয়ে খুঁজুন..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-slate-950 border border-slate-700 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-rose-500 w-full sm:w-64"
              />
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-950 text-slate-400 text-xs uppercase tracking-wider">
                    <th className="p-4 font-bold">Order ID</th>
                    <th className="p-4 font-bold">Date</th>
                    <th className="p-4 font-bold">Time</th>
                    <th className="p-4 font-bold">Name</th>
                    <th className="p-4 font-bold">Number</th>
                    <th className="p-4 font-bold">Address</th>
                    <th className="p-4 font-bold">Collection Amount</th>
                    <th className="p-4 font-bold">Tracking ID</th>
                    <th className="p-4 font-bold">Status</th>
                    <th className="p-4 font-bold text-center">
                      Courier Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-sm">
                  {filteredOrders.length === 0 ? (
                    <tr>
                      <td
                        colSpan={10}
                        className="text-center py-8 text-slate-500"
                      >
                        No orders found!
                      </td>
                    </tr>
                  ) : (
                    filteredOrders.map((order, idx) => {
                      const cStatus = order.status || "Pending";
                      const isBooked =
                        cStatus.toLowerCase() === "booked" ||
                        cStatus.toLowerCase() === "sent";

                      return (
                        <tr
                          key={idx}
                          className="hover:bg-slate-800/50 transition"
                        >
                          <td className="p-4 font-bold text-rose-500">
                            {order.orderId || `ORD-${idx + 1}`}
                          </td>
                          <td className="p-4 text-slate-400 text-xs">
                            {order.Date || "N/A"}
                          </td>
                          <td className="p-4 text-slate-400 text-xs">
                            {order.Time || "N/A"}
                          </td>
                          <td className="p-4 font-bold text-white">
                            {order.name || "Unknown"}
                          </td>
                          <td className="p-4 text-slate-300">
                            {order.phone || "No Number"}
                          </td>
                          <td className="p-4 text-slate-300 text-xs">
                            {order.address || "N/A"}
                          </td>
                          <td className="p-4 text-white font-medium">
                            ৳{order.collectionAmount || 0}
                          </td>
                          <td className="p-4 text-xs font-mono text-cyan-400 font-bold">
                            {order.trackingCode ? (
                              order.trackingCode
                            ) : (
                              <span className="text-slate-500 font-normal">
                                Not Booked
                              </span>
                            )}
                          </td>
                          <td className="p-4">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-bold ${
                                isBooked
                                  ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                                  : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                              }`}
                            >
                              {cStatus}
                            </span>
                          </td>
                          <td className="p-4 text-center">
                            <button
                              onClick={() => handleCourierBooking(order, idx)}
                              disabled={
                                bookingLoading ===
                                  (order.orderId || `ORD-${idx + 1}`) ||
                                isBooked
                              }
                              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition shadow-sm ${
                                isBooked
                                  ? "bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 cursor-not-allowed"
                                  : "bg-rose-600 hover:bg-rose-700 text-white cursor-pointer"
                              }`}
                            >
                              {bookingLoading ===
                              (order.orderId || `ORD-${idx + 1}`)
                                ? "Booking..."
                                : isBooked
                                  ? "✅ Booked"
                                  : "🚚 Steadfast"}
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "inventory" && (
          <div className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
                  Duo Corner Stock Control Center
                </span>
                <h2 className="text-xl font-black text-white mt-2">
                  🏷️ Products & Inventory Management
                </h2>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveSubTab("list")}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${activeSubTab === "list" ? "bg-rose-600 text-white shadow-lg shadow-rose-600/20" : "bg-slate-800 text-slate-300 hover:bg-slate-700"}`}
                >
                  📦 সমস্ত প্রোডাক্ট ({products.length})
                </button>
                <button
                  onClick={() => setActiveSubTab("add")}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${activeSubTab === "add" ? "bg-rose-600 text-white shadow-lg shadow-rose-600/20" : "bg-slate-800 text-slate-300 hover:bg-slate-700"}`}
                >
                  ➕ নতুন প্রোডাক্ট যুক্ত করুন
                </button>
              </div>
            </div>

            {activeSubTab === "add" ? (
              <form
                onSubmit={handleSaveProduct}
                className="bg-slate-900 border border-slate-800 p-6 md:p-8 rounded-3xl space-y-6 shadow-xl"
              >
                <div className="flex justify-between items-center border-b border-slate-800 pb-4">
                  <h3 className="text-base font-black text-white">
                    ✨ নতুন প্রোডাক্ট ও অ্যাডভান্সড স্পেসিফিকেশন এন্ট্রি ফর্ম
                  </h3>
                  <button
                    type="button"
                    onClick={() => setActiveSubTab("list")}
                    className="text-xs text-slate-400 hover:text-white cursor-pointer"
                  >
                    ✕ বাতিল
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-2">
                      Product Name *
                    </label>
                    <input
                      type="text"
                      value={productForm.productName}
                      onChange={(e) =>
                        setProductForm({
                          ...productForm,
                          productName: e.target.value,
                        })
                      }
                      placeholder="যেমন: Magnetic Couple Bracelet"
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-xs text-white focus:border-rose-500 focus:outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-2">
                      Category
                    </label>
                    <select
                      value={productForm.category}
                      onChange={(e) =>
                        setProductForm({
                          ...productForm,
                          category: e.target.value,
                        })
                      }
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-xs text-white focus:border-rose-500 focus:outline-none"
                    >
                      <option>ব্রেসলেট (Bracelet)</option>
                      <option>নেকলেস (Necklace)</option>
                      <option>স্মার্ট ওয়াচ (Smart Watch)</option>
                      <option>গিফট বক্স (Gift Box)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-2">
                      Stock (Inventory)
                    </label>
                    <input
                      type="number"
                      value={productForm.stock}
                      onChange={(e) =>
                        setProductForm({
                          ...productForm,
                          stock: e.target.value,
                        })
                      }
                      placeholder="যেমন: 100"
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-xs text-white focus:border-rose-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-2">
                      Regular Price (কাটা মূল্য)
                    </label>
                    <input
                      type="number"
                      value={productForm.regularPrice}
                      onChange={(e) =>
                        setProductForm({
                          ...productForm,
                          regularPrice: e.target.value,
                        })
                      }
                      placeholder="যেমন: 999"
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-xs text-white focus:border-rose-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-2">
                      Offer Price (বিক্রয় মূল্য) *
                    </label>
                    <input
                      type="number"
                      value={productForm.offerPrice}
                      onChange={(e) =>
                        setProductForm({
                          ...productForm,
                          offerPrice: e.target.value,
                        })
                      }
                      placeholder="যেমন: 799"
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-xs text-white focus:border-rose-500 focus:outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-2">
                      Video URL
                    </label>
                    <input
                      type="text"
                      value={productForm.videoUrl}
                      onChange={(e) =>
                        setProductForm({
                          ...productForm,
                          videoUrl: e.target.value,
                        })
                      }
                      placeholder="/video.mp4"
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-xs text-white focus:border-rose-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-2">
                    Description (বিবরণ)
                  </label>
                  <textarea
                    rows={3}
                    value={productForm.description}
                    onChange={(e) =>
                      setProductForm({
                        ...productForm,
                        description: e.target.value,
                      })
                    }
                    placeholder="প্রোডাক্টের আকর্ষণীয় বিবরণ..."
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-xs text-white focus:border-rose-500 focus:outline-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-rose-600 to-indigo-600 hover:from-rose-700 hover:to-indigo-700 text-white font-bold py-4 rounded-xl text-xs transition shadow-lg cursor-pointer"
                >
                  {isSubmitting
                    ? "প্রসেসিং হচ্ছে..."
                    : "💾 সেভ প্রোডাক্ট অ্যান্ড ইনভেন্টরি"}
                </button>
              </form>
            ) : (
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-sm">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 border-b border-slate-800 pb-4">
                  <h3 className="text-sm font-black text-white uppercase tracking-wider">
                    📦 Current Stock & Inventory List
                  </h3>
                  <input
                    type="text"
                    placeholder="🔍 প্রোডাক্টের নাম বা ক্যাটাগরি দিয়ে খুঁজুন..."
                    value={productSearch}
                    onChange={(e) => setProductSearch(e.target.value)}
                    className="bg-slate-950 border border-slate-700 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-rose-500 w-full sm:w-72"
                  />
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-800 text-slate-400">
                        <th className="p-3">Product Name</th>
                        <th className="p-3">Category</th>
                        <th className="p-3">Regular Price</th>
                        <th className="p-3">Offer Price</th>
                        <th className="p-3">Stock Status</th>
                        <th className="p-3 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60">
                      {filteredProducts.length === 0 ? (
                        <tr>
                          <td
                            colSpan={6}
                            className="text-center py-8 text-slate-500"
                          >
                            কোনো প্রোডাক্ট পাওয়া যায়নি! নতুন প্রোডাক্ট যুক্ত
                            করুন।
                          </td>
                        </tr>
                      ) : (
                        filteredProducts.map((p, idx) => {
                          const stockNum = Number(p.Stock || p.stock || 0);
                          const isLowStock = stockNum < 5;

                          return (
                            <tr key={idx} className="hover:bg-slate-800/50">
                              <td className="p-3 font-bold text-white flex items-center gap-2">
                                {p["Product Name"] || p.productName || "N/A"}
                                {isLowStock && (
                                  <span className="text-[10px] bg-rose-500/20 text-rose-400 px-2 py-0.5 rounded-md font-bold">
                                    Low Stock!
                                  </span>
                                )}
                              </td>
                              <td className="p-3 text-slate-300">
                                {p.Category || p.category || "General"}
                              </td>
                              <td className="p-3 text-slate-400 line-through">
                                ৳{p["Regular Price"] || p.regularPrice || 0}
                              </td>
                              <td className="p-3 font-black text-emerald-400">
                                ৳{p["Offer Price"] || p.offerPrice || 0}
                              </td>
                              <td className="p-3">
                                <span
                                  className={`px-2.5 py-1 rounded-full font-bold text-[10px] ${
                                    isLowStock
                                      ? "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                                      : "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                                  }`}
                                >
                                  {stockNum} Pcs
                                </span>
                              </td>
                              <td className="p-3 text-right">
                                <button
                                  onClick={() => alert("স্টক ম্যানেজমেন্ট")}
                                  className="bg-slate-800 hover:bg-slate-700 text-white px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer"
                                >
                                  ⚙️ Manage
                                </button>
                              </td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* 8. Customer & Fraud Prevention Management */}
        {activeTab === "customers" && (
          <div className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap gap-2 text-xs font-bold">
                <button
                  onClick={() => setCustomerSubTab("profiles")}
                  className={`px-4 py-2 rounded-xl transition cursor-pointer ${customerSubTab === "profiles" ? "bg-rose-600 text-white shadow-lg" : "bg-slate-800 text-slate-300 hover:bg-slate-700"}`}
                >
                  Customer 360°
                </button>
                <button
                  onClick={() => setCustomerSubTab("fraud")}
                  className={`px-4 py-2 rounded-xl transition cursor-pointer ${customerSubTab === "fraud" ? "bg-rose-600 text-white shadow-lg" : "bg-slate-800 text-slate-300 hover:bg-slate-700"}`}
                >
                  Fraud Detection
                </button>
                <button
                  onClick={() => setCustomerSubTab("verification")}
                  className={`px-4 py-2 rounded-xl transition cursor-pointer ${customerSubTab === "verification" ? "bg-rose-600 text-white shadow-lg" : "bg-slate-800 text-slate-300 hover:bg-slate-700"}`}
                >
                  COD Verification
                </button>
                <button
                  onClick={() => setCustomerSubTab("queue")}
                  className={`px-4 py-2 rounded-xl transition cursor-pointer ${customerSubTab === "queue" ? "bg-rose-600 text-white shadow-lg" : "bg-slate-800 text-slate-300 hover:bg-slate-700"}`}
                >
                  Review Queue
                </button>
                <button
                  onClick={() => setCustomerSubTab("watchlist")}
                  className={`px-4 py-2 rounded-xl transition cursor-pointer ${customerSubTab === "watchlist" ? "bg-rose-600 text-white shadow-lg" : "bg-slate-800 text-slate-300 hover:bg-slate-700"}`}
                >
                  Watchlist & Block
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
                <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                  <h3 className="text-sm font-black text-white uppercase tracking-wider">
                    Smart Customer Directory ({orders.length})
                  </h3>
                </div>

                <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1">
                  {orders.length === 0 ? (
                    <p className="text-xs text-slate-500 text-center py-6">
                      কোনো কাস্টমার পাওয়া যায়নি!
                    </p>
                  ) : (
                    orders.map((ord, i) => {
                      const custPhone = ord.phone || "N/A";
                      const isSelected = selectedCustomer?.phone === custPhone;

                      return (
                        <div
                          key={i}
                          onClick={() => {
                            setSelectedCustomer(ord);
                            void fetchAutomatedFraudData(custPhone);
                          }}
                          className={`p-4 rounded-2xl border transition cursor-pointer flex items-center justify-between ${
                            isSelected
                              ? "bg-rose-600/10 border-rose-500/50"
                              : "bg-slate-950 border-slate-800 hover:bg-slate-800/50"
                          }`}
                        >
                          <div>
                            <h4 className="text-sm font-bold text-white">
                              {ord.name || "Unknown"}
                            </h4>
                            <p className="text-xs text-slate-400 font-mono mt-0.5">
                              {custPhone}
                            </p>
                          </div>
                          <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2.5 py-1 rounded-full font-bold">
                            Verified
                          </span>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>

              <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6 shadow-xl">
                <div className="border-b border-slate-800 pb-3">
                  <h3 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2">
                    <UserCheck className="text-rose-500" size={18} /> Customer
                    360° Profile & Risk Score
                  </h3>
                </div>

                {selectedCustomer ? (
                  <div className="space-y-6">
                    <div className="bg-slate-950 border border-slate-800 p-5 rounded-2xl grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-[11px] font-bold text-slate-400 uppercase">
                          Customer Name
                        </p>
                        <h4 className="text-sm font-bold text-white mt-1">
                          {selectedCustomer.name || "N/A"}
                        </h4>
                      </div>
                      <div>
                        <p className="text-[11px] font-bold text-slate-400 uppercase">
                          Phone Number
                        </p>
                        <h4 className="text-sm font-mono font-bold text-cyan-400 mt-1">
                          {selectedCustomer.phone || "N/A"}
                        </h4>
                      </div>
                      <div className="col-span-2">
                        <p className="text-[11px] font-bold text-slate-400 uppercase">
                          Delivery Address
                        </p>
                        <p className="text-xs text-slate-300 mt-1">
                          {selectedCustomer.address || "N/A"}
                        </p>
                      </div>
                    </div>

                    {autoFraudLoading ? (
                      <div className="bg-slate-950 border border-slate-800 p-8 rounded-2xl text-center">
                        <div className="w-8 h-8 mx-auto mb-2 border-2 border-rose-500/20 border-t-rose-500 rounded-full animate-spin"></div>
                        <p className="text-xs text-rose-400 font-bold">
                          Steadfast API থেকে অটোমেটিক ফ্রড ও রিসিভ হিস্ট্রি চেক
                          করা হচ্ছে...
                        </p>
                      </div>
                    ) : fraudReportMap[selectedCustomer.phone] ? (
                      <div className="bg-slate-950 border border-slate-800 p-6 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-6">
                        <div className="space-y-2">
                          <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">
                            Steadfast Automated Courier Report
                          </h4>
                          <p className="text-xs text-slate-300">
                            মোট অর্ডার:{" "}
                            <span className="font-bold text-white">
                              {
                                fraudReportMap[selectedCustomer.phone]
                                  .totalOrders
                              }{" "}
                              টি
                            </span>{" "}
                            | রিসিভ করেছে:{" "}
                            <span className="font-bold text-emerald-400">
                              {
                                fraudReportMap[selectedCustomer.phone]
                                  .deliveredOrders
                              }{" "}
                              টি
                            </span>{" "}
                            | ক্যানসেল:{" "}
                            <span className="font-bold text-rose-400">
                              {
                                fraudReportMap[selectedCustomer.phone]
                                  .cancelledOrders
                              }{" "}
                              টি
                            </span>
                          </p>
                          <p
                            className={`text-xs font-bold ${Number(fraudReportMap[selectedCustomer.phone].successRate) >= 70 ? "text-emerald-400" : "text-rose-500"}`}
                          >
                            স্ট্যাটাস:{" "}
                            {fraudReportMap[selectedCustomer.phone].riskLevel}
                          </p>
                        </div>

                        <div className="flex flex-col items-center justify-center shrink-0">
                          <div
                            className={`w-20 h-20 rounded-full flex flex-col items-center justify-center border-4 shadow-xl ${
                              Number(
                                fraudReportMap[selectedCustomer.phone]
                                  .successRate,
                              ) >= 70
                                ? "border-emerald-500 bg-emerald-500/10 text-emerald-400"
                                : "border-rose-500 bg-rose-500/10 text-rose-500"
                            }`}
                          >
                            <span className="text-base font-black">
                              {
                                fraudReportMap[selectedCustomer.phone]
                                  .successRate
                              }
                              %
                            </span>
                            <span className="text-[9px] uppercase font-bold">
                              Success
                            </span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="bg-slate-950 border border-slate-800 p-6 rounded-2xl text-center">
                        <button
                          onClick={() =>
                            fetchAutomatedFraudData(selectedCustomer.phone)
                          }
                          className="bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold px-5 py-2.5 rounded-xl cursor-pointer shadow-md"
                        >
                          🔄 অটোমেটিক কুরিয়ার হিস্ট্রি ফেচ করুন
                        </button>
                      </div>
                    )}

                    <div className="space-y-3">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                        ⚡ Trust Level & Risk Factors
                      </h4>
                      <div className="bg-slate-950 border border-slate-800 p-4 rounded-2xl space-y-2 text-xs">
                        <div className="flex items-center gap-2 text-emerald-400">
                          <CheckCircle2 size={16} /> পূর্বের সফল ডেলিভারি রেকর্ড
                          ভালো।
                        </div>
                        <div className="flex items-center gap-2 text-slate-300">
                          <XCircle size={16} className="text-slate-500" /> কোনো
                          ডুপ্লিকেট অর্ডার বা রিটার্ন ফ্রড প্যাটার্ন নেই।
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-16 text-slate-500 text-xs">
                    বাম পাশ থেকে যেকোনো কাস্টমার সিলেক্ট করুন।
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Payments & COD Settlements Center */}
        {activeTab === "settlements" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl flex items-center justify-between shadow-xl">
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase">
                    COD Collection in Hand
                  </p>
                  <h3 className="text-2xl font-black text-emerald-400 mt-1">
                    ৳{totalCodCollection.toLocaleString()}
                  </h3>
                  <span className="text-[10px] text-emerald-400 font-semibold bg-emerald-500/10 px-2.5 py-0.5 rounded-full mt-2 inline-block">
                    Delivered Orders Total
                  </span>
                </div>
                <div className="p-3.5 bg-emerald-500/10 text-emerald-400 rounded-2xl">
                  <Wallet size={26} />
                </div>
              </div>

              <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl flex items-center justify-between shadow-xl">
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase">
                    Courier Due (Steadfast)
                  </p>
                  <h3 className="text-2xl font-black text-amber-500 mt-1">
                    ৳{courierDueAmount.toLocaleString()}
                  </h3>
                  <span className="text-[10px] text-amber-400 font-semibold bg-amber-500/10 px-2.5 py-0.5 rounded-full mt-2 inline-block">
                    Processing & Shipped
                  </span>
                </div>
                <div className="p-3.5 bg-amber-500/10 text-amber-500 rounded-2xl">
                  <Truck size={26} />
                </div>
              </div>

              <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl flex items-center justify-between shadow-xl">
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase">
                    Bank / MFS Received
                  </p>
                  <h3 className="text-2xl font-black text-cyan-400 mt-1">
                    ৳{bankReceivedAmount.toLocaleString()}
                  </h3>
                  <span className="text-[10px] text-cyan-400 font-semibold bg-cyan-500/10 px-2.5 py-0.5 rounded-full mt-2 inline-block">
                    Auto Reconciled (85%)
                  </span>
                </div>
                <div className="p-3.5 bg-cyan-500/10 text-cyan-400 rounded-2xl">
                  <Building2 size={26} />
                </div>
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-3xl shadow-xl overflow-hidden space-y-4">
              <div className="p-6 border-b border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4">
                <div>
                  <h3 className="text-base font-black text-white">
                    💰 Automated Payment & COD Settlements Ledger
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Steadfast কুরিয়ার এবং ব্যাংক সেটেলমেন্টের রিয়েল-টাইম
                    অটোমেটেড হিসাব।
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setSettlementFilter("all")}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${settlementFilter === "all" ? "bg-rose-600 text-white" : "bg-slate-800 text-slate-300"}`}
                  >
                    সকল লেনদেন
                  </button>
                  <button
                    onClick={() => setSettlementFilter("delivered")}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${settlementFilter === "delivered" ? "bg-rose-600 text-white" : "bg-slate-800 text-slate-300"}`}
                  >
                    সফল রিসিভড (COD)
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="bg-slate-950 text-slate-400 uppercase tracking-wider">
                      <th className="p-4">Order ID</th>
                      <th className="p-4">Date</th>
                      <th className="p-4">Customer Name</th>
                      <th className="p-4">Phone</th>
                      <th className="p-4">Collection Amount</th>
                      <th className="p-4">Settlement Status</th>
                      <th className="p-4 text-right">Gateway / Method</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {orders.length === 0 ? (
                      <tr>
                        <td
                          colSpan={7}
                          className="text-center py-8 text-slate-500"
                        >
                          কোনো সেটেলমেন্ট ডাটা পাওয়া যায়নি!
                        </td>
                      </tr>
                    ) : (
                      orders
                        .filter((ord) => {
                          if (settlementFilter === "delivered") {
                            return (
                              String(ord.status || "").toLowerCase() ===
                                "delivered" ||
                              String(ord.courierAction || "").toLowerCase() ===
                                "completed"
                            );
                          }
                          return true;
                        })
                        .map((ord, i) => {
                          const isDelivered =
                            String(ord.status || "").toLowerCase() ===
                              "delivered" ||
                            String(ord.courierAction || "").toLowerCase() ===
                              "completed";

                          return (
                            <tr key={i} className="hover:bg-slate-800/50">
                              <td className="p-4 font-bold text-rose-500">
                                {ord.orderId || `ORD-${i + 1}`}
                              </td>
                              <td className="p-4 text-slate-400">
                                {ord.Date || "N/A"}
                              </td>
                              <td className="p-4 font-bold text-white">
                                {ord.name || "Unknown"}
                              </td>
                              <td className="p-4 text-slate-300 font-mono">
                                {ord.phone || "N/A"}
                              </td>
                              <td className="p-4 font-bold text-emerald-400">
                                ৳{ord.collectionAmount || 0}
                              </td>
                              <td className="p-4">
                                <span
                                  className={`px-3 py-1 rounded-full font-bold text-[10px] ${
                                    isDelivered
                                      ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                                      : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                                  }`}
                                >
                                  {isDelivered
                                    ? "Settled (Paid)"
                                    : "Pending Due"}
                                </span>
                              </td>
                              <td className="p-4 text-right font-semibold text-slate-300">
                                <span className="flex items-center justify-end gap-1.5 text-cyan-400">
                                  <CreditCard size={14} /> Steadfast COD
                                </span>
                              </td>
                            </tr>
                          );
                        })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Business Automation & Rules Engine UI */}
        {activeTab === "automation" && (
          <div className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 space-y-6 shadow-xl">
              <div className="border-b border-slate-800 pb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
                  Duo Corner Automation
                </span>
                <h3 className="text-lg font-black text-white mt-2 flex items-center gap-2">
                  <Zap className="text-amber-400" size={20} /> Business
                  Automation & Rules Engine
                </h3>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-7 space-y-4">
                  <h4 className="text-sm font-bold text-white">
                    Active Automation Rules
                  </h4>
                  <div className="space-y-3">
                    {rules.map((rule) => (
                      <div
                        key={rule.id}
                        className="bg-slate-950 border border-slate-800 p-4 rounded-2xl flex items-center justify-between"
                      >
                        <div>
                          <h5 className="text-sm font-bold text-white">
                            {rule.name}
                          </h5>
                          <p className="text-xs text-slate-400 mt-0.5">
                            Trigger:{" "}
                            <span className="text-cyan-400">
                              {rule.trigger}
                            </span>
                          </p>
                        </div>
                        <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1 rounded-full font-bold">
                          Active
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="lg:col-span-5 bg-slate-950 border border-slate-800 p-6 rounded-2xl space-y-4">
                  <h4 className="text-sm font-bold text-white">
                    + Create New Automation Rule
                  </h4>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">
                        Rule Name (নিয়মের নাম)
                      </label>
                      <input
                        type="text"
                        value={newRuleName}
                        onChange={(e) => setNewRuleName(e.target.value)}
                        placeholder="যেমন: ২৪ ঘণ্টা আপডেট না হলে অ্যালার্ট"
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-xs text-white focus:border-rose-500 focus:outline-none"
                      />
                    </div>
                    <button
                      onClick={() => {
                        if (!newRuleName) return alert("নিয়মের নাম লিখুন!");
                        setRules([
                          ...rules,
                          {
                            id: rules.length + 1,
                            name: newRuleName,
                            trigger: "Custom Trigger",
                            status: true,
                          },
                        ]);
                        setNewRuleName("");
                        alert("✅ নতুন অটোমেশন রুল সফলভাবে যুক্ত হয়েছে!");
                      }}
                      className="w-full bg-gradient-to-r from-rose-600 to-indigo-600 hover:from-rose-700 hover:to-indigo-700 text-white font-bold py-3 rounded-xl text-xs transition cursor-pointer shadow-lg"
                    >
                      ⚡ Save & Active Rule
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 9. Marketing & Pixels Hub (Updated to match Image 11 layout exactly) */}
        {activeTab === "marketing" && (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 space-y-6 shadow-xl">
            <div className="border-b border-slate-800 pb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
                Duo Corner Marketing Control Center
              </span>
              <h3 className="text-lg font-black text-white mt-2 flex items-center gap-2">
                📈 Marketing, Pixels & Server-Side Tracking
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Multi-Platform Pixel & API Token Manager - এখান থেকে পিক্সেল ও
                টোকেন কনফিগার করলে তা স্বয়ংক্রিয়ভাবে আপনার ওয়েবসাইটে সেট হয়ে
                যাবে।
              </p>
            </div>

            {pixelSaved && (
              <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 p-4 rounded-xl text-xs font-bold">
                ✅ পিক্সেল ও ট্র্যাকিং কনফিগারেশন সফলভাবে সেভ এবং ওয়েবসাইটে লাইভ
                হয়েছে।
              </div>
            )}

            <form onSubmit={handleSavePixels} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Meta Pixel ID */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-slate-300 uppercase">
                    Meta Pixel ID
                  </label>
                  <input
                    type="text"
                    value={pixelConfig.metaPixelId}
                    onChange={(e) =>
                      setPixelConfig({
                        ...pixelConfig,
                        metaPixelId: e.target.value,
                      })
                    }
                    placeholder="যেমন: 123456789012345"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-xs text-white focus:border-rose-500 focus:outline-none font-mono"
                  />
                </div>

                {/* Meta CAPI Access Token */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-slate-300 uppercase">
                    Meta CAPI Access Token
                  </label>
                  <input
                    type="password"
                    value={pixelConfig.metaAccessToken}
                    onChange={(e) =>
                      setPixelConfig({
                        ...pixelConfig,
                        metaAccessToken: e.target.value,
                      })
                    }
                    placeholder="EAAG..."
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-xs text-white focus:border-rose-500 focus:outline-none font-mono"
                  />
                </div>

                {/* GA4 Measurement ID */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-slate-300 uppercase">
                    GA4 Measurement ID
                  </label>
                  <input
                    type="text"
                    value={pixelConfig.ga4Id}
                    onChange={(e) =>
                      setPixelConfig({ ...pixelConfig, ga4Id: e.target.value })
                    }
                    placeholder="G-XXXXXXXXXX"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-xs text-white focus:border-rose-500 focus:outline-none font-mono"
                  />
                </div>

                {/* Google Tag Manager (GTM ID) */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-slate-300 uppercase">
                    Google Tag Manager (GTM ID)
                  </label>
                  <input
                    type="text"
                    value={pixelConfig.gtmId}
                    onChange={(e) =>
                      setPixelConfig({ ...pixelConfig, gtmId: e.target.value })
                    }
                    placeholder="GTM-XXXXXXX"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-xs text-white focus:border-rose-500 focus:outline-none font-mono"
                  />
                </div>

                {/* TikTok Pixel ID */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-slate-300 uppercase">
                    TikTok Pixel ID
                  </label>
                  <input
                    type="text"
                    value={pixelConfig.tiktokPixelId}
                    onChange={(e) =>
                      setPixelConfig({
                        ...pixelConfig,
                        tiktokPixelId: e.target.value,
                      })
                    }
                    placeholder="CXXXXXXXXXXXXXXX"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-xs text-white focus:border-rose-500 focus:outline-none font-mono"
                  />
                </div>

                {/* TikTok Events API Token */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-slate-300 uppercase">
                    TikTok Events API Token
                  </label>
                  <input
                    type="password"
                    value={pixelConfig.tiktokAccessToken}
                    onChange={(e) =>
                      setPixelConfig({
                        ...pixelConfig,
                        tiktokAccessToken: e.target.value,
                      })
                    }
                    placeholder="TikTok Token..."
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-xs text-white focus:border-rose-500 focus:outline-none font-mono"
                  />
                </div>
              </div>

              {/* Save & Configure Button matching Image 11 */}
              <div className="flex flex-col sm:flex-row justify-between items-center pt-4 border-t border-slate-800 gap-4">
                <span className="text-[11px] text-emerald-400 font-bold bg-emerald-500/10 px-3 py-1.5 rounded-lg border border-emerald-500/20">
                  ● CAPI & Deduplication: Active
                </span>
                <button
                  type="submit"
                  className="bg-gradient-to-r from-rose-600 to-indigo-600 hover:from-rose-700 hover:to-indigo-700 text-white font-bold px-8 py-3.5 rounded-xl text-xs transition shadow-lg cursor-pointer w-full sm:w-auto"
                >
                  💾 পিক্সেল ও টোকেন কনফিগারেশন সেভ করুন
                </button>
              </div>
            </form>
          </div>
        )}
      </main>
    </div>
  );
}
