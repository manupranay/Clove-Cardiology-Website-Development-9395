import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useApp } from '../../context/AppContext'
import SafeIcon from '../../common/SafeIcon'
import * as FiIcons from 'react-icons/fi'

const { FiCalendar, FiMail, FiPhone, FiArrowRight } = FiIcons

const DoctorsSection = () => {
  const { doctors, loading } = useApp()

  if (loading) {
    return (
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="h-8 bg-secondary-200 rounded w-64 mx-auto mb-4 animate-pulse"></div>
            <div className="h-4 bg-secondary-200 rounded w-96 mx-auto animate-pulse"></div>
          </div>
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
      </section>
    )
  }

  return (
    <section className="py-20 bg-white">
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
            Meet Our Expert Cardiologists
          </h2>
          <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
            Our team of board-certified cardiologists brings decades of experience 
            and expertise to provide you with the highest quality cardiovascular care.
          </p>
        </motion.div>

        {/* Doctors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {doctors.slice(0, 3).map((doctor, index) => (
            <motion.div
              key={doctor.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden group"
            >
              <div className="p-6 text-center">
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
                <h3 className="text-xl font-bold text-secondary-900 mb-2">
                  {doctor.name}
                </h3>
                <p className="text-primary-600 font-semibold mb-2">
                  {doctor.specialization}
                </p>
                <p className="text-secondary-600 mb-4">
                  {doctor.experience} Experience
                </p>
                <p className="text-secondary-700 text-sm mb-6 line-clamp-3">
                  {doctor.intro}
                </p>

                {/* Contact Info */}
                <div className="space-y-2 mb-6 text-sm">
                  <div className="flex items-center justify-center space-x-2 text-secondary-600">
                    <SafeIcon icon={FiPhone} className="w-4 h-4" />
                    <span>{doctor.phone}</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2 text-secondary-600">
                    <SafeIcon icon={FiMail} className="w-4 h-4" />
                    <span className="truncate">{doctor.email}</span>
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

        {/* View All Doctors Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link
            to="/doctors"
            className="inline-flex items-center space-x-2 text-primary-600 hover:text-primary-700 font-semibold text-lg group"
          >
            <span>View All Doctors</span>
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

export default DoctorsSection