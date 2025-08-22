import { useEffect } from 'react'
import { useCallback, useState } from 'react'
import { Button, Card, Flex, Stack, Text, useToast } from '@sanity/ui'
import type { InputProps } from 'sanity'
import { useClient, useFormValue } from 'sanity'
import { getApiBaseUrl, getFetchProductPath } from '../lib/config'

export type WooCommerceFetchButtonInputProps = InputProps & {
	document?: any
}

export function WooCommerceFetchButton(props: WooCommerceFetchButtonInputProps) {
	const { schemaType } = props as any
	const toast = useToast()
	const [loading, setLoading] = useState(false)
	const client = useClient({ apiVersion: '2025-01-01' })

	// State to store WooCommerce settings
	const [woocommerceSettings, setWooCommerceSettings] = useState<any>(null)
	const [isLoadingSettings, setIsLoadingSettings] = useState(true)

	// Fetch WooCommerce settings using GROQ
	useEffect(() => {
		const fetchWooCommerceSettings = async () => {
			try {
				const query = `*[_type == "woocommerce.settings"][0]{
					storeUrl,
					consumerKey,
					consumerSecret,
				}`
				
				const settings = await client.fetch(query)
				setWooCommerceSettings(settings)
			} catch (error) {
				console.error('Error fetching WooCommerce settings:', error)
			} finally {
				setIsLoadingSettings(false)
			}
		}

		fetchWooCommerceSettings()
	}, [client])

	// Get WooCommerce Product ID value from the form context
	const wooIdValue = useFormValue(['wooId']) as number || 0
	const documentID = useFormValue(['_id']) as string || null

	const handleFetchFromWooCommerce = useCallback(async () => {
		if (!wooIdValue) {
			toast.push({
				status: 'warning',
				title: 'Product ID Required',
				description: 'Please enter a WooCommerce Product ID first'
			})
			return
		}

		if (!woocommerceSettings?.storeUrl || !woocommerceSettings?.consumerKey || !woocommerceSettings?.consumerSecret) {
			toast.push({
				status: 'warning',
				title: 'Missing WooCommerce Settings',
				description: 'Please configure WooCommerce API credentials first'
			})
			return
		}

		if (!documentID) {
			toast.push({
				status: 'error',
				title: 'Document Not Found',
				description: 'Cannot update document - document ID not available. Please save the document first.'
			})
			return
		}

		setLoading(true)

		try {
			const apiUrl = `${getApiBaseUrl()}${getFetchProductPath()}`
			const response = await fetch(apiUrl, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ productId: wooIdValue })
			})

			if (!response.ok) {
				const errorData = await response.json().catch(() => ({}))
				throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`)
			}

			const result = await response.json()
			
			if (result.success) {
				const updateData = {
					title: result.product.name,
          slug: { current: result.product.slug },
					primaryImage: result.product.images && result.product.images.length > 0 ? result.product.images[0].src : '',
					permalink: result.product.permalink,
					shortDescription: result.product.short_description ? result.product.short_description.replace(/<[^>]*>/g, '') : '',
					type: result.product.type,
					featured: result.product.featured || false,
					sku: result.product.sku || '',
					regularPrice: result.product.regular_price || '',
					salePrice: result.product.sale_price || '',
					price: result.product.price || '',
					averageRating: result.product.average_rating ? parseFloat(result.product.average_rating) : 0,
					ratingCount: result.product.rating_count || 0,
					stockStatus: result.product.stock_status || 'instock',
					lastSyncedAt: new Date().toISOString()
				}

				// Patch the exact current document ID (drafts.* or published)
				await client.patch(documentID).set(updateData).commit()
				
				toast.push({
					status: 'success',
					title: 'Product Fetched Successfully!',
					description: `Fields have been updated for product ID: ${wooIdValue}`
				})
			} else {
				throw new Error(result.error || 'Failed to fetch product data')
			}
		} catch (error: any) {
			console.error('Error in handleFetchFromWooCommerce:', error)
			toast.push({
				status: 'error',
				title: 'Fetch Failed',
				description: error?.message || 'Unknown error occurred'
			})
		} finally {
			setLoading(false)
		}
	}, [wooIdValue, woocommerceSettings, client, toast, documentID])

	return (
		<Card padding={3} tone="primary" radius={2} shadow={1}>
			<Stack space={3}>				
				<Flex gap={2}>
					<Button
						text={schemaType.title}
						tone="positive"
						disabled={!wooIdValue || loading || isLoadingSettings}
						onClick={handleFetchFromWooCommerce}
						loading={loading}
					/>
				</Flex>
				
				<Text size={1} muted>
					{isLoadingSettings 
						? 'Loading WooCommerce settings...'
						: !woocommerceSettings?.storeUrl 
						? 'Please configure WooCommerce API credentials first'
						: !wooIdValue 
						? 'Enter a WooCommerce Product ID above, then click "Fetch from WooCommerce"'
						: loading
						? 'Fetching product data from WooCommerce...'
						: `Ready to fetch product data for ID: ${wooIdValue}`
					}
				</Text>
				
				{wooIdValue && !loading && !isLoadingSettings && (
					<Text size={1} muted>
						✅ Product ID entered: {wooIdValue}
					</Text>
				)}
			</Stack>
		</Card>
	)
}
