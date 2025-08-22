// Modern Studio structure: WooCommerce Settings singleton, then WooCommerce Products as regular documents
export const structure = (S) => S.list()
    .title('Content')
    .items([
    // WooCommerce Settings singleton (opens form directly)
    S.listItem()
        .id('woocommerceSettings')
        .title('WooCommerce Settings')
        .child(S.document()
        .schemaType('woocommerce.settings')
        .documentId('woocommerce-settings')),
    // WooCommerce Products as regular documents (can create multiple)
    S.listItem()
        .id('woocommerceProducts')
        .title('WooCommerce Products')
        .child(S.documentTypeList('woocommerce.product')
        .title('WooCommerce Products')),
    S.divider(),
    // Show all remaining document types except woocommerce.settings singleton
    ...S.documentTypeListItems().filter((item) => {
        const id = item.getId();
        return id && !['woocommerce.settings'].includes(id);
    }),
]);
// Alternative structure: If you prefer to group WooCommerce items together
export const alternativeStructure = (S) => S.list()
    .title('Content')
    .items([
    // WooCommerce section
    S.listItem()
        .title('WooCommerce Integration')
        .child(S.list()
        .title('WooCommerce Integration')
        .items([
        S.listItem()
            .id('woocommerceSettings')
            .title('WooCommerce Settings')
            .child(S.document()
            .schemaType('woocommerce.settings')
            .documentId('woocommerce-settings')),
    ])),
    S.divider(),
    // Your other content types
    ...S.documentTypeListItems().filter((item) => {
        const id = item.getId();
        return id && !['woocommerce.settings'].includes(id);
    }),
]);
