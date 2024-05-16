/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/tankplanner",
        destination: "https://www.tankplanner.nl",
      },
    ];
  },
};

export default nextConfig;
