import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useApp } from '../context/AppContext'
import SafeIcon from '../common/SafeIcon'
import * as FiIcons from 'react-icons/fi'

const { FiArrowRight, FiClock, FiUsers, FiCheck } = FiIcons

const Services = () => {
  const { services, loading } = useApp()

  if (loading) {
    return (
      <div className="min-h-screen bg-secondary-50">
        {/* Hero Section Skeleton */}
        <div className="bg-gradient-to-br from-primary-50 to-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="h-12 bg-secondary-200 rounded w-96 mx-auto mb-4 animate-pulse"></div>
            <div className="h-6 bg-secondary-200 rounded w-2/3 mx-auto animate-pulse"></div>
          </div>
        </div>

        {/* Services Grid Skeleton */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
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
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-secondary-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl lg:text-6xl font-bold text-secondary-900 mb-6">
              Our <span className="text-primary-600">Services</span>
            </h1>
            <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
              Comprehensive cardiovascular care tailored to your needs. From preventive 
              screenings to advanced interventional procedures, we're here for your heart health.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
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
                  <p className="text-secondary-600 mb-4">
                    {service.description}
                  </p>

                  {/* Service Features */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-secondary-800 mb-2">Key Features:</h4>
                    <ul className="space-y-1">
                      {service.features?.slice(0, 2).map((feature, idx) => (
                        <li key={idx} className="flex items-center space-x-2 text-sm text-secondary-600">
                          <SafeIcon icon={FiCheck} className="w-4 h-4 text-primary-600" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

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
                    className="inline-flex items-center justify-center space-x-2 w-full bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors duration-200 font-semibold group"
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

          {/* Empty State */}
          {services.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center py-16"
            >
              <div className="bg-white rounded-xl shadow-lg p-12 max-w-md mx-auto">
                <div className="text-6xl mb-4">🏥</div>
                <h3 className="text-xl font-semibold text-secondary-900 mb-2">
                  No Services Available
                </h3>
                <p className="text-secondary-600">
                  Services will appear here once they are added to the system.
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  )
}

export default Services