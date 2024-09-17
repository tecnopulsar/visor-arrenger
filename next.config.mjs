// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
// };

// export default nextConfig;

// next.config.mjs
module.exports = {
  async rewrites() {
    return [
      {
        source: "/api/preview", // Ruta de tu API en Next.js
        destination:
          "http://192.168.16.45/api/v2/public/common/devices/Source3-PCShow/preview", // API HTTP original
      },
    ];
  },
};
