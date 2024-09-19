const { env } = require("process");

/** @type {import('next').NextConfig} */
const nextConfig = {};

module.exports = {
  images: {
    domains: ["dewisebucket.s3.eu-north-1.amazonaws.com"],
  },
  env: {
    NEXT_PUBLIC_BASE_URL: "https://tech-stop-hrhe.onrender.com/api",
  },
};
