/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        BASE_URL: process.env.HOST,
        //SECRET: process.env.SECRET
    },
};

export default nextConfig;
