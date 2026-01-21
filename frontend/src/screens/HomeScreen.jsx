import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const HomeScreen = () => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get('/api/products')
        setProducts(data)
      } catch (error) {
        console.error('Error fetching products:', error)
      }
    }
    fetchProducts()
  }, [])

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Latest Products</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {/* The '&&' ensures we only map if products exists and is an array */}
        {products && Array.isArray(products) && products.map((product) => (
          <div key={product._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow border border-gray-100">
            <Link to={`/product/${product._id}`}>
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-48 object-cover hover:opacity-90 transition-opacity"
              />
            </Link>
            <div className="p-4">
              <Link to={`/product/${product._id}`}>
                <h2 className="text-xl font-semibold text-gray-700 truncate hover:text-indigo-600">
                  {product.name}
                </h2>
              </Link>
              <p className="text-2xl font-bold text-indigo-600 mt-2">${product.price}</p>
              <button className="w-full mt-4 bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition-colors">
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default HomeScreen