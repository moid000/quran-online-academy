const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Admin = require('../models/Admin');

dotenv.config();

const seedAdmin = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/quran_online_academy';
    await mongoose.connect(mongoUri);
    console.log('MongoDB connected for admin seeding...');

    const username = (process.env.INITIAL_ADMIN_USERNAME || 'admin').toLowerCase();
    const password = process.env.INITIAL_ADMIN_PASSWORD || 'AdminPassword123!';
    const email = (process.env.INITIAL_ADMIN_EMAIL || 'admin@quranonlineacademy.com').toLowerCase();

    const existingAdmin = await Admin.findOne({ username });

    if (existingAdmin) {
      console.log(`Admin user '${username}' already exists.`);
    } else {
      await Admin.create({
        username,
        password,
        email,
      });
      console.log(`Admin user '${username}' created successfully!`);
      console.log(`Username: ${username}`);
      console.log(`Password: ${password}`);
    }

    process.exit(0);
  } catch (error) {
    console.error('Error seeding admin user:', error);
    process.exit(1);
  }
};

seedAdmin();
