import { useState } from 'react'
import './Admin.css'

const Admin = () => {
  const [activeTab, setActiveTab] = useState('products')
  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'Ensalada César',
      price: 12.99,
      category: 'entradas',
      description: 'Ensalada fresca con pollo, crutones y aderezo césar',
      image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400',
      stock: 50
    },
    {
      id: 2,
      name: 'Pizza Margherita',
      price: 18.99,
      category: 'platos-principales',
      description: 'Pizza clásica con mozzarella, tomate y albahaca',
      image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400',
      stock: 30
    }
  ])

  const [orders, setOrders] = useState([
    {
      id: 1,
      customer: 'Juan Pérez',
      email: 'juan@email.com',
      phone: '123-456-7890',
      items: [
        { name: 'Ensalada César', quantity: 2, price: 12.99 },
        { name: 'Pizza Margherita', quantity: 1, price: 18.99 }
      ],
      total: 44.97,
      status: 'pendiente',
      date: '2024-01-15'
    }
  ])

  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    category: 'entradas',
    description: '',
    image: '',
    stock: ''
  })

  const handleAddProduct = (e) => {
    e.preventDefault()
    const product = {
      id: products.length + 1,
      ...newProduct,
      price: parseFloat(newProduct.price),
      stock: parseInt(newProduct.stock)
    }
    setProducts([...products, product])
    setNewProduct({
      name: '',
      price: '',
      category: 'entradas',
      description: '',
      image: '',
      stock: ''
    })
    alert('Producto agregado exitosamente')
  }

  const handleDeleteProduct = (productId) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este producto?')) {
      setProducts(products.filter(p => p.id !== productId))
    }
  }

  const handleUpdateOrderStatus = (orderId, newStatus) => {
    setOrders(orders.map(order =>
      order.id === orderId ? { ...order, status: newStatus } : order
    ))
  }

  const categories = [
    { value: 'entradas', label: 'Entradas' },
    { value: 'platos-principales', label: 'Platos Principales' },
    { value: 'postres', label: 'Postres' },
    { value: 'bebidas', label: 'Bebidas' }
  ]

  return (
    <div className="admin">
      <div className="container">
        <h1>Panel de Administración</h1>

        <div className="admin-tabs">
          <button
            className={`tab-btn ${activeTab === 'products' ? 'active' : ''}`}
            onClick={() => setActiveTab('products')}
          >
            Gestión de Productos
          </button>
          <button
            className={`tab-btn ${activeTab === 'orders' ? 'active' : ''}`}
            onClick={() => setActiveTab('orders')}
          >
            Gestión de Pedidos
          </button>
          <button
            className={`tab-btn ${activeTab === 'analytics' ? 'active' : ''}`}
            onClick={() => setActiveTab('analytics')}
          >
            Estadísticas
          </button>
        </div>

        <div className="admin-content">
          {activeTab === 'products' && (
            <div className="products-management">
              <div className="add-product-section">
                <h2>Agregar Nuevo Producto</h2>
                <form onSubmit={handleAddProduct} className="add-product-form">
                  <div className="form-row">
                    <div className="form-group">
                      <label>Nombre del Producto</label>
                      <input
                        type="text"
                        value={newProduct.name}
                        onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Precio</label>
                      <input
                        type="number"
                        step="0.01"
                        value={newProduct.price}
                        onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Categoría</label>
                      <select
                        value={newProduct.category}
                        onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                      >
                        {categories.map(cat => (
                          <option key={cat.value} value={cat.value}>{cat.label}</option>
                        ))}
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Stock</label>
                      <input
                        type="number"
                        value={newProduct.stock}
                        onChange={(e) => setNewProduct({...newProduct, stock: e.target.value})}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Descripción</label>
                    <textarea
                      value={newProduct.description}
                      onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>URL de Imagen</label>
                    <input
                      type="url"
                      value={newProduct.image}
                      onChange={(e) => setNewProduct({...newProduct, image: e.target.value})}
                      required
                    />
                  </div>

                  <button type="submit" className="add-product-btn">
                    Agregar Producto
                  </button>
                </form>
              </div>

              <div className="products-list">
                <h2>Productos Existentes</h2>
                <div className="products-table">
                  <table>
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Categoría</th>
                        <th>Precio</th>
                        <th>Stock</th>
                        <th>Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map(product => (
                        <tr key={product.id}>
                          <td>{product.id}</td>
                          <td>{product.name}</td>
                          <td>{categories.find(c => c.value === product.category)?.label}</td>
                          <td>${product.price.toFixed(2)}</td>
                          <td>{product.stock}</td>
                          <td>
                            <button className="edit-btn">Editar</button>
                            <button
                              className="delete-btn"
                              onClick={() => handleDeleteProduct(product.id)}
                            >
                              Eliminar
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'orders' && (
            <div className="orders-management">
              <h2>Gestión de Pedidos</h2>
              <div className="orders-list">
                {orders.map(order => (
                  <div key={order.id} className="order-card">
                    <div className="order-header">
                      <h3>Pedido #{order.id}</h3>
                      <span className={`order-status status-${order.status}`}>
                        {order.status}
                      </span>
                    </div>

                    <div className="order-info">
                      <p><strong>Cliente:</strong> {order.customer}</p>
                      <p><strong>Email:</strong> {order.email}</p>
                      <p><strong>Teléfono:</strong> {order.phone}</p>
                      <p><strong>Fecha:</strong> {order.date}</p>
                      <p><strong>Total:</strong> ${order.total.toFixed(2)}</p>
                    </div>

                    <div className="order-items">
                      <h4>Productos:</h4>
                      <ul>
                        {order.items.map((item, index) => (
                          <li key={index}>
                            {item.name} x{item.quantity} - ${item.price.toFixed(2)}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="order-actions">
                      <select
                        value={order.status}
                        onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value)}
                        className="status-select"
                      >
                        <option value="pendiente">Pendiente</option>
                        <option value="preparando">Preparando</option>
                        <option value="listo">Listo para entrega</option>
                        <option value="entregado">Entregado</option>
                        <option value="cancelado">Cancelado</option>
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="analytics">
              <h2>Estadísticas del Restaurante</h2>

              <div className="stats-grid">
                <div className="stat-card">
                  <h3>Total de Productos</h3>
                  <div className="stat-number">{products.length}</div>
                </div>

                <div className="stat-card">
                  <h3>Pedidos del Día</h3>
                  <div className="stat-number">{orders.length}</div>
                </div>

                <div className="stat-card">
                  <h3>Ingresos del Día</h3>
                  <div className="stat-number">
                    ${orders.reduce((sum, order) => sum + order.total, 0).toFixed(2)}
                  </div>
                </div>

                <div className="stat-card">
                  <h3>Productos con Stock Bajo</h3>
                  <div className="stat-number">
                    {products.filter(p => p.stock < 10).length}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Admin