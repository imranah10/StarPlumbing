import { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from '../ProductCard';
import Pagination from '../Pagination';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const PRODUCTS_PER_PAGE = 8;
  const navigate = useNavigate();

  const handleDelete = (id) => {
    setProducts((prev) => {
      const updated = prev.filter((p) => p._id !== id);
      const newTotalPages = Math.ceil(updated.length / PRODUCTS_PER_PAGE);
      if (currentPage > newTotalPages) {
        setCurrentPage(newTotalPages || 1);
      }
      return updated;
    });
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get(import.meta.env.VITE_API_URL + '/api/products');
        const formatted = Array.isArray(data) ? data : data.products || [];
        setProducts(formatted);
      } catch (err) {
        toast.error('Error fetching products');
      }
    };
    fetchProducts();
  }, []);

  const totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE);
  const start = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const currentProducts = products.slice(start, start + PRODUCTS_PER_PAGE);

  return (
    <div className="p-4 sm:p-6 md:p-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold">Featured Products</h1>
        <button
          onClick={() => navigate('/add-product')}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Add Product
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {currentProducts.length > 0 ? (
          currentProducts.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              onDelete={handleDelete}
            />
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>

     
    </div>
  );
};

export default Home;
