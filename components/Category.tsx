import React, { useEffect, useState } from 'react'

interface Category {
  id: number
  name: string
}

interface CategoryProps {
  onCategoryClick: (categoryId: number) => void
}

const Category = ({ onCategoryClick }: CategoryProps) => {
  const [activeCategory, setActiveCategory] = useState<number>(0)
  const [categories, setCategories] = useState<Category[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/category')
        if (!response.ok) {
          throw new Error('Failed to fetch categories')
        }
        const result = await response.json()
        setCategories(result.data)
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message)
        } else {
          setError('An unknown error occurred')
        }
      }
    }

    fetchCategories()
  }, [])

  const handleCategoryClick = (categoryId: number) => {
    setActiveCategory(categoryId)
    onCategoryClick(categoryId)
  }

  const handleAllClick = () => {
    setActiveCategory(0)
    onCategoryClick(0)
  }

  return (
    <div className="border p-3 rounded-md mb-5">
      {error && <p className="text-red-500">{error}</p>}
      <ul className="flex gap-x-4">
        <li
          onClick={handleAllClick}
          className={`py-2 px-4 rounded-md text-sm cursor-pointer ${activeCategory === 0 ? 'bg-teal-600 text-white' : ''}`}
        >
          Semua
        </li>
        {categories.map(category => (
          <li
            key={category.id}
            onClick={() => handleCategoryClick(category.id)}
            className={`py-2 px-4 rounded-md text-sm cursor-pointer ${activeCategory === category.id ? 'bg-teal-600 text-white' : ''}`}
          >
            {category.name}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Category
