# Sanity WooCommerce Sync Plugin

A professional Sanity Studio v4 plugin that allows you to sync your WooCommerce products to Sanity Studio. This plugin provides a clean, enterprise-grade solution for WooCommerce integration with comprehensive error handling, real-time form updates, and modern React components.

## ✨ Features

- **WooCommerce Settings Schema** - Singleton configuration for API credentials
- **Product Schema** - Comprehensive product data structure with all essential fields
- **Test Connection** - Verify WooCommerce API connectivity with real-time feedback
- **Fetch Products** - Import individual products by ID with automatic field population
- **Debug Tools** - Comprehensive debugging and logging for troubleshooting
- **Modern Architecture** - Built with Sanity v4 best practices and TypeScript
- **Real-time Updates** - Form fields update in real-time using Sanity's useFormValue
- **Error Handling** - Comprehensive error handling with user-friendly messages

## 📸 Screenshots

### Plugin Interface
- [WooCommerce Settings Configuration](https://share.cleanshot.com/VpbFjZCppqK1Plmwmdrb) - Configure API credentials and test connection
(screenshots/api-settings.jpeg)

- [Product Fetch Interface](https://share.cleanshot.com/5vCFQvYzT8Q90DrSm7vR) - Import products with real-time field updates
- [Debug Tools](https://share.cleanshot.com/lC5bLd4ydgVqTY7Tyw76) - Troubleshooting and configuration inspection

---

## 🚀 Installation

```bash
npm install @multidots/sanity-plugin-woocommerce-sync
```

## ⚙️ Configuration

### 1. Add Plugin to Sanity Config

```typescript
// sanity.config.ts
import { defineConfig } from 'sanity'
import { woocommerceSyncPlugin } from '@multidots/sanity-plugin-woocommerce-sync'

export default defineConfig({
  // ... other config
  plugins: [
    woocommerceSyncPlugin(),
    // ... other plugins
  ],
})
```

### 2. Environment Variables Setup

**CRITICAL**: You must set up these environment variables in your Sanity Studio root `.env.local` file:

```bash
# .env.local (in Sanity Studio root)
SANITY_STUDIO_WOOCOMMERCE_API_URL=http://localhost:3001
SANITY_STUDIO_WOOCOMMERCE_TEST_CONNECTION_PATH=/api/woocommerce/test-connection
SANITY_STUDIO_WOOCOMMERCE_FETCH_PRODUCT_PATH=/api/woocommerce/fetch-product
```

**Important Notes:**
- These environment variables are **MANDATORY** - the plugin will throw errors if they're missing
- The API server URL should point to your Next.js/Express server that handles WooCommerce API calls
- The paths should match your server-side API route endpoints
- Environment variables must be prefixed with `SANITY_STUDIO_` to be accessible in Sanity Studio

### 3. Configure WooCommerce Settings

1. Go to **Structure** → **WooCommerce Settings**
2. Fill in your WooCommerce API credentials:
   - **Store URL** - Your WooCommerce store URL (e.g., `https://yourstore.com`)
   - **Consumer Key** - WooCommerce REST API Consumer Key
   - **Consumer Secret** - WooCommerce REST API Consumer Secret
   - **Test Product ID** - A valid product ID for testing connection

3. **Test Connection** - Use the "Test WooCommerce Connection" button to verify your credentials
4. **Debug Document** - Use the "Debug Document" button to inspect configuration state

## 📊 Schema Overview

### WooCommerce Settings Schema (`woocommerce.settings`)

A singleton schema that stores your WooCommerce API configuration:

```typescript
{
  storeUrl: string          // Store URL (required)
  consumerKey: string       // API Consumer Key (required)
  consumerSecret: string    // API Consumer Secret (required)
  testProductId: number     // Test product ID for connection testing (required)
}
```

### WooCommerce Product Schema (`woocommerce.product`)

Comprehensive product data structure with all essential fields:

```typescript
{
  wooId: number             // WooCommerce Product ID (required)
  title: string             // Product title
  slug: slug                // Product slug (auto-generated from title)
  primaryImage: string      // Primary image URL
  permalink: string         // Direct link to product on WooCommerce
  shortDescription: string  // Short description (HTML stripped)
  type: string              // Product type: 'simple', 'variable', 'grouped', 'external'
  featured: boolean         // Featured product status
  sku: string               // Stock keeping unit
  regularPrice: string      // Regular price
  salePrice: string         // Sale price
  price: string             // Current selling price
  averageRating: number     // Average customer rating (0-5)
  ratingCount: number       // Number of customer ratings
  stockStatus: string       // Stock status: 'instock', 'outofstock', 'onbackorder'
  lastSyncedAt: datetime    // Last sync timestamp (read-only)
}
```

## 🔌 Server-Side API Requirements

### Required API Endpoints

Your server must provide these endpoints that the plugin will call:

#### 1. Test Connection Endpoint

**URL**: `{API_BASE_URL}{TEST_CONNECTION_PATH}`
**Method**: `POST`
**Body**:
```json
{
  "testProductId": 123
}
```

**Expected Response**:
```json
{
  "success": true,
  "testProduct": {
    "id": 123,
    "name": "Product Name",
    "type": "simple",
    "featured": false,
    "sku": "PROD-123",
    "regular_price": "29.99",
    "sale_price": "24.99",
    "price": "24.99",
    "average_rating": "4.5",
    "rating_count": 128,
    "stock_status": "instock"
  },
  "storeInfo": {
    "productCount": 150
  }
}
```

#### 2. Fetch Product Endpoint

**URL**: `{API_BASE_URL}{FETCH_PRODUCT_PATH}`
**Method**: `POST`
**Body**:
```json
{
  "productId": 123
}
```

**Expected Response**:
```json
{
  "success": true,
  "product": {
    "id": 123,
    "name": "Product Name",
    "slug": "product-name",
    "type": "simple",
    "featured": false,
    "sku": "PROD-123",
    "regular_price": "29.99",
    "sale_price": "24.99",
    "price": "24.99",
    "average_rating": "4.5",
    "rating_count": 128,
    "stock_status": "instock",
    "permalink": "https://yourstore.com/product/product-name",
    "short_description": "Product description without HTML tags",
    "images": [
      {
        "src": "https://yourstore.com/wp-content/uploads/image.jpg"
      }
    ]
  }
}
```

### Server Implementation Example (Next.js)

```typescript
// pages/api/woocommerce/test-connection.ts
import { NextApiRequest, NextApiResponse } from 'next'
import WooCommerceRestApi from '@woocommerce/woocommerce-rest-api'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { testProductId } = req.body
    
    // Initialize WooCommerce API client
    const WooCommerce = new WooCommerceRestApi({
      url: process.env.WOOCOMMERCE_STORE_URL!,
      consumerKey: process.env.WOOCOMMERCE_CONSUMER_KEY!,
      consumerSecret: process.env.WOOCOMMERCE_CONSUMER_SECRET!,
      version: 'wc/v3'
    })

    // Fetch test product
    const productResponse = await WooCommerce.get(`products/${testProductId}`)
    const product = productResponse.data

    // Get store info
    const productsResponse = await WooCommerce.get('products')
    const productCount = productsResponse.headers['x-wp-total']

    res.status(200).json({
      success: true,
      testProduct: {
        id: product.id,
        name: product.name,
        type: product.type,
        featured: product.featured,
        sku: product.sku,
        regular_price: product.regular_price,
        sale_price: product.sale_price,
        price: product.price,
        average_rating: product.average_rating,
        rating_count: product.rating_count,
        stock_status: product.stock_status
      },
      storeInfo: {
        productCount: parseInt(productCount)
      }
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    })
  }
}
```

## 🎨 Frontend Integration

### 1. Install Dependencies

```bash
npm install @sanity/client @sanity/image-url
```

### 2. Create WooCommerce Product Display Component

```typescript
// components/WooCommerceProductDisplay.tsx
import React, { useState, useEffect } from 'react'

export interface WooCommerceProduct {
  _id: string
  wooId: number
  title: string
  slug: { current: string }
  primaryImage: string
  permalink: string
  shortDescription: string
  type: 'simple' | 'variable' | 'grouped' | 'external'
  featured: boolean
  sku: string
  regularPrice: string
  salePrice: string
  price: string
  averageRating: number
  ratingCount: number
  stockStatus: 'instock' | 'outofstock' | 'onbackorder'
  lastSyncedAt: string
}

export function WooCommerceProductDisplay({ 
  referenceId, 
  layout = 'card' 
}: { 
  referenceId: string
  layout?: 'card' | 'horizontal' | 'minimal' 
}) {
  const [product, setProduct] = useState<WooCommerceProduct | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!referenceId) return

    setLoading(true)
    setError(null)

    // Fetch product from your API route (not directly from Sanity to avoid CORS)
    fetch('/api/woocommerce/product-lookup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ referenceId })
    })
      .then(response => response.json())
      .then(result => {
        if (result.success) {
          setProduct(result.product)
        } else {
          setError(result.error || 'Product not found')
        }
      })
      .catch(err => {
        setError(`Failed to fetch product: ${err.message}`)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [referenceId])

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>
  if (!product) return <div>No product found</div>

  // Render product based on layout
  return (
    <div className="woocommerce-product">
      <h3>{product.title}</h3>
      <p>{product.shortDescription}</p>
      <div className="price">{product.price}</div>
      {/* Add more product display logic */}
    </div>
  )
}
```

### 3. Create Product Lookup API Route

```typescript
// pages/api/woocommerce/product-lookup.ts
import { NextApiRequest, NextApiResponse } from 'next'
import { createClient } from '@sanity/client'

const sanityClient = createClient({
  projectId: process.env.SANITY_PROJECT_ID!,
  dataset: process.env.SANITY_DATASET!,
  apiVersion: '2025-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN!
})

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { referenceId } = req.body

    // Extract UUID from reference ID (remove document type prefix)
    const documentId = referenceId.replace(/^[^.]+\./, '')

    const product = await sanityClient.fetch(`
      *[_type == "woocommerce.product" && _id == $documentId][0]{
        _id,
        wooId,
        title,
        slug,
        primaryImage,
        permalink,
        shortDescription,
        type,
        featured,
        sku,
        regularPrice,
        salePrice,
        price,
        averageRating,
        ratingCount,
        stockStatus,
        lastSyncedAt
      }
    `, { documentId })

    if (!product) {
      return res.status(404).json({
        success: false,
        error: 'Product not found'
      })
    }

    res.status(200).json({
      success: true,
      product
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    })
  }
}
```

## 🚨 Troubleshooting

### Common Issues and Solutions

#### 1. Environment Variables Not Found

**Error**: `SANITY_STUDIO_WOOCOMMERCE_API_URL environment variable is not defined`

**Solution**: 
- Ensure environment variables are in `.env.local` file in Sanity Studio root
- Variables must be prefixed with `SANITY_STUDIO_`
- Restart Sanity Studio after adding environment variables

#### 2. CORS Issues

**Problem**: Frontend components can't fetch data directly from Sanity Studio

**Solution**: 
- **Never fetch directly from Sanity in frontend components**
- Always route requests through your server-side API routes
- This prevents CORS issues and improves security

#### 3. API Connection Failures

**Error**: "API Test Failed" or "Fetch Failed"

**Solutions**:
- Verify WooCommerce API credentials are correct
- Check if WooCommerce REST API is enabled
- Ensure test product ID exists in WooCommerce
- Check server logs for detailed error messages

#### 4. Document Update Failures

**Error**: "Document Not Found" when fetching products

**Solution**:
- Save the document first before using the fetch button
- The plugin needs a valid document ID to update fields
- Ensure you're working with a published or draft document

#### 5. TypeScript Errors

**Error**: Type mismatches or missing types

**Solution**:
- Ensure all dependencies are properly installed
- Check that TypeScript version is compatible (^5.0.0)
- Verify all imports are correct

### Debug Tools

The plugin includes built-in debugging tools:

1. **Debug Document Button** - Shows current form state and configuration
2. **Console Logging** - Detailed logging for troubleshooting
3. **Toast Notifications** - User-friendly error and success messages

## 📋 Requirements

### Sanity Studio
- Sanity v4 or later
- Node.js 18+ 
- TypeScript support

### WooCommerce
- WooCommerce 3.0+
- REST API enabled
- Valid API credentials (Consumer Key/Secret)

### Server Requirements
- Node.js server (Next.js, Express, etc.)
- WooCommerce REST API client
- CORS properly configured
- Environment variables for WooCommerce credentials

## 🔧 Development

### Building the Plugin

```bash
npm run build
```

### Development Mode

```bash
npm run dev
```

### Clean Build

```bash
npm run clean
npm run build
```

## 📄 License

MIT License.



## 📞 Support

For issues and questions:
- Check the troubleshooting section above
- Review the debug tools in the plugin

---

**Note**: This plugin is designed for production use and follows modern Sanity v4 best practices. Ensure all environment variables are properly configured before use.
