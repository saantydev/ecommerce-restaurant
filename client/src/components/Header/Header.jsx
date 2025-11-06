import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ShoppingCart, Menu, X, Heart, User } from 'lucide-react';

const Header = ({ cartItemsCount = 0 }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { name: 'Comederos', href: '/categoria/comederos' },
    { name: 'Juguetes', href: '/categoria/juguetes' },
    { name: 'Camas', href: '/categoria/camas' },
    { name: 'Collares', href: '/categoria/collares' },
    { name: 'Accesorios', href: '/categoria/accesorios' }
  ];

  return (
    <header className="bg-white shadow-sm border-b border-secondary-100 sticky top-0 z-50">
      {/* Top Bar */}
      <div className="bg-primary-500 text-white py-2">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm">
          🚚 Envío gratis en compras superiores a $50.000
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center group-hover:bg-primary-600 transition-colors">
              <span className="text-white font-bold text-xl">🐾</span>
            </div>
            <span className="text-xl font-bold text-secondary-800">PetShop</span>
          </Link>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Buscar productos para tu mascota..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-secondary-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-secondary-400" />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {/* Search - Mobile */}
            <button className="md:hidden p-2 text-secondary-600 hover:text-primary-500 transition-colors">
              <Search className="h-5 w-5" />
            </button>

            {/* Wishlist */}
            <button className="hidden sm:flex p-2 text-secondary-600 hover:text-primary-500 transition-colors">
              <Heart className="h-5 w-5" />
            </button>

            {/* User */}
            <Link to="/login" className="hidden sm:flex p-2 text-secondary-600 hover:text-primary-500 transition-colors">
              <User className="h-5 w-5" />
            </Link>

            {/* Cart */}
            <Link to="/cart" className="relative p-2 text-secondary-600 hover:text-primary-500 transition-colors">
              <ShoppingCart className="h-5 w-5" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-bounce-soft">
                  {cartItemsCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-secondary-600 hover:text-primary-500 transition-colors"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Navigation - Desktop */}
        <nav className="hidden md:flex space-x-8 py-4 border-t border-secondary-100">
          {categories.map((category) => (
            <Link
              key={category.name}
              to={category.href}
              className="text-secondary-600 hover:text-primary-500 font-medium transition-colors relative group"
            >
              {category.name}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-500 transition-all duration-200 group-hover:w-full"></span>
            </Link>
          ))}
        </nav>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-secondary-100 animate-slide-up">
          <div className="px-4 py-4 space-y-4">
            {/* Mobile Search */}
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar productos..."
                className="w-full pl-10 pr-4 py-2 border border-secondary-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-secondary-400" />
            </div>

            {/* Mobile Navigation */}
            <nav className="space-y-2">
              {categories.map((category) => (
                <Link
                  key={category.name}
                  to={category.href}
                  className="block py-2 text-secondary-600 hover:text-primary-500 font-medium transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {category.name}
                </Link>
              ))}
            </nav>

            {/* Mobile Actions */}
            <div className="flex space-x-4 pt-4 border-t border-secondary-100">
              <Link to="/login" className="flex items-center space-x-2 text-secondary-600 hover:text-primary-500">
                <User className="h-5 w-5" />
                <span>Mi Cuenta</span>
              </Link>
              <button className="flex items-center space-x-2 text-secondary-600 hover:text-primary-500">
                <Heart className="h-5 w-5" />
                <span>Favoritos</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;