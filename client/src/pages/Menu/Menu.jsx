import { useState, useEffect } from 'react'
import { useCart } from '../../context/CartContext'
import ProductCard from '../../components/Product/ProductCard'


const Menu = () => {
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('todos')
  const [sortBy, setSortBy] = useState('name')
  const [searchTerm, setSearchTerm] = useState('')
  const { addToCart } = useCart()

  // Datos de ejemplo de productos más completos
  useEffect(() => {
    const mockProducts = [
      // Entradas
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
        name: 'Bruschetta',
        price: 9.99,
        category: 'entradas',
        image: 'https://images.unsplash.com/photo-1572441713132-fb0c6a3cd4b2?w=400',
        description: 'Pan tostado con tomate, albahaca y aceite de oliva'
      },
      {
        id: 3,
        name: 'Calamares Fritos',
        price: 14.99,
        category: 'entradas',
        image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400',
        description: 'Calamares frescos rebozados y fritos'
      },

      // Platos Principales
      {
        id: 4,
        name: 'Pizza Margherita',
        price: 18.99,
        category: 'platos-principales',
        image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400',
        description: 'Pizza clásica con mozzarella, tomate y albahaca'
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
        name: 'Risotto de Champiñones',
        price: 19.99,
        category: 'platos-principales',
        image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400',
        description: 'Risotto cremoso con champiñones frescos'
      },
      {
        id: 7,
        name: 'Salmón a la Parrilla',
        price: 24.99,
        category: 'platos-principales',
        image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400',
        description: 'Salmón fresco a la parrilla con verduras'
      },
      {
        id: 8,
        name: 'Hamburguesa Gourmet',
        price: 15.99,
        category: 'platos-principales',
        image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400',
        description: 'Hamburguesa con carne premium y toppings especiales'
      },

      // Postres
      {
        id: 9,
        name: 'Tiramisú',
        price: 8.99,
        category: 'postres',
        image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400',
        description: 'Postre italiano con café y mascarpone'
      },
      {
        id: 10,
        name: 'Panna Cotta',
        price: 7.99,
        category: 'postres',
        image: 'https://images.unsplash.com/photo-1488477304112-4944851de03d?w=400',
        description: 'Postre cremoso con salsa de frutos rojos'
      },
      {
        id: 11,
        name: 'Cheesecake de Frutos Rojos',
        price: 9.99,
        category: 'postres',
        image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=400',
        description: 'Cheesecake con topping de frutos rojos'
      },

      // Bebidas
      {
        id: 12,
        name: 'Coca Cola',
        price: 3.99,
        category: 'bebidas',
        image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=400',
        description: 'Refresco carbonatado'
      },
      {
        id: 13,
        name: 'Agua Mineral',
        price: 2.99,
        category: 'bebidas',
        image: 'https://images.unsplash.com/photo-1559839914-17aae19cec4?w=400',
        description: 'Agua mineral natural'
      },
      {
        id: 14,
        name: 'Vino Tinto',
        price: 12.99,
        category: 'bebidas',
        image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=400',
        description: 'Vino tinto de la casa'
      },
      {
        id: 15,
        name: 'Cappuccino',
        price: 4.99,
        category: 'bebidas',
        image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400',
        description: 'Café espresso con leche espumosa'
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
    { value: 'todos', label: 'Todos los Productos' },
    { value: 'entradas', label: 'Entradas' },
    { value: 'platos-principales', label: 'Platos Principales' },
    { value: 'postres', label: 'Postres' },
    { value: 'bebidas', label: 'Bebidas' }
  ]

  return (
    <div className="menu">
      <div className="menu-header">
        <h1>Nuestro Menú</h1>
        <p>Descubre todos nuestros deliciosos platos y bebidas</p>
      </div>

      <div className="menu-content">
        <div className="container">
          <div className="filters">
            <div className="search-bar">
              <input
                type="text"
                placeholder="Buscar en el menú..."
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
                <option value="price-desc">Precio: mayor a mayor</option>
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
      </div>
    </div>
  )
}

export default Menu