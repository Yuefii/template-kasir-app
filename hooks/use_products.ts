import { useState, useEffect } from 'react'

interface Product {
  id: number
  name: string
  price: number
}

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [searchResults, setSearchResults] = useState<Product[]>([])

  const fetchAllProducts = async () => {
    try {
      const response = await fetch('/api/products')
      if (!response.ok) throw new Error('Failed to fetch products')
      const result = await response.json()
      setProducts(result.data)
    } catch (err) {
      console.error(err)
    }
  }

  const fetchProductsByCategory = async (categoryId: number) => {
    if (categoryId === 0) {
      await fetchAllProducts()
      return
    }

    try {
      const response = await fetch(`/api/products?category_id=${categoryId}`)
      if (!response.ok) throw new Error('Failed to fetch products')
      const result = await response.json()
      setProducts(result.data)
    } catch (err) {
      console.error(err)
    }
  }

  const handleSearchResults = (results: Product[]) => {
    setSearchResults(results)
  }

  useEffect(() => {
    fetchAllProducts()
  }, [])

  return {
    products,
    searchResults,
    fetchProductsByCategory,
    handleSearchResults
  }
}
