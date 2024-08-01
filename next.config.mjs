/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    basePath: process.env.NODE_ENV === 'production' ? '/ConverterCsv/csv-converter' : '',
    assetPrefix: process.env.NODE_ENV === 'production' ? '/ConverterCsv/csv-converter/' : '',
    output: 'export',
};

export default nextConfig;
