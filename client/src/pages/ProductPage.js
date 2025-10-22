import React,{useEffect,useState} from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import API from '../services/api';

export default function ProductPage(){
  const {id}=useParams();
  const navigate=useNavigate();
  const [product,setProduct]=useState(null);

  useEffect(()=>{
    API.get(`/products/${id}`)
      .then(res=>setProduct(res.data))
      .catch(err=>console.log(err));
  },[id]);

  const addToCart = ()=>{
    const cartKey = product?.sellerEmail ? `cart_${product.sellerEmail}` : "cart";
    const cart=JSON.parse(localStorage.getItem(cartKey))||[];
    cart.push(product);
    localStorage.setItem(cartKey,JSON.stringify(cart));
    alert('Product added to cart');
  };

  const buyNow = ()=>{
    addToCart();
    navigate('/cart');
  };

  if(!product) return <p>Loading...</p>;

  return (
    <div className="product-detail">
      <img src={product.images[0]} alt={product.title}/>
      <div className="product-info">
        <h2>{product.title}</h2>
        <p>{product.description}</p>
        <p>₹{product.price}</p>
        <div className="product-buttons">
          <button onClick={addToCart}>Add to Cart</button>
          <button onClick={buyNow}>Buy Now</button>
        </div>
      </div>
    </div>
  );
}
