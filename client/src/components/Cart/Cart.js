import React from 'react';
import { useCart } from '../../context/CartContext';

const Cart = ({ isOpen, onClose }) => {
  const { items, updateQuantity, removeFromCart, getCartTotal } = useCart();

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS'
    }).format(price);
  };

  const subtotal = getCartTotal();
  const impuestos = subtotal * 0.21; // IVA 21%
  const total = subtotal + impuestos;

  if (!isOpen) return null;

  return (
    <div className="cart-overlay" onClick={onClose}>
      <div className="cart-sidebar" onClick={(e) => e.stopPropagation()}>
        <div className="cart-header">
          <h2>Carrito de Compras</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="cart-content">
          {items.length === 0 ? (
            <div className="empty-cart">
              <p>Tu carrito está vacío</p>
              <span>🛒</span>
            </div>
          ) : (
            <>
              <div className="cart-items">
                {items.map(item => (
                  <div key={item.id} className="cart-item">
                    <img src={item.imagen} alt={item.nombre} />
                    <div className="item-details">
                      <h4>{item.nombre}</h4>
                      <p className="item-price">{formatPrice(item.precio)}</p>
                      
                      <div className="quantity-controls">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          disabled={item.quantity >= 10}
                        >
                          +
                        </button>
                      </div>
                      
                      {item.quantity >= 10 && (
                        <p className="limit-warning">Máximo 10 unidades</p>
                      )}
                    </div>
                    
                    <div className="item-actions">
                      <p className="item-total">{formatPrice(item.precio * item.quantity)}</p>
                      <button 
                        className="remove-btn"
                        onClick={() => removeFromCart(item.id)}
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="cart-summary">
                <div className="summary-line">
                  <span>Subtotal:</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="summary-line">
                  <span>IVA (21%):</span>
                  <span>{formatPrice(impuestos)}</span>
                </div>
                <div className="summary-line total">
                  <span>Total:</span>
                  <span>{formatPrice(total)}</span>
                </div>
                
                <button className="checkout-btn">
                  Proceder al Pago
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;