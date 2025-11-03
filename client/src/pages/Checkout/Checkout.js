import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import './Checkout.css';

const Checkout = () => {
  const { items, getCartTotal, clearCart } = useCart();
  const { user, isAuthenticated } = useAuth();
  const [step, setStep] = useState(1);
  const [orderData, setOrderData] = useState({
    direccion_envio: '',
    telefono_contacto: '',
    metodo_pago: 'tarjeta',
    numero_tarjeta: '',
    nombre_tarjeta: '',
    expiracion: '',
    cvv: ''
  });
  const [loading, setLoading] = useState(false);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS'
    }).format(price);
  };

  const subtotal = getCartTotal();
  const impuestos = subtotal * 0.21;
  const envio = subtotal > 50000 ? 0 : 5000; // Envío gratis por compras mayores a $50.000
  const total = subtotal + impuestos + envio;

  const handleInputChange = (e) => {
    setOrderData({
      ...orderData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmitOrder = async () => {
    if (!isAuthenticated) {
      alert('Debes iniciar sesión para realizar el pedido');
      return;
    }

    setLoading(true);

    try {
      const orderItems = items.map(item => ({
        producto_id: item.id,
        cantidad: item.quantity,
        precio_unitario: item.precio
      }));

      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          usuario_id: user.id,
          items: orderItems,
          direccion_envio: orderData.direccion_envio,
          telefono_contacto: orderData.telefono_contacto
        })
      });

      const result = await response.json();

      if (response.ok) {
        clearCart();
        setStep(4); // Página de confirmación
      } else {
        alert('Error al procesar el pedido: ' + result.error);
      }
    } catch (error) {
      alert('Error de conexión');
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0 && step < 4) {
    return (
      <div className="checkout-page">
        <div className="empty-checkout">
          <h2>Tu carrito está vacío</h2>
          <p>Agrega productos antes de proceder al checkout</p>
          <a href="/" className="back-btn">Volver a la tienda</a>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="checkout-container">
        <div className="checkout-header">
          <h1>Finalizar Compra</h1>
          <div className="steps">
            <div className={`step ${step >= 1 ? 'active' : ''}`}>1. Resumen</div>
            <div className={`step ${step >= 2 ? 'active' : ''}`}>2. Envío</div>
            <div className={`step ${step >= 3 ? 'active' : ''}`}>3. Pago</div>
            <div className={`step ${step >= 4 ? 'active' : ''}`}>4. Confirmación</div>
          </div>
        </div>

        <div className="checkout-content">
          {step === 1 && (
            <div className="step-content">
              <h2>Resumen del Pedido</h2>
              <div className="order-items">
                {items.map(item => (
                  <div key={item.id} className="order-item">
                    <img src={item.imagen} alt={item.nombre} />
                    <div className="item-info">
                      <h4>{item.nombre}</h4>
                      <p>Cantidad: {item.quantity}</p>
                    </div>
                    <div className="item-price">
                      {formatPrice(item.precio * item.quantity)}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="order-summary">
                <div className="summary-line">
                  <span>Subtotal:</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="summary-line">
                  <span>IVA (21%):</span>
                  <span>{formatPrice(impuestos)}</span>
                </div>
                <div className="summary-line">
                  <span>Envío:</span>
                  <span>{envio === 0 ? 'GRATIS' : formatPrice(envio)}</span>
                </div>
                <div className="summary-line total">
                  <span>Total:</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>
              
              <button onClick={() => setStep(2)} className="next-btn">
                Continuar
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="step-content">
              <h2>Información de Envío</h2>
              <form className="shipping-form">
                <div className="form-group">
                  <label>Dirección de Envío</label>
                  <textarea
                    name="direccion_envio"
                    value={orderData.direccion_envio}
                    onChange={handleInputChange}
                    placeholder="Calle, número, piso, departamento, ciudad, código postal"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>Teléfono de Contacto</label>
                  <input
                    type="tel"
                    name="telefono_contacto"
                    value={orderData.telefono_contacto}
                    onChange={handleInputChange}
                    placeholder="+54 11 1234-5678"
                    required
                  />
                </div>
              </form>
              
              <div className="step-actions">
                <button onClick={() => setStep(1)} className="back-btn">
                  Volver
                </button>
                <button 
                  onClick={() => setStep(3)} 
                  className="next-btn"
                  disabled={!orderData.direccion_envio || !orderData.telefono_contacto}
                >
                  Continuar
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="step-content">
              <h2>Información de Pago (Simulación)</h2>
              <div className="payment-notice">
                <p>⚠️ Este es un pago simulado. No se procesará ningún cargo real.</p>
              </div>
              
              <form className="payment-form">
                <div className="form-group">
                  <label>Método de Pago</label>
                  <select
                    name="metodo_pago"
                    value={orderData.metodo_pago}
                    onChange={handleInputChange}
                  >
                    <option value="tarjeta">Tarjeta de Crédito/Débito</option>
                    <option value="transferencia">Transferencia Bancaria</option>
                    <option value="efectivo">Efectivo contra entrega</option>
                  </select>
                </div>

                {orderData.metodo_pago === 'tarjeta' && (
                  <>
                    <div className="form-group">
                      <label>Número de Tarjeta</label>
                      <input
                        type="text"
                        name="numero_tarjeta"
                        value={orderData.numero_tarjeta}
                        onChange={handleInputChange}
                        placeholder="1234 5678 9012 3456"
                        maxLength="19"
                      />
                    </div>
                    
                    <div className="form-row">
                      <div className="form-group">
                        <label>Vencimiento</label>
                        <input
                          type="text"
                          name="expiracion"
                          value={orderData.expiracion}
                          onChange={handleInputChange}
                          placeholder="MM/AA"
                          maxLength="5"
                        />
                      </div>
                      
                      <div className="form-group">
                        <label>CVV</label>
                        <input
                          type="text"
                          name="cvv"
                          value={orderData.cvv}
                          onChange={handleInputChange}
                          placeholder="123"
                          maxLength="4"
                        />
                      </div>
                    </div>
                    
                    <div className="form-group">
                      <label>Nombre en la Tarjeta</label>
                      <input
                        type="text"
                        name="nombre_tarjeta"
                        value={orderData.nombre_tarjeta}
                        onChange={handleInputChange}
                        placeholder="Juan Pérez"
                      />
                    </div>
                  </>
                )}
              </form>
              
              <div className="final-summary">
                <h3>Total a Pagar: {formatPrice(total)}</h3>
              </div>
              
              <div className="step-actions">
                <button onClick={() => setStep(2)} className="back-btn">
                  Volver
                </button>
                <button 
                  onClick={handleSubmitOrder}
                  className="pay-btn"
                  disabled={loading}
                >
                  {loading ? 'Procesando...' : 'Confirmar Pedido (Simulado)'}
                </button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="step-content confirmation">
              <div className="success-icon">✅</div>
              <h2>¡Pedido Confirmado!</h2>
              <p>Tu pedido ha sido registrado exitosamente.</p>
              <p>Recibirás un email de confirmación en breve.</p>
              
              <div className="order-details">
                <h3>Detalles del Pedido</h3>
                <p><strong>Total:</strong> {formatPrice(total)}</p>
                <p><strong>Estado:</strong> Pendiente de Pago (Simulado)</p>
                <p><strong>Dirección:</strong> {orderData.direccion_envio}</p>
              </div>
              
              <a href="/" className="back-home-btn">
                Volver a la Tienda
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Checkout;