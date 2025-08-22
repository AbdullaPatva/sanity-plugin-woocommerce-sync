export declare const schemas: (({
    type: "document";
    name: "woocommerce.settings";
} & Omit<import("sanity").DocumentDefinition, "preview"> & {
    preview?: import("sanity").PreviewConfig<Record<string, string>, Record<never, any>> | undefined;
}) | ({
    type: "document";
    name: "woocommerce.product";
} & Omit<import("sanity").DocumentDefinition, "preview"> & {
    preview?: import("sanity").PreviewConfig<Record<string, string>, Record<never, any>> | undefined;
}) | ({
    type: "string";
    name: "woocommerceFetchButton";
} & Omit<import("sanity").StringDefinition, "preview">))[];
export default schemas;
