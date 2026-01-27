import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { ShoppingCart, ArrowLeft } from 'lucide-react';
import Rating from '../components/Rating';
import { addToCart } from '../slices/cartSlice';

const ProductScreen = () => {
  const { id: productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`/api/products/${productId}`);
        setProduct(data);
        setLoading(false);
      } catch (err) {
        setError(err?.response?.data?.message || err.error);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate('/cart');
  };

  if (loading) return <div className="text-center py-20 text-xl font-semibold">Loading product...</div>;
  if (error) return <div className="text-center py-20 text-red-500 font-bold">{error}</div>;
  if (!product) return null;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Button */}
      <Link 
        className="inline-flex items-center gap-2 text-slate-600 hover:text-indigo-600 transition mb-8 font-medium" 
        to="/"
      >
        <ArrowLeft size={20} />
        Go Back
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Left Column: Product Image */}
        <div className="rounded-2xl overflow-hidden shadow-2xl border border-slate-100 bg-white p-2">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-auto object-cover rounded-xl"
          />
        </div>

        {/* Right Column: Product Details */}
        <div className="flex flex-col">
          <div className="mb-6">
            <h1 className="text-4xl font-extrabold text-slate-900 leading-tight mb-2">
              {product.name}
            </h1>
            <Rating value={product.rating} text={`${product.numReviews} reviews`} />
          </div>

          <div className="border-t border-slate-200 pt-6">
            <p className="text-3xl font-bold text-indigo-600 mb-4">
              ${product.price}
            </p>
            <p className="text-slate-600 text-lg leading-relaxed mb-8">
              {product.description}
            </p>
          </div>

          {/* Add to Cart Card */}
          <div className="bg-white border border-slate-200 rounded-2xl shadow-xl p-6">
            <div className="space-y-4 mb-6">
              <div className="flex justify-between items-center text-lg">
                <span className="text-slate-500">Price:</span>
                <span className="font-bold text-slate-900">${product.price}</span>
              </div>
              
              <div className="flex justify-between items-center text-lg pb-4 border-b">
                <span className="text-slate-500">Status:</span>
                <span className={`font-bold ${product.countInStock > 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                  {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>

              {/* Quantity Selector */}
              {product.countInStock > 0 && (
                <div className="flex justify-between items-center py-2">
                  <span className="text-slate-500">Quantity:</span>
                  <select
                    value={qty}
                    onChange={(e) => setQty(Number(e.target.value))}
                    className="bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none transition"
                  >
                    {[...Array(product.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            <button
              onClick={addToCartHandler}
              disabled={product.countInStock === 0}
              className="w-full flex items-center justify-center gap-3 bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-xl font-bold text-lg transition shadow-lg shadow-indigo-200 disabled:bg-slate-300 disabled:shadow-none"
            >
              <ShoppingCart size={22} />
              Add To Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductScreen;