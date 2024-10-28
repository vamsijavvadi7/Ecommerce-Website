import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import LoginPage from "./Authentication/LoginPage";
import ProtectedRoute from "./Authentication/ProtectedRoute";
import SignUpPage from "./Authentication/SignUpPage";
import Categories from "./components/categoryBar";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import OfferGrid from "./components/OfferGrid";
import ProductCard from "./components/ProductCard";
import ProfilePage from "./components/Profilepage";
import CategorySection from "./components/SegmentationSection";
import { AuthProvider } from "./contexts/AuthProvider";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <main>
          <div style={{ padding: "90px 30px" }}>
            <Routes>
              <Route path="/profile" element={<ProfilePage />} />
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <Categories />
                    <OfferGrid />
                  </ProtectedRoute>
                }
              />
              <Route path="/shop" element={<CategorySection />} />
              <Route path="/categories" element={<CategorySection />} />
              <Route path="/products" element={<ProductCard />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignUpPage />} />
            </Routes>
          </div>
        </main>
        <Footer />
      </Router>
    </AuthProvider>
  );
};

export default App;
