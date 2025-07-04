// AllProducts.jsx
import { useEffect, useState } from 'react';
import axios from '../axios/axiosConfig';
import ProductCard from '../ProductCard';
import Pagination from '../Pagination';
import { toast } from 'react-hot-toast';

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get(`/api/products?page=${page}&keyword=${search}`);
      setProducts(data.products || []);
      setTotalPages(data.pages || 1);
    } catch (err) {
      toast.error('Failed to fetch products');
      console.error('Error fetching products', err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [page, search]);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;

    try {
      await axios.delete(`/api/products/${id}`);
      toast.success('Product deleted successfully');

      // Refresh the product list from server
      fetchProducts();
    } catch (err) {
      toast.error('Failed to delete product');
      console.error('Delete failed:', err);
    }
  };

  return (
    <div className="p-4 sm:p-6 md:p-8">
      <h2 className="text-2xl font-bold mb-4">All Products</h2>

      <input
        type="text"
        placeholder="Search by name or category"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1);
        }}
        className="border p-2 w-full max-w-md mb-6 rounded"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product._id} product={product} onDelete={handleDelete} />
          ))
        ) : (
          <p className="text-gray-500 text-sm col-span-full">No products found.</p>
        )}
      </div>

      {totalPages > 1 && (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={(p) => setPage(p)}
        />
      )}
    </div>
  );
};

export default AllProducts;
