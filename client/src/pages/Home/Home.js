import React, { useState, useEffect } from 'react';

import Hero from '../../components/Hero/Hero';
import OffersSlider from '../../components/OffersSlider/OffersSlider';
import ProductCard from '../../components/ProductCard/ProductCard';
import Cart from '../../components/Cart/Cart';
import { useCart } from '../../context/CartContext';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/products');
      const data = await response.json();
      const productsArray = Array.isArray(data) ? data : [];
      setProducts(productsArray);
      setFilteredProducts(productsArray);
    } catch (error) {
      console.error('Error al cargar productos:', error);
      setProducts([]);
      setFilteredProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (searchTerm) => {
    if (!searchTerm.trim()) {
      setFilteredProducts(products);
      return;
    }
    
    const filtered = products.filter(product =>
      product.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  const handleCategoryFilter = (category) => {
    if (!category) {
      setFilteredProducts(products);
      return;
    }
    
    const filtered = products.filter(product => product.categoria === category);
    setFilteredProducts(filtered);
  };

  const handleAddToCart = (product) => {
    addToCart(product);
    setIsCartOpen(true);
  };

  const featuredProducts = Array.isArray(filteredProducts) ? filteredProducts.filter(product => product.destacado) : [];
  const regularProducts = Array.isArray(filteredProducts) ? filteredProducts.filter(product => !product.destacado) : [];

  if (loading) {
    return (
      <div className="min-h-screen bg-secondary-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
          <p className="text-secondary-600">Cargando productos...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Offers Slider */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <OffersSlider />
      </div>
      
      <Hero />
      
      <main className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          {/* Productos Destacados */}
          {featuredProducts.length > 0 && (
            <section className="mb-16">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-secondary-800 mb-4">⭐ Productos Destacados</h2>
                <p className="text-secondary-600 max-w-2xl mx-auto">Los favoritos de nuestros clientes y sus mascotas</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {featuredProducts.map(product => (
                  <ProductCard
                    key={product.id}
                    product={{
                      ...product,
                      name: product.nombre,
                      description: product.descripcion,
                      category: product.categoria,
                      price: product.precio,
                      stock: product.stock,
                      discount: product.descuento_porcentaje,
                      originalPrice: product.precio_oferta ? product.precio : null,
                      image: product.imagen
                    }}
                    onAddToCart={handleAddToCart}
                  />
                ))}
              </div>
            </section>
          )}

          {/* Todos los Productos */}
          <section>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-secondary-800 mb-4">Todos los Productos</h2>
              <p className="text-secondary-600 max-w-2xl mx-auto">Explora nuestra colección completa</p>
            </div>
            
            {filteredProducts.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-secondary-700 mb-2">No se encontraron productos</h3>
                <p className="text-secondary-500">Intenta con otros términos de búsqueda</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {regularProducts.map(product => (
                  <ProductCard
                    key={product.id}
                    product={{
                      ...product,
                      name: product.nombre,
                      description: product.descripcion,
                      category: product.categoria,
                      price: product.precio,
                      stock: product.stock,
                      discount: product.descuento_porcentaje,
                      originalPrice: product.precio_oferta ? product.precio : null,
                      image: product.imagen
                    }}
                    onAddToCart={handleAddToCart}
                  />
                ))}
              </div>
            )}
          </section>
        </div>
      </main>

      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
};

export default Home;