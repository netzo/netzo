import { createApi } from "../_create-api/mod.ts";
import { auth } from "../_create-api/auth/mod.ts";
export type {
  AddOrUpdateCustomer,
  AddOrUpdateCustomerResponse,
  Customers,
  Customer,
  QueryCustomers,
  QueryOrders,
  QueryPayouts,
  QueryProducts,
  OrderStatus,
  OrdersByCustomer,
  Orders,
  Order,
  Products,
  Product,
  Payouts,
} from "./types.ts";


export interface ShopifyAdminOptions {
  storeName: string;
  apiVersion: string;
  apiKey: string;
}

/**
 * SDK constructor function for the Shopify Admin API
 *
 * @see https://netzo.io/docs/netzo/apis/shopifyadmin
 *
 * @param {string} storeName - the store name to construct the base URL
 * @param {string} apiVersion - the version to use for the base URL
 * @param {string} apiKey - the API key to use for authentication
 * @returns {object} - an object of multiple utilities for the API
 */
export const shopifyadmin = ({
  storeName = Deno.env.get("SHOPIFY_STORE_NAME")!,
  apiVersion = Deno.env.get("SHOPIFY_API_VERSION")!,
  apiKey = Deno.env.get("SHOPIFY_API_KEY")!,
}: ShopifyAdminOptions) => {
  const api = createApi({
    baseURL: `https://${storeName}.myshopify.com/admin/api/${apiVersion}`,
    headers: {
      "content-type": "application/json",
    },
    async onRequest(ctx) {
      await auth({
        type: "apiKey",
        in: "header",
        name: "X-Shopify-Access-Token",
        value: apiKey,
      }, ctx);
    },
  });

  return { api };
};
