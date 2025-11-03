import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import './Header.css';

const Header = ({ onSearch, onCategoryFilter }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const { getCartCount } = useCart();
  const { user, logout } = useAuth();

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  const categories = [
    { value: '', label: 'Todos' },
    { value: 'comederos', label: 'Comederos' },
    { value: 'juguetes', label: 'Juguetes' },
    { value: 'camas', label: 'Camas' },
    { value: 'collares', label: 'Collares' },
    { value: 'rascadores', label: 'Rascadores' }
  ];

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-top">
          <div className="logo">
            <h1>🐾 PetShop</h1>
          </div>
          
          <form className="search-form" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Buscar productos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <button type="submit" className="search-btn">🔍</button>
          </form>

          <div className="header-actions">
            {user ? (
              <div className="user-menu">
                <span>Hola, {user.nombre}</span>
                <button onClick={logout} className="logout-btn">Salir</button>
              </div>
            ) : (
              <div className="auth-links">
                <a href="/login">Ingresar</a>
                <a href="/register">Registrarse</a>
              </div>
            )}
            
            <div className="cart-icon">
              <span className="cart-count">{getCartCount()}</span>
              🛒
            </div>
          </div>

          <button 
            className="mobile-menu-btn"
            onClick={() => setShowMobileMenu(!showMobileMenu)}
          >
            ☰
          </button>
        </div>

        <nav className={`nav ${showMobileMenu ? 'nav-open' : ''}`}>
          <div className="categories">
            {categories.map(category => (
              <button
                key={category.value}
                onClick={() => onCategoryFilter(category.value)}
                className="category-btn"
              >
                {category.label}
              </button>
            ))}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;