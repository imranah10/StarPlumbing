import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/pages/Home';
import Login from './components/pages/Login';
import AllProducts from './components/pages/AllProducts';
import AddProduct from './components/pages/AddProduct';
import EditProduct from './components/pages/EditProduct';
import Navbar from './components/Navbar';
import { AuthProvider } from './components/context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import { Toaster } from 'react-hot-toast';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        {/* ✅ Add Toaster globally */}
        <Toaster position="top-center" reverseOrder={false} />
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/allproducts" element={<PrivateRoute><AllProducts /></PrivateRoute>} />
          <Route path="/add-product" element={<PrivateRoute><AddProduct /></PrivateRoute>} />
          <Route path="/edit/:id" element={<PrivateRoute><EditProduct /></PrivateRoute>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
