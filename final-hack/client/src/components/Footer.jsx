import { Facebook, Twitter, Linkedin, Instagram } from 'lucide-react'

const Footer = () => {
  return (
    <footer>
      <div className="footer-content">
        <div className="footer-section">
          <h4>About Us</h4>
          <p>We are dedicated to providing the best solutions for your business needs.</p>
        </div>
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            {/* <li><a href="#what">What</a></li>
            <li><a href="#why">Why</a></li>
            <li><a href="#how">How</a></li> */}
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms of Service</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Connect With Us</h4>
          <div className="social-icons">
            <a href="#" className="social-icon"><Facebook size={16} /></a>
            <a href="#" className="social-icon"><Twitter size={16} /></a>
            <a href="#" className="social-icon"><Linkedin size={16} /></a>
            <a href="#" className="social-icon"><Instagram size={16} /></a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 TECHTONIC All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer

