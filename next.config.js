/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import('./src/env.js');

/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    config.externals.push('pino-pretty', 'lokijs', 'encoding');
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return config;
  },
};

export default nextConfig;
