import React, { useState } from 'react';
import { Heart, ShoppingCart, Star, Eye } from 'lucide-react';

const ProductCard = ({ product, onAddToCart, onToggleWishlist }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isInWishlist, setIsInWishlist] = useState(false);

  const handleWishlistToggle = () => {
    setIsInWishlist(!isInWishlist);
    onToggleWishlist?.(product.id);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 0
    }).format(price);
  };

  // Calcular precio con descuento
  const calculateDiscountedPrice = (originalPrice, discountPercentage) => {
    if (!discountPercentage) return originalPrice;
    return originalPrice * (1 - discountPercentage / 100);
  };

  const originalPrice = product.price;
  const discountPercentage = product.discount || product.descuento_porcentaje || 0;
  const finalPrice = calculateDiscountedPrice(originalPrice, discountPercentage);
  const hasDiscount = discountPercentage > 0;

  return (
    <div 
      className="card group cursor-pointer transform transition-all duration-300 hover:-translate-y-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative overflow-hidden rounded-t-xl">
        <div className="aspect-square bg-gradient-to-br from-secondary-50 to-secondary-100 flex items-center justify-center">
          {product.image ? (
            <img 
              src={product.image} 
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
          ) : (
            <div className="text-6xl opacity-50">
              {product.category === 'comederos' ? '🍽️' : 
               product.category === 'juguetes' ? '🎾' :
               product.category === 'camas' ? '🛏️' :
               product.category === 'collares' ? '🦴' : '🐾'}
            </div>
          )}
        </div>

        {/* Overlay Actions */}
        <div className={`absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center space-x-3 transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}>
          <button className="p-2 bg-white rounded-full shadow-lg hover:bg-primary-500 hover:text-white transition-colors">
            <Eye className="w-5 h-5" />
          </button>
          <button 
            onClick={handleWishlistToggle}
            className={`p-2 rounded-full shadow-lg transition-colors ${
              isInWishlist 
                ? 'bg-primary-500 text-white' 
                : 'bg-white text-secondary-600 hover:bg-primary-500 hover:text-white'
            }`}
          >
            <Heart className={`w-5 h-5 ${isInWishlist ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Badges */}
        <div className="absolute top-3 left-3 space-y-2">
          {product.isNew && (
            <span className="bg-primary-500 text-white px-2 py-1 rounded-full text-xs font-medium">
              Nuevo
            </span>
          )}
          {hasDiscount && (
            <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium animate-pulse">
              -{discountPercentage}% OFF
            </span>
          )}
        </div>

        {/* Stock Status */}
        <div className="absolute top-3 right-3">
          <div className={`w-3 h-3 rounded-full ${
            product.stock > 10 ? 'bg-green-500' : 
            product.stock > 0 ? 'bg-yellow-500' : 'bg-red-500'
          }`}></div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Category */}
        <p className="text-xs text-primary-500 font-medium uppercase tracking-wide mb-2">
          {product.category}
        </p>

        {/* Title */}
        <h3 className="font-semibold text-secondary-800 mb-2 line-clamp-2 group-hover:text-primary-500 transition-colors">
          {product.name}
        </h3>

        {/* Description */}
        <p className="text-sm text-secondary-600 mb-4 line-clamp-2">
          {product.description}
        </p>

        {/* Rating */}
        <div className="flex items-center space-x-2 mb-4">
          <div className="flex items-center space-x-1">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className={`w-4 h-4 ${
                  i < Math.floor(product.rating || 4.5) 
                    ? 'text-yellow-400 fill-current' 
                    : 'text-secondary-300'
                }`} 
              />
            ))}
          </div>
          <span className="text-sm text-secondary-500">
            ({product.reviews || 0})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between mb-4">
          <div className="space-y-1">
            {hasDiscount && (
              <p className="text-sm text-secondary-400 line-through">
                {formatPrice(originalPrice)}
              </p>
            )}
            <p className={`text-xl font-bold ${
              hasDiscount ? 'text-red-600' : 'text-secondary-800'
            }`}>
              {formatPrice(finalPrice)}
            </p>
            {hasDiscount && (
              <p className="text-xs text-green-600 font-medium">
                ¡Ahorrás {formatPrice(originalPrice - finalPrice)}!
              </p>
            )}
          </div>
          
          {product.stock <= 5 && product.stock > 0 && (
            <span className="text-xs text-orange-600 font-medium">
              ¡Últimas {product.stock}!
            </span>
          )}
        </div>

        {/* Add to Cart Button */}
        <button 
          onClick={() => onAddToCart?.(product)}
          disabled={product.stock === 0}
          className={`w-full btn transition-all duration-200 ${
            product.stock === 0 
              ? 'bg-secondary-200 text-secondary-500 cursor-not-allowed' 
              : 'btn-primary group'
          }`}
        >
          {product.stock === 0 ? (
            'Sin Stock'
          ) : (
            <>
              <ShoppingCart className="w-4 h-4 group-hover:scale-110 transition-transform" />
              Agregar al Carrito
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;