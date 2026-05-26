import { PHASE_DEVELOPMENT_SERVER } from 'next/constants.js';

export default (phase) => {
    const isDev = phase === PHASE_DEVELOPMENT_SERVER;
    /**
   * @type {import('next').NextConfig}
   */
    const nextConfig = {
        basePath: isDev ? '' : '/csv-converter',
        assetPrefix: isDev ? '' : '/csv-converter/',
        output: 'export',
    };

    return nextConfig;
};
