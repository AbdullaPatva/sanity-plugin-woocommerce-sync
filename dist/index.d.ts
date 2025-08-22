/**
 * Configuration options for the WooCommerce Products plugin
 * @public
 */
export interface WooCommercePluginOptions {
    toolName?: string;
}
/**
 * Sanity Studio plugin for fetching and managing WooCommerce products
 * @public
 */
export declare const woocommerceSyncPlugin: import("sanity").Plugin<void | WooCommercePluginOptions>;
export default woocommerceSyncPlugin;
