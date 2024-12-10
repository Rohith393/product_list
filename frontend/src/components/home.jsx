import React, { useState } from 'react';

export const Homecompo = () => {
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'productName') setProductName(value);
    else if (name === 'price') setPrice(value);
    else if (name === 'imgUrl') setImgUrl(value);
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: productName,
          price,
          image: imgUrl,
        }),
      });

      if (response.ok) {
        console.log("Data submitted successfully");
        setShowPopup(true); // Show success popup
        setTimeout(() => setShowPopup(false), 3000); // Hide popup after 3 seconds

        setProductName('');
        setPrice('');
        setImgUrl('');
      } else {
        console.log("Failed to submit data");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div >
      <h3 className='headingcomp'>ADD PRODUCTS</h3>
      <div className="container">
      <div className="gapcomp">
        <input
          className="inputstyles"
          name="productName"
          placeholder="Product Name"
          type="text"
          value={productName}
          onChange={handleInputChange}
        />
        <input
          className="inputstyles"
          name="price"
          placeholder="Price"
          type="text"
          value={price}
          onChange={handleInputChange}
        />
        <input
          className="inputstyles"
          name="imgUrl"
          placeholder="Image URL"
          type="text"
          value={imgUrl}
          onChange={handleInputChange}
        />
         <button onClick={handleSubmit} className="buttoncompo">Add Product</button>
      </div>
      </div>
      {showPopup && (
        <div className="popup">
          Product added successfully!
        </div>
      )}
    </div>
  );
};
