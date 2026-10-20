import type { NextConfig } from "next";
import nextPWA from "next-pwa";

const withPWA = nextPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
});

const nextConfig: NextConfig = {
  // আপনার অন্যান্য কনফিগারেশন থাকলে এখানে রাখতে পারেন
};

export default withPWA(nextConfig);
