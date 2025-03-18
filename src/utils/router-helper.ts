// Note: Fungsi helper buat generate route path

/**
 * Generate a route path for a company page
 * @param companyId - The ID of the company
 * @returns The route path for the company page
 */
export const getCompanyRoute = (companyId: number | string): string => {
  return `/company/${companyId}`
}

/**
 * Generate a route path for a product page
 * @param productId - The ID of the product
 * @returns The route path for the product page
 */
export const getProductRoute = (productId: number | string): string => {
  return `/product/${productId}`
}
