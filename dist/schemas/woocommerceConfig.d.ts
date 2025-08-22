export declare const woocommerceConfigSchema: {
    type: "document";
    name: "woocommerce.settings";
} & Omit<import("sanity").DocumentDefinition, "preview"> & {
    preview?: import("sanity").PreviewConfig<Record<string, string>, Record<never, any>> | undefined;
};
