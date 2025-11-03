import React, { useState, useEffect } from 'react';
import Header from '../../components/Header/Header';
import ProductCard from '../../components/Product/ProductCard';
import Cart from '../../components/Cart/Cart';
import { useCart } from '../../context/CartContext';
import './Home.css';

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
      <div className="loading">
        <div className="spinner"></div>
        <p>Cargando productos...</p>
      </div>
    );
  }

  return (
    <div className="home">
      <Header 
        onSearch={handleSearch}
        onCategoryFilter={handleCategoryFilter}
      />
      
      <main className="main-content">
        <div className="container">
          {/* Hero Section */}
          <section className="hero">
            <div className="hero-content">
              <h1>🐾 Todo para tu Mascota</h1>
              <p>Encuentra los mejores productos para el cuidado y diversión de tu compañero fiel</p>
            </div>
          </section>

          {/* Productos Destacados */}
          {featuredProducts.length > 0 && (
            <section className="featured-section">
              <h2>⭐ Productos Destacados</h2>
              <div className="products-grid featured-grid">
                {featuredProducts.map(product => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={handleAddToCart}
                  />
                ))}
              </div>
            </section>
          )}

          {/* Todos los Productos */}
          <section className="products-section">
            <h2>Todos los Productos</h2>
            {filteredProducts.length === 0 ? (
              <div className="no-products">
                <p>No se encontraron productos</p>
                <span>🔍</span>
              </div>
            ) : (
              <div className="products-grid">
                {regularProducts.map(product => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={handleAddToCart}
                  />
                ))}
              </div>
            )}
          </section>
        </div>
      </main>

      <Cart 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
      />
    </div>
  );
};

export default Home;