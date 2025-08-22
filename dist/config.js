export const woocommerceConfigKeys = [
    { key: 'storeUrl', title: 'Store URL', type: 'url' },
    { key: 'consumerKey', title: 'Consumer Key', type: 'string' },
    { key: 'consumerSecret', title: 'Consumer Secret', type: 'string' }
];
export const PLUGIN_NAMESPACE = 'sanity-woocommerce-sync';
export const WOOCOMMERCE_API_BASE = '/wp-json/wc/v3';
export const MAX_PRODUCTS_PER_PAGE = 100;
export const RATE_LIMIT_DELAY = 1000; // 1 second delay between requests
