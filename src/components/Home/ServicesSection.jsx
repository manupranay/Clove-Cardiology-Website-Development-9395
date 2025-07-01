import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useApp } from '../../context/AppContext'
import SafeIcon from '../../common/SafeIcon'
import * as FiIcons from 'react-icons/fi'

const { FiArrowRight, FiClock, FiUsers } = FiIcons

const ServicesSection = () => {
  const { services, loading } = useApp()

  if (loading) {
    return (
      <section className="py-20 bg-secondary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="h-8 bg-secondary-200 rounded w-64 mx-auto mb-4 animate-pulse"></div>
            <div className="h-4 bg-secondary-200 rounded w-96 mx-auto animate-pulse"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-xl shadow-lg overflow-hidden animate-pulse">
                <div className="h-48 bg-secondary-200"></div>
                <div className="p-6">
                  <div className="h-6 bg-secondary-200 rounded mb-2"></div>
                  <div className="h-16 bg-secondary-200 rounded mb-4"></div>
                  <div className="h-10 bg-secondary-200 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 bg-secondary-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-secondary-900 mb-4">
            Comprehensive Cardiovascular Services
          </h2>
          <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
            From preventive care to advanced interventional procedures, we offer a full 
            spectrum of cardiovascular services using state-of-the-art technology.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {services.slice(0, 3).map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden group"
            >
              {/* Service Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>

              {/* Service Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-secondary-900 mb-3">
                  {service.name}
                </h3>
                <p className="text-secondary-600 mb-4 line-clamp-3">
                  {service.description}
                </p>

                {/* Service Meta */}
                <div className="flex items-center justify-between text-sm text-secondary-500 mb-6">
                  <div className="flex items-center space-x-1">
                    <SafeIcon icon={FiClock} className="w-4 h-4" />
                    <span>{service.duration}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <SafeIcon icon={FiUsers} className="w-4 h-4" />
                    <span>Expert Team</span>
                  </div>
                </div>

                {/* Action Button */}
                <Link
                  to={`/services/${service.id}`}
                  className="inline-flex items-center justify-center space-x-2 w-full border-2 border-primary-600 text-primary-600 px-6 py-3 rounded-lg hover:bg-primary-600 hover:text-white transition-colors duration-200 font-semibold group"
                >
                  <span>View Details</span>
                  <SafeIcon 
                    icon={FiArrowRight} 
                    className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" 
                  />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Services Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link
            to="/services"
            className="inline-flex items-center space-x-2 text-primary-600 hover:text-primary-700 font-semibold text-lg group"
          >
            <span>View All Services</span>
            <SafeIcon 
              icon={FiArrowRight} 
              className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" 
            />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export default ServicesSection