// ProductCard.jsx
import { useAuth } from './context/AuthContext';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product, onDelete }) => {
  const { token } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="border p-4 shadow rounded bg-white w-full flex flex-col justify-between">
      <div>
        <h2 className="text-lg font-semibold text-blue-700">{product.name}</h2>
        <p className="text-sm text-gray-600">
          <span className="font-medium">Category:</span>{' '}
          <span className="font-bold text-indigo-600">{product.category}</span>
        </p>
        <p className="text-sm">Buying Price: ₹{product.buyingPrice}</p>
        <p className="text-sm">Selling Price: ₹{product.sellingPrice}</p>
        <p className="text-sm">Unit: {product.unit}</p>
        <p className="text-sm mb-2">Nos: {product.nos}</p>
      </div>

      {token && (
        <div className="flex gap-2 mt-4">
          <button
            onClick={() => navigate(`/edit/${product._id}`)}
            className="flex-1 px-3 py-1 text-sm bg-yellow-500 text-white rounded hover:bg-yellow-600"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(product._id)}
            className="flex-1 px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
