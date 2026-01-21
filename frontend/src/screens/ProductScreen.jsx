import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom' // Added useNavigate
import { useDispatch } from 'react-redux' // Added useDispatch
import axios from 'axios'
import { addToCart } from '../slices/cartSlice' // Import the action

const ProductScreen = () => {
  const { id: productId } = useParams()
  const [product, setProduct] = useState(null)
  
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await axios.get(`/api/products/${productId}`)
      setProduct(data)
    }
    fetchProduct()
  }, [productId])

  // Function to handle Add to Cart
  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty: 1 }))
    navigate('/cart') // Redirect to cart page after adding
  }

  if (!product) return <div className="p-10 text-center">Loading...</div>

  return (
    <div className="container mx-auto px-4 py-8">
      <Link className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300 transition mb-6 inline-block" to="/">
        Go Back
      </Link>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-6">
        <div className="rounded-xl overflow-hidden shadow-lg border">
          <img src={product.image} alt={product.name} className="w-full object-cover" />
        </div>

        <div className="flex flex-col">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">{product.name}</h1>
          <hr className="my-4" />
          <p className="text-2xl font-bold text-indigo-600 mb-4">${product.price}</p>
          <p className="text-gray-600 leading-relaxed mb-6">{product.description}</p>
          
          <div className="border rounded-lg p-6 bg-white shadow-sm">
            <div className="flex justify-between mb-4">
              <span>Status:</span>
              <span className={product.countInStock > 0 ? 'text-green-600 font-bold' : 'text-red-600 font-bold'}>
                {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>
            
            <button 
              onClick={addToCartHandler} // Added click handler
              disabled={product.countInStock === 0}
              className="w-full bg-indigo-600 text-white py-3 rounded-lg font-bold hover:bg-indigo-700 disabled:bg-gray-400 transition"
            >
              Add To Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductScreen