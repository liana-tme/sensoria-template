import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  // Photo quality steps the site may ask for (90: the hero photo, which is cropped on phones).
  images: { qualities: [75, 90] },
  turbopack: {
    rules: {
      // Tailwind runs on the global stylesheet only (it @imports tokens.css).
      // Component *.module.css files stay CSS modules and read tokens via var().
      "globals.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
