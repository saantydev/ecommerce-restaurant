import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../../context/CartContext'
import ProductCard from '../../components/Product/ProductCard'
import './Home.css'

const Home = () => {
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('todos')
  const [sortBy, setSortBy] = useState('name')
  const [searchTerm, setSearchTerm] = useState('')
  const { addToCart } = useCart()

  // Datos de ejemplo de productos
  useEffect(() => {
    const mockProducts = [
      {
        id: 1,
        name: 'Ensalada César',
        price: 12.99,
        category: 'entradas',
        image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400',
        description: 'Ensalada fresca con pollo, crutones y aderezo césar'
      },
      {
        id: 2,
        name: 'Pizza Margherita',
        price: 18.99,
        category: 'platos-principales',
        image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400',
        description: 'Pizza clásica con mozzarella, tomate y albahaca'
      },
      {
        id: 3,
        name: 'Tiramisú',
        price: 8.99,
        category: 'postres',
        image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400',
        description: 'Postre italiano con café y mascarpone'
      },
      {
        id: 4,
        name: 'Coca Cola',
        price: 3.99,
        category: 'bebidas',
        image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=400',
        description: 'Refresco carbonatado'
      },
      {
        id: 5,
        name: 'Pasta Carbonara',
        price: 16.99,
        category: 'platos-principales',
        image: 'https://images.unsplash.com/photo-1551892376-c73ba8b86727?w=400',
        description: 'Pasta con panceta, huevo y queso parmesano'
      },
      {
        id: 6,
        name: 'Agua Mineral',
        price: 2.99,
        category: 'bebidas',
        image: 'https://images.unsplash.com/photo-1559839914-17aae19cec4?w=400',
        description: 'Agua mineral natural'
      }
    ]
    setProducts(mockProducts)
    setFilteredProducts(mockProducts)
  }, [])

  // Filtrar y ordenar productos
  useEffect(() => {
    let filtered = products

    // Filtrar por categoría
    if (selectedCategory !== 'todos') {
      filtered = filtered.filter(product => product.category === selectedCategory)
    }

    // Filtrar por búsqueda
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Ordenar
    filtered.sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price
      if (sortBy === 'price-desc') return b.price - a.price
      return a.name.localeCompare(b.name)
    })

    setFilteredProducts(filtered)
  }, [products, selectedCategory, sortBy, searchTerm])

  const categories = [
    { value: 'todos', label: 'Todos' },
    { value: 'entradas', label: 'Entradas' },
    { value: 'platos-principales', label: 'Platos Principales' },
    { value: 'postres', label: 'Postres' },
    { value: 'bebidas', label: 'Bebidas' }
  ]

  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <h1>Bienvenido a Restaurante Ecommerce</h1>
          <p>Descubre nuestros deliciosos platos y realiza tu pedido en línea</p>
          <Link to="/menu" className="cta-button">Ver Menú Completo</Link>
        </div>
      </section>

      <section className="products-section">
        <div className="container">
          <h2>Nuestros Productos Destacados</h2>

          <div className="filters">
            <div className="search-bar">
              <input
                type="text"
                placeholder="Buscar productos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>

            <div className="category-filters">
              {categories.map(category => (
                <button
                  key={category.value}
                  className={`filter-btn ${selectedCategory === category.value ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(category.value)}
                >
                  {category.label}
                </button>
              ))}
            </div>

            <div className="sort-options">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="sort-select"
              >
                <option value="name">Ordenar por nombre</option>
                <option value="price-asc">Precio: menor a mayor</option>
                <option value="price-desc">Precio: mayor a menor</option>
              </select>
            </div>
          </div>

          <div className="products-grid">
            {filteredProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={addToCart}
              />
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="no-products">
              <p>No se encontraron productos que coincidan con tu búsqueda.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default Home