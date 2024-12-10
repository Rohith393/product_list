import React, { useState, useEffect } from 'react';

export const Showproducts = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/product");
      const result = await response.json();
      console.log(result.data); // Log fetched data
      if (result.success) {
        setProducts(result.data);
      } else {
        console.log("Failed to fetch products");
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts(); // Call fetchProducts when the component mounts
  }, []);

  return (
  <>
  <h3 className='headingcomp'>CART PRODUCTS</h3>
    <div className='display'>
      {products.map((product) => (
        <div key={product._id}>                         
          <h3>{product.name}</h3>react  
          <p>Price: ${product.price}</p>         
          <img src={product.image} alt={product.name} />
        </div>
      ))}
    </div>
    </>
  );
};
