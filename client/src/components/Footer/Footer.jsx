import './Footer.css'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>Restaurante Ecommerce</h3>
          <p>La mejor experiencia culinaria a tu alcance</p>
        </div>

        <div className="footer-section">
          <h4>Enlaces</h4>
          <ul>
            <li><a href="#about">Sobre nosotros</a></li>
            <li><a href="#contact">Contacto</a></li>
            <li><a href="#privacy">Política de privacidad</a></li>
            <li><a href="#terms">Términos y condiciones</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Síguenos</h4>
          <div className="social-links">
            <a href="#" className="social-link">Facebook</a>
            <a href="#" className="social-link">Instagram</a>
            <a href="#" className="social-link">Twitter</a>
          </div>
        </div>

        <div className="footer-section">
          <h4>Contacto</h4>
          <p>Teléfono: (123) 456-7890</p>
          <p>Email: info@restaurante.com</p>
          <p>Dirección: Calle Principal 123</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2024 Restaurante Ecommerce. Todos los derechos reservados.</p>
      </div>
    </footer>
  )
}

export default Footer