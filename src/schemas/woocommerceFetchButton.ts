import { defineType } from 'sanity'
import { WooCommerceFetchButton } from '../inputs/WooCommerceFetchButton'

export const woocommerceFetchButtonSchema = defineType({
  name: 'woocommerceFetchButton',
  title: 'WooCommerce Fetch Button',
  type: 'string',
  readOnly: true,
  components: {
    input: WooCommerceFetchButton,
  },
}) 