import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux'; // Added useSelector
import { ShoppingCart, User, Search, Store } from 'lucide-react';

const Header = () => {
  // Get cartItems from Redux state
  const { cartItems } = useSelector((state) => state.cart);

  return (
    <header className="bg-slate-900 text-white shadow-lg sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
        
        <Link to="/" className="flex items-center gap-2 text-2xl font-bold tracking-tighter hover:text-indigo-400 transition">
          <Store size={28} className="text-indigo-500" />
          <span>MERN<span className="text-indigo-500">STORE</span></span>
        </Link>

        {/* ... Search Bar stays the same ... */}

        <div className="flex items-center gap-8 text-sm font-medium">
          <Link to="/cart" className="flex items-center gap-2 hover:text-indigo-400 transition relative">
            <ShoppingCart size={20} />
            <span>Cart</span>
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-3 bg-indigo-600 text-[10px] rounded-full h-4 w-4 flex items-center justify-center font-bold">
                {cartItems.reduce((a, c) => a + c.qty, 0)}
              </span>
            )}
          </Link>
          
          <Link to="/login" className="flex items-center gap-2 hover:text-indigo-400 transition">
            <User size={20} />
            <span>Sign In</span>
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;