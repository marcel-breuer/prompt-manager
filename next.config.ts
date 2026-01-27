import type { NextConfig } from "next";
import 'dotenv/config';

const nextConfig: NextConfig = {
  env: {
    POSTGRES_URL: process.env.POSTGRES_URL,
  },
  /* config options here */
};

export default nextConfig;
