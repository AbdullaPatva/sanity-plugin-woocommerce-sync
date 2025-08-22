export const woocommerceConfigKeys = [
  { key: 'storeUrl', title: 'Store URL', type: 'url' },
  { key: 'consumerKey', title: 'Consumer Key', type: 'string' },
  { key: 'consumerSecret', title: 'Consumer Secret', type: 'string' }
]

export const PLUGIN_NAMESPACE = 'sanity-woocommerce-sync'

export const WOOCOMMERCE_API_BASE = '/wp-json/wc/v3'
export const MAX_PRODUCTS_PER_PAGE = 100
export const RATE_LIMIT_DELAY = 1000 // 1 second delay between requests

export interface WooCommerceConfig {
  storeUrl: string
  consumerKey: string
  consumerSecret: string
}

export interface WooCommerceProduct {
  id: number
  name: string
  slug: string
  type: 'simple' | 'variable' | 'grouped' | 'external'
  status: 'draft' | 'pending' | 'private' | 'publish'
  description: string
  short_description: string
  price: string
  regular_price: string
  sale_price: string
  sku: string
  stock_status: 'instock' | 'outofstock' | 'onbackorder'
  categories: Array<{
    id: number
    name: string
    slug: string
  }>
  tags: Array<{
    id: number
    name: string
    slug: string
  }>
  images: Array<{
    id: number
    src: string
    name: string
    alt: string
  }>
  attributes: Array<{
    id: number
    name: string
    options: string[]
  }>
  variations?: WooCommerceProductVariation[]
}

export interface WooCommerceProductVariation {
  id: number
  sku: string
  price: string
  regular_price: string
  sale_price: string
  stock_status: 'instock' | 'outofstock' | 'onbackorder'
  attributes: Array<{
    name: string
    option: string
  }>
  image?: {
    id: number
    src: string
    name: string
    alt: string
  }
}

export interface SyncProgress {
  current: number
  total: number
  status: 'idle' | 'syncing' | 'completed' | 'error'
  message: string
  lastSyncedPage?: number
} 