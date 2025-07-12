/**
 * Unit tests for Zebra data utilities
 */

import { 
  zebraCategories,
  featuredProducts,
  getCategoryBySlug,
  getProductsByCategory,
  getProductBySlug,
  getAllProducts,
  getCategoryNames,
  getCategorySlugs
} from '@/lib/zebra-data'

describe('Zebra Data', () => {
  describe('Data Structure', () => {
    it('has correct number of categories', () => {
      expect(zebraCategories).toHaveLength(6)
    })

    it('has correct number of products', () => {
      const allProducts = getAllProducts()
      expect(allProducts.length).toBeGreaterThan(0)
    })

    it('all categories have required fields', () => {
      zebraCategories.forEach(category => {
        expect(category).toHaveProperty('id')
        expect(category).toHaveProperty('name')
        expect(category).toHaveProperty('slug')
        expect(category).toHaveProperty('description')
        expect(category).toHaveProperty('icon')
        expect(category).toHaveProperty('benefits')
        expect(category.benefits.length).toBeGreaterThan(0)
      })
    })

    it('all products have required fields', () => {
      const allProducts = getAllProducts()
      allProducts.forEach(product => {
        expect(product).toHaveProperty('id')
        expect(product).toHaveProperty('name')
        expect(product).toHaveProperty('category')
        expect(product).toHaveProperty('description')
        expect(product).toHaveProperty('slug')
        expect(product).toHaveProperty('features')
        expect(product).toHaveProperty('industries')
        expect(product.features).toBeInstanceOf(Array)
        expect(product.industries).toBeInstanceOf(Array)
      })
    })

    it('has unique category slugs', () => {
      const slugs = zebraCategories.map(cat => cat.slug)
      expect(new Set(slugs).size).toBe(slugs.length)
    })

    it('has unique product slugs', () => {
      const allProducts = getAllProducts()
      const slugs = allProducts.map(prod => prod.slug)
      expect(new Set(slugs).size).toBe(slugs.length)
    })
  })

  describe('getCategoryBySlug', () => {
    it('returns correct category for valid slug', () => {
      const category = getCategoryBySlug('impresoras')
      expect(category).toBeDefined()
      expect(category?.slug).toBe('impresoras')
      expect(category?.name).toBe('Impresoras Industriales')
    })

    it('returns undefined for invalid slug', () => {
      const category = getCategoryBySlug('invalid-slug')
      expect(category).toBeUndefined()
    })

    it('returns undefined for empty slug', () => {
      const category = getCategoryBySlug('')
      expect(category).toBeUndefined()
    })
  })

  describe('getProductsByCategory', () => {
    it('returns products for valid category', () => {
      const products = getProductsByCategory('impresoras')
      expect(products.length).toBeGreaterThan(0)
      products.forEach(product => {
        expect(product.category).toBe('impresoras')
      })
    })

    it('returns empty array for invalid category', () => {
      const products = getProductsByCategory('invalid-category')
      expect(products).toEqual([])
    })

    it('returns empty array for empty category', () => {
      const products = getProductsByCategory('')
      expect(products).toEqual([])
    })
  })

  describe('getProductBySlug', () => {
    it('returns correct product for valid slug', () => {
      const product = getProductBySlug('zt411')
      expect(product).toBeDefined()
      expect(product?.slug).toBe('zt411')
    })

    it('returns undefined for invalid slug', () => {
      const product = getProductBySlug('invalid-slug')
      expect(product).toBeUndefined()
    })

    it('returns undefined for empty slug', () => {
      const product = getProductBySlug('')
      expect(product).toBeUndefined()
    })
  })

  describe('featuredProducts', () => {
    it('returns featured products array', () => {
      expect(featuredProducts).toBeInstanceOf(Array)
      expect(featuredProducts.length).toBeGreaterThan(0)
    })

    it('all featured products have required fields', () => {
      featuredProducts.forEach(product => {
        expect(product).toHaveProperty('id')
        expect(product).toHaveProperty('name')
        expect(product).toHaveProperty('category')
        expect(product).toHaveProperty('description')
        expect(product).toHaveProperty('slug')
        expect(product).toHaveProperty('features')
        expect(product).toHaveProperty('industries')
      })
    })

    it('featured products come from different categories', () => {
      const categories = [...new Set(featuredProducts.map(p => p.category))]
      expect(categories.length).toBeGreaterThan(1)
    })
  })

  describe('getAllProducts', () => {
    it('returns all products from all categories', () => {
      const allProducts = getAllProducts()
      expect(allProducts.length).toBeGreaterThan(0)
      
      // Should have products from each category
      const categoryProductCounts = zebraCategories.map(cat => cat.products.length)
      const totalExpected = categoryProductCounts.reduce((sum, count) => sum + count, 0)
      expect(allProducts.length).toBe(totalExpected)
    })

    it('returns products with different categories', () => {
      const allProducts = getAllProducts()
      const categories = [...new Set(allProducts.map(p => p.category))]
      expect(categories.length).toBeGreaterThan(1)
    })
  })

  describe('getCategoryNames', () => {
    it('returns array of category names', () => {
      const names = getCategoryNames()
      expect(names).toBeInstanceOf(Array)
      expect(names.length).toBe(zebraCategories.length)
      expect(names).toContain('Impresoras Industriales')
      expect(names).toContain('Escáneres de Códigos de Barras')
    })
  })

  describe('getCategorySlugs', () => {
    it('returns array of category slugs', () => {
      const slugs = getCategorySlugs()
      expect(slugs).toBeInstanceOf(Array)
      expect(slugs.length).toBe(zebraCategories.length)
      expect(slugs).toContain('impresoras')
      expect(slugs).toContain('scanners')
    })
  })

  describe('Data Consistency', () => {
    it('all products belong to valid categories', () => {
      const validCategories = zebraCategories.map(cat => cat.slug)
      const allProducts = getAllProducts()
      allProducts.forEach(product => {
        expect(validCategories).toContain(product.category)
      })
    })

    it('all categories have at least one product', () => {
      zebraCategories.forEach(category => {
        const products = getProductsByCategory(category.slug)
        expect(products.length).toBeGreaterThan(0)
      })
    })

    it('product industries are consistent', () => {
      const validIndustries = ['Automotriz', 'Electrónica', 'Textil', 'Logística', 'Manufactura', 'Farmacéutica', 'Retail', 'Almacén', 'Inventario', 'Seguridad']
      const allProducts = getAllProducts()
      allProducts.forEach(product => {
        product.industries.forEach(industry => {
          expect(validIndustries).toContain(industry)
        })
      })
    })

    it('all products have at least one feature', () => {
      const allProducts = getAllProducts()
      allProducts.forEach(product => {
        expect(product.features.length).toBeGreaterThan(0)
      })
    })

    it('all products have at least one industry', () => {
      const allProducts = getAllProducts()
      allProducts.forEach(product => {
        expect(product.industries.length).toBeGreaterThan(0)
      })
    })
  })
})