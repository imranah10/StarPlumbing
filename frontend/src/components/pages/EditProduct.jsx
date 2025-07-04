import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from '../axios/axiosConfig';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-hot-toast';

const EditProduct = () => {
  const { token } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '', category: '', buyingPrice: '', sellingPrice: '', unit: '', nos: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(`/api/products/${id}`);
      setFormData(data);
    };
    if (token) fetchData();
  }, [id, token]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/products/${id}`, formData);
      toast.success('Product updated successfully');
      navigate('/allproducts');
    } catch (err) {
      toast.error('Failed to update product');
    }
  };

  if (!token) return <p className="text-center p-6">Only admin can edit products</p>;

  return (
    <div className="max-w-xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Edit Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full p-2 border" required />
        <input type="text" name="category" value={formData.category} onChange={handleChange} className="w-full p-2 border" required />
        <input type="text" name="buyingPrice" value={formData.buyingPrice} onChange={handleChange} className="w-full p-2 border" required />
        <input type="text" name="sellingPrice" value={formData.sellingPrice} onChange={handleChange} className="w-full p-2 border" required />
        <input type="text" name="unit" value={formData.unit} onChange={handleChange} className="w-full p-2 border" required />
        <input type="number" name="nos" value={formData.nos} onChange={handleChange} className="w-full p-2 border" required />
        <button type="submit" className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">Update Product</button>
      </form>
    </div>
  );
};

export default EditProduct;
