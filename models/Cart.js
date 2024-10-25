// models/Cart.js
const mongoose = require("mongoose");

// cartSchema in models/Cart.js
const cartSchema = new mongoose.Schema({
  userId: {
    type: String, 
    required: true,
  },
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      quantity: { type: Number, default: 1 },
    },
  ],
});


module.exports = mongoose.model("Cart", cartSchema);
