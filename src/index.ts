import { definePlugin } from 'sanity'
import { woocommerceConfigSchema } from './schemas/woocommerceConfig'
import { woocommerceProductSchema } from './schemas/woocommerceProduct'
import { woocommerceFetchButtonSchema } from './schemas/woocommerceFetchButton'

/**
 * Configuration options for the WooCommerce Products plugin
 * @public
 */
export interface WooCommercePluginOptions {
  // Optional: override tool name or route
  toolName?: string
}

/**
 * Sanity Studio plugin for fetching and managing WooCommerce products
 * @public
 */
export const woocommerceSyncPlugin = definePlugin<WooCommercePluginOptions | void>((opts: WooCommercePluginOptions | void) => {
  return {
    name: 'sanity-plugin-woocommerce-sync',
    schema: {
      types: [woocommerceConfigSchema, woocommerceProductSchema, woocommerceFetchButtonSchema],
    },
    form: {
      renderInput(props: any, next: any) {
        // woocommerceFetchButton is handled by components.input in its schema
        return next(props)
      },
    },
  }
})

export default woocommerceSyncPlugin
