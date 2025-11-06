import React from 'react';


const ProductCard = ({ product, onAddToCart }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS'
    }).format(price);
  };

  const handleAddToCart = () => {
    onAddToCart(product);
  };

  return (
    <div className={`product-card ${product.featured ? 'featured' : ''}`}>
      {product.featured && <span className="featured-badge">Destacado</span>}
      
      <div className="product-image">
        <img src={product.image} alt={product.name} />
      </div>
      
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-price">{formatPrice(product.price)}</p>
        
        <button 
          className="add-to-cart-btn"
          onClick={handleAddToCart}
        >
          Añadir al Carrito
        </button>
      </div>
    </div>
  );
};

export default ProductCard;