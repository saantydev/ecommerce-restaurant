import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';

const Header = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const { getCartCount } = useCart();
  const { user, logout } = useAuth();

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Buscar:', searchTerm);
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
    <header className="bg-white shadow-sm border-b border-secondary-100 sticky top-0 z-50">
      {/* Top Bar */}
      <div className="bg-primary-500 text-white py-2">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm">
          🚚 Envío gratis en compras superiores a $120.000
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">🐾</span>
            </div>
            <span className="text-xl font-bold text-secondary-800">PetShop</span>
          </div>

          {/* Search Bar - Desktop */}
          <form className="hidden md:flex flex-1 max-w-lg mx-8" onSubmit={handleSearch}>
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Buscar productos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-secondary-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <button type="submit" className="absolute left-3 top-2.5 text-secondary-400 hover:text-primary-500">
                🔍
              </button>
            </div>
          </form>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="hidden sm:flex items-center space-x-3">
                <span className="text-secondary-600">Hola, {user.nombre}</span>
                <button onClick={logout} className="text-sm text-primary-500 hover:text-primary-600">
                  Salir
                </button>
              </div>
            ) : (
              <div className="hidden sm:flex items-center space-x-3">
                <a href="/login" className="text-secondary-600 hover:text-primary-500">Ingresar</a>
                <a href="/register" className="text-secondary-600 hover:text-primary-500">Registrarse</a>
              </div>
            )}
            
            <div className="relative">
              <button className="text-2xl">
                🛒
              </button>
              {getCartCount() > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {getCartCount()}
                </span>
              )}
            </div>

            <button 
              className="md:hidden p-2 text-secondary-600"
              onClick={() => setShowMobileMenu(!showMobileMenu)}
            >
              ☰
            </button>
          </div>
        </div>

        {/* Navigation - Desktop */}
        <nav className="hidden md:flex space-x-8 py-4 border-t border-secondary-100">
          {categories.map(category => (
            <button
              key={category.value}
              onClick={() => console.log('Filtrar por:', category.value)}
              className="text-secondary-600 hover:text-primary-500 font-medium transition-colors"
            >
              {category.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Mobile Menu */}
      {showMobileMenu && (
        <div className="md:hidden bg-white border-t border-secondary-100">
          <div className="px-4 py-4 space-y-4">
            {/* Mobile Search */}
            <form onSubmit={handleSearch}>
              <input
                type="text"
                placeholder="Buscar productos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-secondary-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </form>

            {/* Mobile Navigation */}
            <nav className="space-y-2">
              {categories.map(category => (
                <button
                  key={category.value}
                  onClick={() => {
                    console.log('Filtrar por:', category.value);
                    setShowMobileMenu(false);
                  }}
                  className="block w-full text-left py-2 text-secondary-600 hover:text-primary-500"
                >
                  {category.label}
                </button>
              ))}
            </nav>

            {/* Mobile Auth */}
            <div className="pt-4 border-t border-secondary-100">
              {user ? (
                <div className="space-y-2">
                  <p className="text-secondary-600">Hola, {user.nombre}</p>
                  <button onClick={logout} className="text-primary-500">Salir</button>
                </div>
              ) : (
                <div className="space-y-2">
                  <a href="/login" className="block text-secondary-600 hover:text-primary-500">Ingresar</a>
                  <a href="/register" className="block text-secondary-600 hover:text-primary-500">Registrarse</a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;