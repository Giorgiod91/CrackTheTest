/** @type {import("next").NextConfig} */
const config = {
  // The old Eignungstest landing pages were replaced by the AP1 topic pages.
  async redirects() {
    return [
      { source: "/eignungstest", destination: "/ap1", permanent: true },
      { source: "/eignungstest/:slug*", destination: "/ap1", permanent: true },
    ];
  },
};

export default config;
