const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator');


const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true, 
    required: [true, "El nombre es requerido"]
  },
  price: {
    type: Number,
    required: [true, "El precio es requerido"]
    
  },
  category: {
    type: String,
    required: true,
    enum: ["Niños", "Hogar", "Entretenimiento"]
  },
  stock: {
    type: Number,
    default: 10
  },
  date: {
    type: Date,
    default: Date.now()
  }
})

ProductSchema.plugin(uniqueValidator);
const Product = mongoose.model('Product', ProductSchema)

module.exports = Product