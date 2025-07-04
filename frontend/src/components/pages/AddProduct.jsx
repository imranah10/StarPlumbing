import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../axios/axiosConfig';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-hot-toast';

const AddProduct = () => {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    buyingPrice: '',
    sellingPrice: '',
    unit: '',
    nos: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/products', formData);
      toast.success('Product added successfully');
      navigate('/allproducts');
    } catch (err) {
      toast.error('Failed to add product');
      console.error(err);
    }
  };

  if (!token) return <p className="text-center p-6">Only admin can add products</p>;

  return (
    <div className="max-w-xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Add New Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="name" placeholder="Product Name" value={formData.name} onChange={handleChange} className="w-full p-2 border" required />
        <input type="text" name="category" placeholder="Category" value={formData.category} onChange={handleChange} className="w-full p-2 border" required />
        <input type="text" name="buyingPrice" placeholder="Buying Price" value={formData.buyingPrice} onChange={handleChange} className="w-full p-2 border" required />
        <input type="text" name="sellingPrice" placeholder="Selling Price" value={formData.sellingPrice} onChange={handleChange} className="w-full p-2 border" required />
        <input type="text" name="unit" placeholder="Unit" value={formData.unit} onChange={handleChange} className="w-full p-2 border" required />
        <input type="number" name="nos" placeholder="Nos" value={formData.nos} onChange={handleChange} className="w-full p-2 border" required />
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;
