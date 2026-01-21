import { Outlet } from 'react-router-dom';
import Header from './components/Header'; // Make sure this path is correct

function App() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* 1. The new professional Header component */}
      <Header />
      
      {/* 2. Main content area with the Outlet for our screens */}
      <main className="flex-grow py-8">
        <div className="container mx-auto px-4">
          <Outlet /> 
        </div>
      </main>
      
      {/* 3. Improved Footer that stays at the bottom */}
      <footer className="bg-white border-t border-slate-200 py-8 text-center text-slate-500 text-sm mt-auto">
        <div className="container mx-auto px-4">
          <p>&copy; {new Date().getFullYear()} MERN Store. All rights reserved.</p>
          <div className="flex justify-center gap-6 mt-3">
            <a href="#" className="hover:text-indigo-600 transition">Privacy Policy</a>
            <a href="#" className="hover:text-indigo-600 transition">Terms of Service</a>
            <a href="#" className="hover:text-indigo-600 transition">Contact Us</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;