import { definePlugin } from 'sanity';
import { woocommerceConfigSchema } from './schemas/woocommerceConfig';
import { woocommerceProductSchema } from './schemas/woocommerceProduct';
import { woocommerceFetchButtonSchema } from './schemas/woocommerceFetchButton';
/**
 * Sanity Studio plugin for fetching and managing WooCommerce products
 * @public
 */
export const woocommerceSyncPlugin = definePlugin((opts) => {
    return {
        name: 'sanity-plugin-woocommerce-sync',
        schema: {
            types: [woocommerceConfigSchema, woocommerceProductSchema, woocommerceFetchButtonSchema],
        },
        form: {
            renderInput(props, next) {
                // woocommerceFetchButton is handled by components.input in its schema
                return next(props);
            },
        },
    };
});
export default woocommerceSyncPlugin;
