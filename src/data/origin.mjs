const value = process.env.SITE_ORIGIN || 'https://www.ivfsaipan.com';
const url = new URL(value);
if (url.protocol !== 'https:' || url.username || url.password || url.pathname !== '/' || url.search || url.hash) throw new Error('SITE_ORIGIN must be an HTTPS origin without a path, query or credentials');
export const siteOrigin = url.origin;
