import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import { Menu, X } from 'lucide-react';
import { toast } from 'react-hot-toast';

const Navbar = () => {
  const { token, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/login'); // optional redirect
    setMenuOpen(false);
  };

  return (
    <nav className="bg-blue-700 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <div className="text-2xl font-bold">StarPlumbing 🛠️</div>

        {/* Hamburger Button for small screens */}
        <button className="md:hidden" onClick={toggleMenu}>
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Menu Items (Desktop) */}
        <ul className="hidden md:flex space-x-6">
          <li><Link to="/" className="hover:underline">Home</Link></li>
          <li><Link to="/allproducts" className="hover:underline">All Products</Link></li>
          {token ? (
            <li>
              <button
                onClick={handleLogout}
                className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
              >
                Logout
              </button>
            </li>
          ) : (
            <li>
              <Link to="/login" className="hover:underline">Login</Link>
            </li>
          )}
        </ul>
      </div>

      {/* Menu Items (Mobile Dropdown) */}
      {menuOpen && (
        <ul className="md:hidden px-4 pb-4 space-y-3 bg-blue-600">
          <li>
            <Link to="/" className="block hover:underline" onClick={toggleMenu}>Home</Link>
          </li>
          <li>
            <Link to="/allproducts" className="block hover:underline" onClick={toggleMenu}>All Products</Link>
          </li>
          {token ? (
            <li>
              <button
                onClick={handleLogout}
                className="bg-red-500 px-3 py-1 rounded hover:bg-red-600 w-full text-left"
              >
                Logout
              </button>
            </li>
          ) : (
            <li>
              <Link to="/login" className="block hover:underline" onClick={toggleMenu}>Login</Link>
            </li>
          )}
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
