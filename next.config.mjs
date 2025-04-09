/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
            protocol: 'https',
            hostname: 'cdn-live.prm.ol.epicgames.com',
            },
        ],
    },
};

export default nextConfig;
