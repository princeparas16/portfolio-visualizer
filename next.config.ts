import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  output: 'export',
  basePath: isProd ? '/portfolio-visualizer' : '',
  assetPrefix: isProd ? '/portfolio-visualizer/' : '',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
