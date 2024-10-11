import React, { ChangeEvent, useState } from 'react'

interface NavbarProps {
  onSearch: (products: any[]) => void
}

const Navbar = ({ onSearch }: NavbarProps) => {
  const [query, setQuery] = useState<string>('')

  const handleChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const newQuery = event.target.value
    setQuery(newQuery)

    if (newQuery) {
      try {
        const response = await fetch(`/api/products?search=${newQuery}`)
        const result = await response.json()
        onSearch(result.data)
      } catch (error) {
        console.error('Error fetching products:', error)
      }
    } else {
      onSearch([])
    }
  }
  return (
    <header className="fixed w-full">
      <nav className="flex justify-center items-center h-16 bg-teal-600">
        <div className="flex ml-5 items-center w-full">
          <input
            type="text"
            value={query}
            onChange={handleChange}
            placeholder="Cari sesuatu..."
            className="border rounded-lg py-2 px-4 mr-2 w-full max-w-xl focus:outline-none focus:ring-0"
          />
        </div>
      </nav>
    </header>
  )
}

export default Navbar
