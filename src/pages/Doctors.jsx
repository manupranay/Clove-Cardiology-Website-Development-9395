import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useApp } from '../context/AppContext'
import SafeIcon from '../common/SafeIcon'
import * as FiIcons from 'react-icons/fi'

const { FiCalendar, FiMail, FiPhone, FiAward, FiGraduationCap } = FiIcons

const Doctors = () => {
  const { doctors, loading } = useApp()

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

        {/* Doctors Grid Skeleton */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-xl shadow-lg p-6 animate-pulse">
                <div className="w-32 h-32 bg-secondary-200 rounded-full mx-auto mb-4"></div>
                <div className="h-6 bg-secondary-200 rounded w-3/4 mx-auto mb-2"></div>
                <div className="h-4 bg-secondary-200 rounded w-1/2 mx-auto mb-4"></div>
                <div className="h-16 bg-secondary-200 rounded mb-4"></div>
                <div className="h-10 bg-secondary-200 rounded"></div>
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
              Our Expert <span className="text-primary-600">Cardiologists</span>
            </h1>
            <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
              Meet our team of board-certified cardiologists who bring decades of experience 
              and cutting-edge expertise to provide you with the highest quality cardiovascular care.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Doctors Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {doctors.map((doctor, index) => (
              <motion.div
                key={doctor.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden group"
              >
                <div className="p-8">
                  {/* Doctor Image */}
                  <div className="relative mb-6">
                    <img
                      src={doctor.image}
                      alt={doctor.name}
                      className="w-32 h-32 rounded-full object-cover mx-auto border-4 border-primary-100 group-hover:border-primary-200 transition-colors duration-300"
                    />
                    <div className="absolute inset-0 w-32 h-32 rounded-full mx-auto bg-primary-600 bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
                  </div>

                  {/* Doctor Info */}
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-bold text-secondary-900 mb-2">
                      {doctor.name}
                    </h3>
                    <p className="text-primary-600 font-semibold mb-2">
                      {doctor.specialization}
                    </p>
                    
                    {/* Experience & Education */}
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center justify-center space-x-2 text-sm text-secondary-600">
                        <SafeIcon icon={FiAward} className="w-4 h-4" />
                        <span>{doctor.experience} Experience</span>
                      </div>
                      <div className="flex items-center justify-center space-x-2 text-sm text-secondary-600">
                        <SafeIcon icon={FiGraduationCap} className="w-4 h-4" />
                        <span>{doctor.education}</span>
                      </div>
                    </div>

                    <p className="text-secondary-700 text-sm mb-6">
                      {doctor.intro}
                    </p>
                  </div>

                  {/* Contact Info */}
                  <div className="space-y-3 mb-6 text-sm">
                    <div className="flex items-center justify-center space-x-2 text-secondary-600">
                      <SafeIcon icon={FiPhone} className="w-4 h-4" />
                      <a href={`tel:${doctor.phone}`} className="hover:text-primary-600 transition-colors">
                        {doctor.phone}
                      </a>
                    </div>
                    <div className="flex items-center justify-center space-x-2 text-secondary-600">
                      <SafeIcon icon={FiMail} className="w-4 h-4" />
                      <a href={`mailto:${doctor.email}`} className="hover:text-primary-600 transition-colors truncate">
                        {doctor.email}
                      </a>
                    </div>
                  </div>

                  {/* Action Button */}
                  <Link
                    to={`/book-consultation?doctor=${doctor.id}`}
                    className="inline-flex items-center justify-center space-x-2 w-full bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors duration-200 font-semibold"
                  >
                    <SafeIcon icon={FiCalendar} className="w-4 h-4" />
                    <span>Book Consultation</span>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Empty State */}
          {doctors.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center py-16"
            >
              <div className="bg-white rounded-xl shadow-lg p-12 max-w-md mx-auto">
                <div className="text-6xl mb-4">👨‍⚕️</div>
                <h3 className="text-xl font-semibold text-secondary-900 mb-2">
                  No Doctors Available
                </h3>
                <p className="text-secondary-600">
                  Doctor profiles will appear here once they are added to the system.
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  )
}

export default Doctors