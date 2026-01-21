import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Trash2, Minus, Plus, ShoppingBag } from 'lucide-react';
import { addToCart } from '../slices/cartSlice';

const CartScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
  };

  const checkoutHandler = () => {
    navigate('/login?redirect=/shipping');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 flex items-center gap-3">
        <ShoppingBag size={32} /> Shopping Cart
      </h1>

      {cartItems.length === 0 ? (
        <div className="bg-blue-50 p-6 rounded-lg text-blue-800">
          Your cart is empty.{' '}
          <Link to="/" className="underline font-bold hover:text-blue-600">
            Go Back Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items List */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div key={item._id} className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-slate-100">
                <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-md" />
                
                <div className="flex-grow">
                  <Link to={`/product/${item._id}`} className="font-bold text-lg hover:text-indigo-600 transition">
                    {item.name}
                  </Link>
                  <p className="text-slate-500 font-medium">${item.price}</p>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center border rounded-lg bg-slate-50">
                   <select 
                    value={item.qty} 
                    onChange={(e) => addToCartHandler(item, Number(e.target.value))}
                    className="bg-transparent p-2 outline-none cursor-pointer"
                   >
                    {[...Array(item.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                   </select>
                </div>

                <button className="text-red-500 hover:bg-red-50 p-2 rounded-full transition">
                  <Trash2 size={20} />
                </button>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-100 h-fit">
            <h2 className="text-xl font-bold mb-4 border-b pb-4">Order Summary</h2>
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-slate-600">Items:</span>
                <span className="font-medium">{cartItems.reduce((acc, item) => acc + item.qty, 0)}</span>
              </div>
              <div className="flex justify-between text-xl font-bold text-indigo-600 pt-4 border-t">
                <span>Total:</span>
                <span>${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}</span>
              </div>
            </div>
            <button
              onClick={checkoutHandler}
              className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold hover:bg-slate-800 transition shadow-lg"
            >
              Proceed To Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartScreen;