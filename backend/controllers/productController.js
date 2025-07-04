import Product from '../models/Product.js';

// @desc    Get all products with optional pagination and search
// @route   GET /api/products
// @access  Public
export const getProducts = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const pageSize = 8;
    const keyword = req.query.keyword
      ? {
          $or: [
            { name: { $regex: req.query.keyword, $options: 'i' } },
            { category: { $regex: req.query.keyword, $options: 'i' } },
          ],
        }
      : {};

    const count = await Product.countDocuments({ ...keyword });
    const products = await Product.find({ ...keyword })
      .sort({ sno: 1 })
      .limit(pageSize)
      .skip(pageSize * (page - 1));

    res.json({
      products,
      page,
      pages: Math.ceil(count / pageSize),
      total: count,
    });
  } catch (error) {
    console.error('Error fetching products:', error.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get a single product by ID
// @route   GET /api/products/:id
// @access  Public
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product)
      return res.status(404).json({ message: 'Product not found' });

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Create new product
// @route   POST /api/products
// @access  Private (admin)
export const createProduct = async (req, res) => {
  try {
    const { name, category, buyingPrice, sellingPrice, unit, nos } = req.body;

    if (!name || !category || !buyingPrice || !sellingPrice || !unit || !nos) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Automatically generate next serial number
    const lastProduct = await Product.findOne().sort({ sno: -1 });
    const newSno = lastProduct ? lastProduct.sno + 1 : 1;

    const newProduct = new Product({
      sno: newSno,
      name,
      category,
      buyingPrice,
      sellingPrice,
      unit,
      nos,
    });

    const saved = await newProduct.save();
    res.status(201).json(saved);
  } catch (error) {
    console.error('Error creating product:', error.message);
    res.status(400).json({ message: 'Invalid Product Data', error: error.message });
  }
};

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private (admin)
export const updateProduct = async (req, res) => {
  try {
    const { name, category, buyingPrice, sellingPrice, unit, nos } = req.body;

    const product = await Product.findById(req.params.id);
    if (!product)
      return res.status(404).json({ message: 'Product not found' });

    product.name = name;
    product.category = category;
    product.buyingPrice = buyingPrice;
    product.sellingPrice = sellingPrice;
    product.unit = unit;
    product.nos = nos;

    const updated = await product.save();
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: 'Update Failed', error: error.message });
  }
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private (admin)
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product)
      return res.status(404).json({ message: 'Product not found' });

    await product.deleteOne();
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Delete Failed', error: error.message });
  }
};
