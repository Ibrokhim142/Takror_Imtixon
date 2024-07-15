import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../components/rated/Rated.css';

const Rated = () => {
  const [topRatedProducts, setTopRatedProducts] = useState([]);

  useEffect(() => {
    const fetchTopRatedProducts = async () => {
      try {
        const response = await axios.get('https://backend-e-commerce-production.up.railway.app/api/v1/products');
        const sortedProducts = response.data.sort((a, b) => b.rating - a.rating);
        const topThreeProducts = sortedProducts.slice(0, 3);
        setTopRatedProducts(topThreeProducts); 
      } catch (error) {
        console.error('Eng yuqori reytingga ega mahsulotlarni olishda xato yuz berdi:', error.message);
      }
    };

    fetchTopRatedProducts(); 
  }, []);

  return (
    <div className="rated-container">
      <h1>MOST TOP RATED PRODUCTS</h1>
      <div className="card-list">
        {topRatedProducts.map(product => (
          <div key={product.id} className="card">
            <img src={product.image} alt={product.name} className="card-image" />
            <div className="card-content">
              <h3 className="card-title">{product.name}</h3>
              <p className="card-price">Price: ${product.price}</p>
              <p className="card-rating">Rating: ${product.rating}</p>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Rated;
 