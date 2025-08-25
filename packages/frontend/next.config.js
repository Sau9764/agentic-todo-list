const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@agentic-todo-list/shared'],
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1',
  },
  webpack: (config, { isServer }) => {
    config.resolve.alias['@'] = path.resolve(__dirname, 'src');
    
    // Handle Node.js specific modules for browser environment
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        os: false,
        child_process: false,
        net: false,
        tls: false,
        http: false,
        https: false,
        stream: false,
        crypto: false,
      };
    }
    
    return config;
  },
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = nextConfig; 
