import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // async rewrites() {
  //   return [
  //     {
  //       source: "/api/:path*",
  //       destination: "http://backend:8080/:path*", // Proxy to backend service
  //     },
  //   ];
  // },
};

module.exports = nextConfig;

export default nextConfig;
