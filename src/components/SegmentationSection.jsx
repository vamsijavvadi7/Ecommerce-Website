import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  CategoryContainer,
  CategoryButtons,
  CategoryButton,
  ProductGrid,
  ProductCard,
} from "../StyledComponents/SegmentationSectionStyles";
import CartDropdown from "./CartDropdown"; // Import the CartDropdown

const CategorySection = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [products, setProducts] = useState([]); // State for fetched products
  const [cartItems, setCartItems] = useState([]); // State for cart items

  // Fetch products when component mounts
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/product/getallproducts");
        setProducts(response.data.data); // Assuming response data contains products in 'data' field
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []); // Empty dependency array ensures it only runs once when the component mounts

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleAddToCart = (product) => {
    // Check if the product is already in the cart
    const existingItem = cartItems.find(item => item._id === product._id);
    if (existingItem) {
      // If the product exists in the cart, update the quantity
      setCartItems(cartItems.map(item =>
        item._id === product._id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      // If the product is not in the cart, add it with quantity 1
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  // Filter products based on the selected category
  const filteredProducts = selectedCategory === "all"
    ? products
    : products.filter(product => product.Category === selectedCategory);

  return (
    <CategoryContainer>
     

      <CategoryButtons>
        <CategoryButton
          active={selectedCategory === "all"}
          onClick={() => handleCategoryChange("all")}
        >
          All
        </CategoryButton>
        <CategoryButton
          active={selectedCategory === "men"}
          onClick={() => handleCategoryChange("men")}
        >
          Men
        </CategoryButton>
        <CategoryButton
          active={selectedCategory === "women"}
          onClick={() => handleCategoryChange("women")}
        >
          Women
        </CategoryButton>
      </CategoryButtons>

      <ProductGrid>
        {filteredProducts.map((product) => (
          <ProductCard
            key={product._id}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 250, damping: 15 }}
          >
            <img src={product.Image} alt={product.Title} />
            <h4>{product.Title}</h4>
            <p>${product.Original_Price}</p>
            <button onClick={() => handleAddToCart(product)}>Add to Cart</button> {/* Add to Cart button */}
          </ProductCard>
        ))}
      </ProductGrid>
    </CategoryContainer>
  );
};

export default CategorySection;
