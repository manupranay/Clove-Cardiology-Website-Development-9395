import React from 'react'
import { Link } from 'react-router-dom'
import SafeIcon from '../../common/SafeIcon'
import * as FiIcons from 'react-icons/fi'

const { FiHeart, FiPhone, FiMail, FiMapPin, FiClock, FiFacebook, FiTwitter, FiInstagram, FiLinkedin } = FiIcons

const Footer = () => {
  return (
    <footer className="bg-secondary-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 lg:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-primary-600 p-2 rounded-lg">
                <SafeIcon icon={FiHeart} className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold">Clove Cardiology</h2>
                <p className="text-secondary-400">Excellence in Heart Care</p>
              </div>
            </div>
            <p className="text-secondary-300 mb-6 max-w-md">
              At Clove Cardiology, we are dedicated to providing exceptional cardiovascular care 
              with cutting-edge technology and compassionate service. Your heart health is our priority.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-secondary-400 hover:text-primary-400 transition-colors">
                <SafeIcon icon={FiFacebook} className="w-5 h-5" />
              </a>
              <a href="#" className="text-secondary-400 hover:text-primary-400 transition-colors">
                <SafeIcon icon={FiTwitter} className="w-5 h-5" />
              </a>
              <a href="#" className="text-secondary-400 hover:text-primary-400 transition-colors">
                <SafeIcon icon={FiInstagram} className="w-5 h-5" />
              </a>
              <a href="#" className="text-secondary-400 hover:text-primary-400 transition-colors">
                <SafeIcon icon={FiLinkedin} className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-secondary-300 hover:text-primary-400 transition-colors">Home</Link></li>
              <li><Link to="/services" className="text-secondary-300 hover:text-primary-400 transition-colors">Services</Link></li>
              <li><Link to="/doctors" className="text-secondary-300 hover:text-primary-400 transition-colors">Our Doctors</Link></li>
              <li><Link to="/about" className="text-secondary-300 hover:text-primary-400 transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="text-secondary-300 hover:text-primary-400 transition-colors">Contact</Link></li>
              <li><Link to="/book-consultation" className="text-secondary-300 hover:text-primary-400 transition-colors">Book Consultation</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <SafeIcon icon={FiMapPin} className="w-5 h-5 text-primary-400 mt-0.5" />
                <div>
                  <p className="text-secondary-300">123 Heart Avenue</p>
                  <p className="text-secondary-300">Medical District, NY 10001</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <SafeIcon icon={FiPhone} className="w-5 h-5 text-primary-400" />
                <p className="text-secondary-300">+1 (555) 123-HEART</p>
              </div>
              <div className="flex items-center space-x-3">
                <SafeIcon icon={FiMail} className="w-5 h-5 text-primary-400" />
                <p className="text-secondary-300">info@clovecardiology.com</p>
              </div>
              <div className="flex items-start space-x-3">
                <SafeIcon icon={FiClock} className="w-5 h-5 text-primary-400 mt-0.5" />
                <div>
                  <p className="text-secondary-300">Mon-Fri: 8:00 AM - 6:00 PM</p>
                  <p className="text-secondary-300">Sat: 9:00 AM - 2:00 PM</p>
                  <p className="text-secondary-300">Emergency: 24/7</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-secondary-700 mt-8 pt-8 text-center">
          <p className="text-secondary-400">
            © 2024 Clove Cardiology. All rights reserved. | 
            <Link to="/privacy" className="hover:text-primary-400 transition-colors ml-1">Privacy Policy</Link> | 
            <Link to="/terms" className="hover:text-primary-400 transition-colors ml-1">Terms of Service</Link>
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer