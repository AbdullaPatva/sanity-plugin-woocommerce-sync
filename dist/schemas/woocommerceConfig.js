import { defineType, defineField } from 'sanity';
import { WooCommerceSettingsActions } from '../inputs/WooCommerceSettingsActions';
export const woocommerceConfigSchema = defineType({
    name: 'woocommerce.settings',
    title: 'WooCommerce Settings',
    type: 'document',
    groups: [
        { name: 'api', title: 'API Configuration' },
        { name: 'actions', title: 'Actions' },
    ],
    fields: [
        defineField({
            name: 'storeUrl',
            title: 'Store URL',
            type: 'url',
            group: 'api',
            description: 'Enter your WooCommerce store URL (e.g., https://yourstore.com).',
            validation: (r) => r.required(),
        }),
        defineField({
            name: 'consumerKey',
            title: 'Consumer Key',
            type: 'string',
            group: 'api',
            description: 'Enter your WooCommerce REST API Consumer Key.',
            validation: (r) => r.required(),
        }),
        defineField({
            name: 'consumerSecret',
            title: 'Consumer Secret',
            type: 'string',
            group: 'api',
            description: 'Enter your WooCommerce REST API Consumer Secret.',
            validation: (r) => r.required(),
        }),
        defineField({
            name: 'testProductId',
            title: 'Test Product ID',
            type: 'number',
            group: 'api',
            description: 'Enter a WooCommerce product ID to test the API connection.',
            validation: (r) => r.required().positive().integer(),
        }),
        defineField({
            name: 'settingsActions',
            title: 'Actions',
            type: 'string',
            group: 'actions',
            components: {
                input: WooCommerceSettingsActions,
            },
        }),
    ],
    preview: {
        prepare: () => ({
            title: 'WooCommerce Settings',
        }),
    },
});
