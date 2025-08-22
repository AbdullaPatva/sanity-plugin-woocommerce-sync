import { defineType, defineField } from 'sanity';
export const woocommerceProductSchema = defineType({
    name: 'woocommerce.product',
    title: 'WooCommerce Products',
    type: 'document',
    fields: [
        defineField({
            name: 'wooId',
            title: 'WooCommerce Product ID',
            type: 'number',
            description: 'The unique product ID from WooCommerce',
            validation: (r) => r.required().positive().integer(),
        }),
        defineField({
            name: 'fetchButton',
            title: 'Fetch from WooCommerce',
            type: 'woocommerceFetchButton',
        }),
        defineField({
            name: 'title',
            title: 'Product Title',
            type: 'string',
        }),
        defineField({
            name: 'slug',
            title: 'Product Slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
            }
        }),
        defineField({
            name: 'primaryImage',
            title: 'Primary Image',
            type: 'url',
        }),
        defineField({
            name: 'permalink',
            title: 'Product Permalink',
            type: 'url',
            description: 'Direct link to the product on WooCommerce',
        }),
        defineField({
            name: 'shortDescription',
            title: 'Short Description',
            type: 'text',
        }),
        defineField({
            name: 'type',
            title: 'Product Type',
            type: 'string',
            options: {
                list: [
                    { title: 'Simple', value: 'simple' },
                    { title: 'Variable', value: 'variable' },
                    { title: 'Grouped', value: 'grouped' },
                    { title: 'External', value: 'external' },
                ],
            },
        }),
        defineField({
            name: 'featured',
            title: 'Featured Product',
            type: 'boolean'
        }),
        defineField({
            name: 'sku',
            title: 'Product SKU',
            type: 'string',
            description: 'Stock keeping unit',
        }),
        defineField({
            name: 'regularPrice',
            title: 'Regular Price',
            type: 'string',
            description: 'Original price before any discounts',
        }),
        defineField({
            name: 'salePrice',
            title: 'Sale Price',
            type: 'string',
            description: 'Discounted price when on sale',
        }),
        defineField({
            name: 'price',
            title: 'Current Price',
            type: 'string',
            description: 'Current selling price',
        }),
        defineField({
            name: 'averageRating',
            title: 'Average Rating',
            type: 'number',
            description: 'Average customer rating (0-5)',
            validation: (r) => r.min(0).max(5),
        }),
        defineField({
            name: 'ratingCount',
            title: 'Rating Count',
            type: 'number',
            description: 'Number of customer ratings',
            validation: (r) => r.min(0),
        }),
        defineField({
            name: 'stockStatus',
            title: 'Stock Status',
            type: 'string',
            options: {
                list: [
                    { title: 'In Stock', value: 'instock' },
                    { title: 'Out of Stock', value: 'outofstock' },
                    { title: 'On Backorder', value: 'onbackorder' },
                ],
            },
        }),
        defineField({
            name: 'lastSyncedAt',
            title: 'Last Synced At',
            type: 'datetime',
            readOnly: true,
        }),
    ],
});
