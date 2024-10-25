// routes/cartRoute.js
const express = require("express");
const Cart = require("../models/Cart");

const router = express.Router();

// Get cart items for a specific user
router.get("/cart", async (req, res) => {
  const userId = req.query.userId; // Assuming you send the user's Firebase UID from the frontend
  try {
    const cart = await Cart.findOne({ userId });
    if (cart) {
      res.json(cart);
    } else {
      res.json({ items: [] });
    }
  } catch (err) {
    res.status(500).json({ message: "Error fetching cart items" });
  }
});

// Add items to the cart
// Add items to the cart
router.post("/add", async (req, res) => { // Use "/add" instead of "/cart/add"
  const { userId, productId } = req.body; // Expect userId and productId in the request body

  try {
      let cart = await Cart.findOne({ userId });

      if (!cart) {
          // If the cart doesn't exist, create a new one with the product
          cart = new Cart({
              userId,
              items: [{ productId, quantity: 1 }]
          });
      } else {
          // Check if the product is already in the cart
          const itemIndex = cart.items.findIndex((item) => item.productId.equals(productId));

          if (itemIndex !== -1) {
              // If the product exists, increment the quantity
              cart.items[itemIndex].quantity += 1;
          } else {
              // If the product doesn't exist, add it with quantity = 1
              cart.items.push({ productId, quantity: 1 });
          }
      }

      // Save the cart with the updated items
      await cart.save();
      res.status(200).json(cart);
  } catch (err) {
      res.status(500).json({ message: "Error adding item to cart" });
  }
});

router.delete("/remove", async (req, res) => {
  const { userId, productId } = req.body;

  try {
      let cart = await Cart.findOne({ userId });

      if (!cart) {
          return res.status(404).json({ message: "Cart not found." });
      }

      const itemIndex = cart.items.findIndex(item => item.productId.equals(productId)); // Adjust based on productId type

      if (itemIndex === -1) {
          return res.status(404).json({ message: "Item not found in cart." });
      }

      if (cart.items[itemIndex].quantity > 1) {
          // Decrease quantity if more than 1
          cart.items[itemIndex].quantity -= 1;
      } else {
          // Remove the item if quantity is 1
          cart.items.splice(itemIndex, 1);
      }

      await cart.save();
      res.status(200).json(cart);
  } catch (err) {
      res.status(500).json({ message: "Error removing item from cart" });
  }
});


// Example of adding items to the cart
router.post("/add", async (req, res) => {
  const { userId, productId } = req.body;

  console.log("Adding to cart:", { userId, productId }); // Log incoming request

  try {
      let cart = await Cart.findOne({ userId });

      if (!cart) {
          console.log("Creating new cart for user:", userId);
          cart = new Cart({
              userId,
              items: [{ productId, quantity: 1 }],
          });
      } else {
          console.log("Cart found, checking items:", cart.items);
          const itemIndex = cart.items.findIndex(item => item.productId.equals(productId)); // Adjust based on productId type

          if (itemIndex !== -1) {
              console.log("Item exists in cart, incrementing quantity.");
              cart.items[itemIndex].quantity += 1;
          } else {
              console.log("Adding new item to cart.");
              cart.items.push({ productId, quantity: 1 });
          }
      }

      await cart.save();
      console.log("Cart saved:", cart);
      res.status(200).json(cart);
  } catch (err) {
      console.error("Error adding to cart:", err);
      res.status(500).json({ message: "Error adding item to cart" });
  }
});



// Remove items or adjust quantity
router.delete("/remove-item", async (req, res) => {
  const { productId, userId, quantity } = req.body;

  try {
      const cart = await Cart.findOne({ userId });

      if (!cart) {
          return res.status(404).json({ message: "Cart not found." });
      }

      console.log("Items in cart:", cart.items); // Log the items in the cart for debugging

      const itemIndex = cart.items.findIndex(item => item.productId === productId);

      if (itemIndex === -1) {
          return res.status(404).json({ message: "Item not found in cart." });
      }

      if (quantity === 0) {
          cart.items.splice(itemIndex, 1);
          await cart.save();
          return res.status(200).json({ message: "Item removed from cart." });
      } else {
          cart.items[itemIndex].quantity -= quantity;

          if (cart.items[itemIndex].quantity <= 0) {
              cart.items.splice(itemIndex, 1);
          }

          await cart.save();
          return res.status(200).json({ message: "Item quantity updated." });
      }
  } catch (err) {
      console.error("Error removing item from cart:", err); // Log the error for debugging
      res.status(500).json({ message: "Error removing item from cart" });
  }
});


// Get all cart details for a specific user
router.get("/user-cart", async (req, res) => {
  const userId = req.query.userId; // Extract userId from the query string

  try {
    const cart = await Cart.findOne({ userId });

    if (cart) {
      res.status(200).json(cart);
    } else {
      res.status(404).json({ message: "Cart not found." });
    }
  } catch (err) {
    res.status(500).json({ message: "Error fetching cart items" });
  }
});









module.exports = router;



