 // 'mongodb://127.0.0.1:27017/Products'

const express = require("express");
const mongoose = require('mongoose');
const app = express();
const connectDB = async ()=>{
    mongoose.connect('mongodb://localhost:27017/Student');
    const productSchema = new mongoose.Schema({});
    const product = mongoose.model('students',productSchema);
    const data = await product.find();
    console.log(data);
     console.log('App is working');

} 
connectDB();

app.listen(4000);

// const {MongoClient} = require('mongodb');
// const url = 'mongodb://localhost:27017';
// const database = 'Products'
// const client = new MongoClient(url);

// async function getData(){
//     let result = await client.connect();
//     let db = result.db(database);
//     let collection = db.collection('product');
//     let response = await collection.find({}).toArray();
//     console.log(response);
// }

// getData();