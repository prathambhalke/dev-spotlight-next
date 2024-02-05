/** @type {import('next').NextConfig} */
const nextConfig = {
    // module.exports = {
        images: {
          remotePatterns: [
            {
              protocol: 'https',
              hostname: 'avatars.githubusercontent.com',
            //   port: '',
            },
          ],
        },
    //   }
};

export default nextConfig;

