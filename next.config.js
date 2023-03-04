const path = require('path')

module.exports = async (phase, { defaultConfig }) => {
  /**
   * @type {import('next').NextConfig}
   */
  const nextConfig = {
    /* config options here */

  }
  return nextConfig
}


/**
 * @type {import('next').NextConfig}
 */
 const nextConfig = {
  /* config options here */
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
}

module.exports = nextConfig