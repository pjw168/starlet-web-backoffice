// const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    dirs: ['src'],
  },
  reactStrictMode: false,
  // Uncoment to add domain whitelist
  images: {
    domains: [
      'starlettokendev.s3.ap-southeast-1.amazonaws.com',
      'starlettoken.s3.ap-southeast-1.amazonaws.com',
    ],
  },

  // sassOptions: {
  //   includePaths: [path.join(__dirname, "styles")],
  // },

  // SVGR
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            typescript: true,
            icon: true,
          },
        },
      ],
    });

    return config;
  },
};

module.exports = nextConfig;
