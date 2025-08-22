import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useCallback } from 'react';
import { Button, Card, Flex, Stack, Text, useToast } from '@sanity/ui';
import { useFormValue } from 'sanity';
import { getApiBaseUrl, getTestConnectionPath } from '../lib/config';
export function WooCommerceSettingsActions(props) {
    const { schemaType } = props;
    const toast = useToast();
    const [loading, setLoading] = useState(false);
    // ✅ Real-time field values using useFormValue
    const storeUrl = useFormValue(['storeUrl']);
    const consumerKey = useFormValue(['consumerKey']);
    const consumerSecret = useFormValue(['consumerSecret']);
    const testProductId = useFormValue(['testProductId']);
    // ✅ Computed values that update in real-time
    const hasCredentials = Boolean(storeUrl && consumerKey && consumerSecret);
    const isReadyToTest = hasCredentials && testProductId;
    return (_jsx(Card, { padding: 3, tone: "primary", radius: 2, shadow: 1, children: _jsxs(Stack, { space: 3, children: [_jsx(Text, { size: 1, muted: true, children: schemaType.title || 'Actions' }), _jsxs(Flex, { gap: 2, children: [_jsx(Button, { text: "Test WooCommerce Connection", tone: "positive", disabled: !isReadyToTest || loading, onClick: useCallback(async () => {
                                if (!hasCredentials) {
                                    toast.push({
                                        status: 'warning',
                                        title: 'Missing Credentials',
                                        description: 'Please fill in all required fields first'
                                    });
                                    return;
                                }
                                if (!testProductId) {
                                    toast.push({
                                        status: 'warning',
                                        title: 'Missing Test Product ID',
                                        description: 'Please enter a test product ID to test the connection'
                                    });
                                    return;
                                }
                                setLoading(true);
                                try {
                                    const apiUrl = `${getApiBaseUrl()}${getTestConnectionPath()}`;
                                    const response = await fetch(apiUrl, {
                                        method: 'POST',
                                        headers: {
                                            'Content-Type': 'application/json',
                                        },
                                        body: JSON.stringify({
                                            testProductId
                                        })
                                    });
                                    if (!response.ok) {
                                        const errorData = await response.json().catch(() => ({}));
                                        throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`);
                                    }
                                    const result = await response.json();
                                    if (result.success) {
                                        const productName = result.testProduct?.name || 'Unknown Product';
                                        const productId = result.testProduct?.id || testProductId;
                                        const productCount = result.storeInfo?.productCount || 0;
                                        toast.push({
                                            status: 'success',
                                            title: 'WooCommerce API Test Successful!',
                                            description: `Connected to store with ${productCount} products. Test product &quot;${productName}&quot; (ID: ${productId}) fetched successfully!`
                                        });
                                    }
                                    else {
                                        throw new Error(result.error || 'API test failed');
                                    }
                                }
                                catch (error) {
                                    toast.push({
                                        status: 'error',
                                        title: 'API Test Failed',
                                        description: error?.message || 'Unknown error occurred'
                                    });
                                }
                                finally {
                                    setLoading(false);
                                }
                            }, [hasCredentials, testProductId, toast]), loading: loading }), _jsx(Button, { text: "Debug Document", tone: "caution", disabled: false, onClick: useCallback(() => {
                                console.log('=== DEBUG DOCUMENT STATE ===');
                                console.log('Store URL:', storeUrl);
                                console.log('Consumer Key:', consumerKey ? `${consumerKey.substring(0, 8)}...` : 'Not set');
                                console.log('Consumer Secret:', consumerSecret ? `${consumerSecret.substring(0, 8)}...` : 'Not set');
                                console.log('Test Product ID:', testProductId);
                                console.log('Has Credentials:', hasCredentials);
                                console.log('Ready to Test:', isReadyToTest);
                                console.log('========================================');
                                // Create a detailed debug summary for the toast
                                const debugSummary = [
                                    `Store URL: ${storeUrl || 'Not set'}`,
                                    `Consumer Key: ${consumerKey ? `${consumerKey.substring(0, 8)}...` : 'Not set'}`,
                                    `Consumer Secret: ${consumerSecret ? `${consumerSecret.substring(0, 8)}...` : 'Not set'}`,
                                    `Test Product ID: ${testProductId || 'Not set'}`,
                                    `Has Credentials: ${hasCredentials ? '✅ Yes' : '❌ No'}`,
                                    `Ready to Test: ${isReadyToTest ? '✅ Yes' : '❌ No'}`
                                ].join('\n');
                                toast.push({
                                    status: 'info',
                                    title: 'Document State',
                                    description: debugSummary
                                });
                            }, [storeUrl, consumerKey, consumerSecret, testProductId, hasCredentials, isReadyToTest, toast]) })] }), _jsx(Text, { size: 1, muted: true, children: !hasCredentials
                        ? 'Fill in API credentials first, then provide a test product ID to test the connection.'
                        : !testProductId
                            ? 'Provide a test product ID to test the WooCommerce API connection.'
                            : 'Ready to test WooCommerce API connection!' }), isReadyToTest && (_jsxs(Text, { size: 1, muted: true, children: ["\u2705 Ready to test with store: ", storeUrl] })), loading && (_jsx(Text, { size: 1, muted: true, children: "\u23F3 Testing WooCommerce connection..." })), _jsxs(Card, { padding: 2, tone: "caution", radius: 1, children: [_jsxs(Text, { size: 1, muted: true, children: ["\uD83D\uDCCB ", _jsx("strong", { children: "Publishing Status:" }), hasCredentials && testProductId
                                    ? ' ✅ All fields filled - Ready to test connection'
                                    : ' ⚠️ Fill in all required fields first'] }), _jsxs(Text, { size: 1, muted: true, style: { marginTop: '8px' }, children: ["\uD83D\uDCA1 ", _jsx("strong", { children: "Remember:" }), " After changing any settings, click the \"Publish\" button to publish your changes."] })] })] }) }));
}
