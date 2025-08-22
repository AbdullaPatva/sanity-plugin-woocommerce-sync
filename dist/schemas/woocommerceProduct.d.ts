export declare const woocommerceProductSchema: {
    type: "document";
    name: "woocommerce.product";
} & Omit<import("sanity").DocumentDefinition, "preview"> & {
    preview?: import("sanity").PreviewConfig<Record<string, string>, Record<never, any>> | undefined;
};
