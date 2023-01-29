//the seeder will inject all the data to the database at once!

const Product = require('../models/product');
const dotenv = require('dotenv');
const connectDatabase = require('../config/database');

const products = require('../data/products.json');
const connect = require('mongoose');


//setting dotenv file

dotenv.config({ path: 'config/config.env' });

connectDatabase();  //execute the function and forming connection

const seedProducts = async () => {
    try {
       
        await Product.deleteMany();
        console.log('all data is deleted');

        await Product.insertMany(products);
        console.log('all products are added successfully');

        process.exit(); //to end the current process


    } catch (error) {
        console.log(error.message);
        process.exit();

    }
}

seedProducts();