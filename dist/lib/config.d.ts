/**
 * WooCommerce Plugin Configuration
 *
 * This file centralizes configuration settings for the WooCommerce plugin,
 * including API endpoints and environment variable handling.
 */
/**
 * Get the API base URL from environment variables
 *
 * @returns The API base URL (e.g., http://localhost:3001)
 * @throws Error if SANITY_STUDIO_WOOCOMMERCE_API_URL is not defined
 */
export declare function getApiBaseUrl(): string;
/**
 * Get the test connection endpoint path from environment variables
 *
 * @returns The test connection endpoint path
 * @throws Error if SANITY_STUDIO_WOOCOMMERCE_TEST_CONNECTION_PATH is not defined
 */
export declare function getTestConnectionPath(): string;
/**
 * Get the fetch product endpoint path from environment variables
 *
 * @returns The fetch product endpoint path
 * @throws Error if SANITY_STUDIO_WOOCOMMERCE_FETCH_PRODUCT_PATH is not defined
 */
export declare function getFetchProductPath(): string;
