import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useApp } from '../context/AppContext'
import SafeIcon from '../common/SafeIcon'
import * as FiIcons from 'react-icons/fi'

const { FiArrowLeft, FiClock, FiUsers, FiCheck, FiCalendar, FiInfo } = FiIcons

const ServiceDetail = () => {
  const { id } = useParams()
  const { services, loading } = useApp()
  
  const service = services.find(s => s.id === parseInt(id))

  if (loading) {
    return (
      <div className="min-h-screen bg-secondary-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden animate-pulse">
            <div className="h-64 bg-secondary-200"></div>
            <div className="p-8">
              <div className="h-8 bg-secondary-200 rounded mb-4"></div>
              <div className="h-4 bg-secondary-200 rounded mb-8 w-2/3"></div>
              <div className="space-y-4">
                <div className="h-4 bg-secondary-200 rounded"></div>
                <div className="h-4 bg-secondary-200 rounded"></div>
                <div className="h-4 bg-secondary-200 rounded w-3/4"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!service) {
    return (
      <div className="min-h-screen bg-secondary-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h2 className="text-2xl font-bold text-secondary-900 mb-2">Service Not Found</h2>
          <p className="text-secondary-600 mb-6">The service you're looking for doesn't exist.</p>
          <Link
            to="/services"
            className="inline-flex items-center space-x-2 bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors duration-200"
          >
            <SafeIcon icon={FiArrowLeft} className="w-4 h-4" />
            <span>Back to Services</span>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-secondary-50">
      {/* Back Button */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <Link
          to="/services"
          className="inline-flex items-center space-x-2 text-primary-600 hover:text-primary-700 font-semibold group"
        >
          <SafeIcon 
            icon={FiArrowLeft} 
            className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" 
          />
          <span>Back to Services</span>
        </Link>
      </div>

      {/* Service Detail */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-xl shadow-lg overflow-hidden"
        >
          {/* Service Image */}
          <div className="relative h-64 md:h-80">
            <img
              src={service.image}
              alt={service.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
            <div className="absolute bottom-6 left-6 text-white">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">{service.name}</h1>
              <p className="text-lg opacity-90">{service.description}</p>
            </div>
          </div>

          {/* Service Content */}
          <div className="p-8">
            {/* Service Meta */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="flex items-center space-x-3 p-4 bg-primary-50 rounded-lg">
                <SafeIcon icon={FiClock} className="w-6 h-6 text-primary-600" />
                <div>
                  <div className="font-semibold text-secondary-900">Duration</div>
                  <div className="text-secondary-600">{service.duration}</div>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-4 bg-primary-50 rounded-lg">
                <SafeIcon icon={FiUsers} className="w-6 h-6 text-primary-600" />
                <div>
                  <div className="font-semibold text-secondary-900">Team</div>
                  <div className="text-secondary-600">Expert Specialists</div>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-4 bg-primary-50 rounded-lg">
                <SafeIcon icon={FiInfo} className="w-6 h-6 text-primary-600" />
                <div>
                  <div className="font-semibold text-secondary-900">Preparation</div>
                  <div className="text-secondary-600">{service.preparation}</div>
                </div>
              </div>
            </div>

            {/* Service Details */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-secondary-900 mb-4">About This Service</h2>
              <p className="text-secondary-700 leading-relaxed">
                {service.details}
              </p>
            </div>

            {/* Service Features */}
            {service.features && service.features.length > 0 && (
              <div className="mb-8">
                <h3 className="text-xl font-bold text-secondary-900 mb-4">Key Features</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {service.features.map((feature, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <SafeIcon icon={FiCheck} className="w-5 h-5 text-primary-600 mt-0.5" />
                      <span className="text-secondary-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Call to Action */}
            <div className="bg-primary-50 rounded-lg p-6">
              <h3 className="text-xl font-bold text-secondary-900 mb-2">
                Ready to Schedule?
              </h3>
              <p className="text-secondary-600 mb-4">
                Contact us today to learn more about this service or to schedule your consultation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/book-consultation"
                  className="inline-flex items-center justify-center space-x-2 bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors duration-200 font-semibold"
                >
                  <SafeIcon icon={FiCalendar} className="w-4 h-4" />
                  <span>Book Consultation</span>
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center space-x-2 border-2 border-primary-600 text-primary-600 px-6 py-3 rounded-lg hover:bg-primary-600 hover:text-white transition-colors duration-200 font-semibold"
                >
                  <span>Contact Us</span>
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default ServiceDetail