import { defineConfig } from 'sanity'
import { woocommerceSyncPlugin } from 'sanity-plugin-woocommerce-sync'

export default defineConfig({
  name: 'default',
  title: 'My Sanity Project with WooCommerce Sync',
  
  projectId: 'your-project-id',
  dataset: 'production',
  
  plugins: [
    woocommerceSyncPlugin(),
    // ... other plugins
  ],
  
  schema: {
    types: [
      // Your existing schema types
      // The WooCommerce product schema will be automatically added
    ]
  }
}) 