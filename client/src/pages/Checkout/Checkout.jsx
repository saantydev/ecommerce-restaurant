import { useState } from 'react'
import { useCart } from '../../context/CartContext'
import './Checkout.css'

const Checkout = () => {
  const {
    cart,
    peopleCount,
    setPeopleCount,
    getTotalPrice,
    clearCart,
    updateQuantity,
    removeFromCart
  } = useCart()

  const [discountCode, setDiscountCode] = useState('')
  const [appliedDiscount, setAppliedDiscount] = useState(0)
  const [orderNotes, setOrderNotes] = useState('')
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  })

  // Códigos de descuento válidos
  const validDiscounts = {
    'DESCUENTO10': 0.1,
    'RESTAURANT20': 0.2,
    'PRIMERA5': 0.05
  }

  const handleApplyDiscount = () => {
    if (validDiscounts[discountCode.toUpperCase()]) {
      const discountRate = validDiscounts[discountCode.toUpperCase()]
      const discountAmount = getTotalPrice() * discountRate
      setAppliedDiscount(discountAmount)
    } else {
      alert('Código de descuento inválido')
      setAppliedDiscount(0)
    }
  }

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId)
    } else {
      updateQuantity(productId, newQuantity)
    }
  }

  const subtotal = getTotalPrice()
  const discount = appliedDiscount
  const total = subtotal - discount

  const handleSubmitOrder = (e) => {
    e.preventDefault()

    // Validar que el carrito no exceda el límite
    const maxItemsPerPerson = 4
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)
    const maxTotalItems = peopleCount * maxItemsPerPerson

    if (totalItems > maxTotalItems) {
      alert(`No puedes tener más de ${maxItemsPerPerson} artículos por comensal. Total máximo: ${maxTotalItems}`)
      return
    }

    // Validar información del cliente
    if (!customerInfo.name || !customerInfo.email || !customerInfo.phone) {
      alert('Por favor completa toda la información requerida')
      return
    }

    // Aquí iría la lógica para enviar el pedido al backend
    const orderData = {
      customer: customerInfo,
      items: cart,
      peopleCount,
      subtotal,
      discount,
      total,
      notes: orderNotes,
      timestamp: new Date().toISOString()
    }

    console.log('Pedido enviado:', orderData)
    alert('¡Pedido realizado con éxito! Te contactaremos pronto.')

    // Limpiar carrito y formulario
    clearCart()
    setCustomerInfo({ name: '', email: '', phone: '', address: '' })
    setOrderNotes('')
    setDiscountCode('')
    setAppliedDiscount(0)
  }

  if (cart.length === 0) {
    return (
      <div className="checkout">
        <div className="container">
          <div className="empty-cart">
            <h2>Tu carrito está vacío</h2>
            <p>Agrega algunos productos antes de proceder al checkout.</p>
            <a href="/menu" className="back-to-menu-btn">Ver Menú</a>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="checkout">
      <div className="container">
        <h1>Finalizar Pedido</h1>

        <div className="checkout-content">
          <div className="checkout-left">
            <div className="cart-section">
              <h2>Tu Pedido</h2>

              <div className="people-count">
                <label htmlFor="peopleCount">Número de personas por mesa:</label>
                <select
                  id="peopleCount"
                  value={peopleCount}
                  onChange={(e) => setPeopleCount(parseInt(e.target.value))}
                >
                  {[1,2,3,4,5,6,7,8].map(num => (
                    <option key={num} value={num}>{num}</option>
                  ))}
                </select>
                <span className="limit-info">
                  Límite: {peopleCount * 4} artículos máximo
                </span>
              </div>

              <div className="cart-items">
                {cart.map(item => (
                  <div key={item.id} className="cart-item">
                    <div className="item-info">
                      <h4>{item.name}</h4>
                      <p>${item.price.toFixed(2)} c/u</p>
                    </div>
                    <div className="quantity-controls">
                      <button
                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                        className="quantity-btn"
                      >
                        -
                      </button>
                      <span className="quantity">{item.quantity}</span>
                      <button
                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                        className="quantity-btn"
                      >
                        +
                      </button>
                    </div>
                    <div className="item-total">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="remove-btn"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="discount-section">
              <h3>Código de Descuento</h3>
              <div className="discount-input">
                <input
                  type="text"
                  placeholder="Ingresa código de descuento"
                  value={discountCode}
                  onChange={(e) => setDiscountCode(e.target.value)}
                />
                <button onClick={handleApplyDiscount} className="apply-btn">
                  Aplicar
                </button>
              </div>
              {appliedDiscount > 0 && (
                <p className="discount-applied">
                  Descuento aplicado: -${appliedDiscount.toFixed(2)}
                </p>
              )}
            </div>
          </div>

          <div className="checkout-right">
            <div className="order-summary">
              <h2>Resumen del Pedido</h2>

              <div className="summary-row">
                <span>Subtotal:</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>

              {discount > 0 && (
                <div className="summary-row discount">
                  <span>Descuento:</span>
                  <span>-${discount.toFixed(2)}</span>
                </div>
              )}

              <div className="summary-row total">
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <form onSubmit={handleSubmitOrder} className="customer-form">
              <h3>Información de Contacto</h3>

              <div className="form-group">
                <label htmlFor="name">Nombre completo *</label>
                <input
                  type="text"
                  id="name"
                  required
                  value={customerInfo.name}
                  onChange={(e) => setCustomerInfo({...customerInfo, name: e.target.value})}
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input
                  type="email"
                  id="email"
                  required
                  value={customerInfo.email}
                  onChange={(e) => setCustomerInfo({...customerInfo, email: e.target.value})}
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Teléfono *</label>
                <input
                  type="tel"
                  id="phone"
                  required
                  value={customerInfo.phone}
                  onChange={(e) => setCustomerInfo({...customerInfo, phone: e.target.value})}
                />
              </div>

              <div className="form-group">
                <label htmlFor="address">Dirección (opcional)</label>
                <textarea
                  id="address"
                  value={customerInfo.address}
                  onChange={(e) => setCustomerInfo({...customerInfo, address: e.target.value})}
                  placeholder="Dirección de entrega si es diferente"
                />
              </div>

              <div className="form-group">
                <label htmlFor="notes">Notas del pedido (opcional)</label>
                <textarea
                  id="notes"
                  value={orderNotes}
                  onChange={(e) => setOrderNotes(e.target.value)}
                  placeholder="Instrucciones especiales, alergias, etc."
                />
              </div>

              <button type="submit" className="submit-order-btn">
                Realizar Pedido
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout