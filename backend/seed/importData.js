import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from '../config/db.js';
import Product from '../models/Product.js';
import User from '../models/User.js';
import { productsData } from './products.js';

dotenv.config();

const importData = async () => {
  try {
    await connectDB();

    await Product.deleteMany();
    await User.deleteMany();

    const products = [];
    for (const category in productsData) {
      productsData[category].forEach((item) => {
        products.push({
          sno: item.sno,
          name: item.productName,
          buyingPrice: item.buyingPrice.replace('₹', ''),
          sellingPrice: item.sellingPrice.replace('₹', ''),
          unit: item.unit,
          nos: String(item.nos),
          category,
        });
      });
    }

    await Product.insertMany(products);
    console.log(`✅ Imported ${products.length} products`);

    // ❌ Don't hash manually
    // ✅ Let Mongoose handle it with pre('save')
    await User.create({
      username: 'Mdhussain',
      password: 'Ansari7766',
    });

    console.log('✅ Admin user created: Mdhussain / Ansari7766');
    console.log('🎉 Data Import Successful');
    process.exit();
  } catch (error) {
    console.error(`❌ Import Error: ${error}`);
    process.exit(1);
  }
};

importData();
