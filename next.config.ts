import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // dev only: lets a phone on the same Wi-Fi load the dev server's JS when it
  // opens the site by this laptop's LAN address. without it Next blocks the
  // scripts and the page renders but nothing interactive runs. update the IP
  // if the router hands this laptop a new one
  allowedDevOrigins: ["192.168.141.155"],
  images: {
    // 90 keeps small UI text legible in the /agency project screenshots
    qualities: [75, 90],
  },
};

export default nextConfig;
