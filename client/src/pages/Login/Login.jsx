import { useState } from 'react'
import { Link } from 'react-router-dom'
import './Login.css'

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Aquí iría la lógica de autenticación
    console.log('Login attempt:', formData)

    // Simulación de login exitoso
    alert('Inicio de sesión exitoso (simulado)')
  }

  return (
    <div className="login">
      <div className="container">
        <div className="login-form">
          <h1>Iniciar Sesión</h1>
          <p>Accede a tu cuenta para realizar pedidos</p>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="tu@email.com"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Contraseña</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Tu contraseña"
              />
            </div>

            <button type="submit" className="login-btn">
              Iniciar Sesión
            </button>
          </form>

          <div className="login-links">
            <Link to="/register" className="register-link">
              ¿No tienes cuenta? Regístrate aquí
            </Link>
            <a href="#" className="forgot-password">
              ¿Olvidaste tu contraseña?
            </a>
          </div>

          <div className="divider">
            <span>O</span>
          </div>

          <div className="social-login">
            <button className="social-btn google-btn">
              Continuar con Google
            </button>
            <button className="social-btn facebook-btn">
              Continuar con Facebook
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login