import { onAuthStateChanged } from "firebase/auth";
import React, { createContext, useContext, useEffect, useState } from "react";
import LoadingSpinner from "../components/LoadingSpinner"; // Import the loading spinner
import { auth } from "../firebase";
export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [presentUser, setPresentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState({});
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log("Auth State Changed:", user);
      setPresentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);


//use this if you want to call a api to get products info
//similary you can use your productsData 

  useEffect(() => {
   
   

    // Replace with mongodb link to fetch products
    fetch('https://dummyjson.com/products')
        .then(res => res.json()) // Await for JSON parsing
        .then(data => setProduct(data)) // Set the parsed data to state
        .catch(error => console.error('Error fetching products:', error));

  
}, []);


  return (
    <AuthContext.Provider value={{ presentUser, product }}>
      {loading ? <LoadingSpinner /> : children}
    </AuthContext.Provider>
  );
};
