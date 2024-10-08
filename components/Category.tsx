import React from 'react'

const Category = () => {
  return (
    <div className='border p-3 rounded-md mb-5'>
        <ul className='flex gap-x-4'>
            <li className='bg-teal-600 py-2 px-4 rounded-md text-white text-sm'>Semua</li>
            <li className='py-2 px-4 rounded-md text-sm'>Makanan</li>
            <li className='py-2 px-4 rounded-md text-sm'>Minuman</li>
        </ul>
    </div>
  )
}

export default Category