/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@agentic-todo-list/shared'],
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1',
  },
};

module.exports = nextConfig;
