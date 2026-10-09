import { whatsappLink } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="border-t border-rose-100/80 bg-white/80 px-4 py-10 text-center backdrop-blur-sm">
      <p className="text-lg font-black tracking-tight text-gray-900">
        <span className="bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
          Duo Corner
        </span>
      </p>
      <p className="mt-1 text-[11px] font-medium text-gray-500">
        Exclusive couple collection · Cash on Delivery
      </p>
      <p className="mt-3 text-xs font-semibold text-gray-600">
        📞 01777-156691 ·{" "}
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="font-bold text-rose-600 transition hover:text-rose-700 hover:underline"
        >
          WhatsApp
        </a>
      </p>
      <p className="mt-3 text-[10px] text-gray-400">
        © {new Date().getFullYear()} Duo Corner. All rights reserved.
      </p>
    </footer>
  );
}
