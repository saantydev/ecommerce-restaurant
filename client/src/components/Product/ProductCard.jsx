import './ProductCard.css'

const ProductCard = ({ product, onAddToCart }) => {
  const handleAddToCart = () => {
    onAddToCart(product)
  }

  return (
    <div className="product-card">
      <div className="product-image">
        <img src={product.image} alt={product.name} />
      </div>

      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-description">{product.description}</p>
        <div className="product-price">
          <span className="price">${product.price.toFixed(2)}</span>
        </div>

        <button
          className="add-to-cart-btn"
          onClick={handleAddToCart}
        >
          Añadir al Carrito
        </button>
      </div>
    </div>
  )
}

export default ProductCard