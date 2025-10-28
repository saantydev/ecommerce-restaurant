import { Link } from 'react-router-dom'
import { useCart } from '../../context/CartContext'
import './Header.css'

const Header = () => {
  const { getTotalItems } = useCart()

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          <h1>Restaurante Ecommerce</h1>
        </Link>

        <nav className="nav">
          <Link to="/" className="nav-link">Inicio</Link>
          <Link to="/menu" className="nav-link">Menú</Link>
          <Link to="/login" className="nav-link">Iniciar Sesión</Link>
          <Link to="/register" className="nav-link">Registrarse</Link>
        </nav>

        <div className="cart-container">
          <Link to="/checkout" className="cart-link">
            <span className="cart-icon">🛒</span>
            <span className="cart-count">{getTotalItems()}</span>
          </Link>
        </div>
      </div>
    </header>
  )
}

export default Header