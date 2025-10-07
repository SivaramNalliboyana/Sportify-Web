/** @type {import('next').NextConfig} */
const supabaseUrl = new URL(process.env.NEXT_PUBLIC_SUPABASE_URL);

const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'img.clerk.com',
                port: '',
            },
            {
                protocol: 'https',
                hostname: supabaseUrl.hostname,
            },
        ]
    },
};

export default nextConfig;
