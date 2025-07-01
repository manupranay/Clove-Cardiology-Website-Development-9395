import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useApp } from '../context/AppContext'
import SafeIcon from '../common/SafeIcon'
import * as FiIcons from 'react-icons/fi'

const { FiPlus, FiEdit2, FiTrash2, FiSave, FiX, FiSettings, FiUsers, FiActivity } = FiIcons

const Admin = () => {
  const { 
    doctors, 
    services, 
    siteSettings, 
    addDoctor, 
    updateDoctor, 
    deleteDoctor,
    addService,
    updateService,
    deleteService,
    updateSiteSettings
  } = useApp()

  const [activeTab, setActiveTab] = useState('doctors')
  const [editingDoctor, setEditingDoctor] = useState(null)
  const [editingService, setEditingService] = useState(null)
  const [showAddForm, setShowAddForm] = useState(false)

  const tabs = [
    { id: 'doctors', name: 'Doctors', icon: FiUsers },
    { id: 'services', name: 'Services', icon: FiActivity },
    { id: 'settings', name: 'Settings', icon: FiSettings }
  ]

  const handleAddDoctor = async (formData) => {
    const doctorData = {
      ...formData,
      created_at: new Date().toISOString()
    }
    await addDoctor(doctorData)
    setShowAddForm(false)
  }

  const handleUpdateDoctor = async (id, formData) => {
    await updateDoctor(id, formData)
    setEditingDoctor(null)
  }

  const handleDeleteDoctor = async (id) => {
    if (window.confirm('Are you sure you want to delete this doctor?')) {
      await deleteDoctor(id)
    }
  }

  const handleAddService = async (formData) => {
    const serviceData = {
      ...formData,
      features: formData.features.split(',').map(f => f.trim()),
      created_at: new Date().toISOString()
    }
    await addService(serviceData)
    setShowAddForm(false)
  }

  const handleUpdateService = async (id, formData) => {
    const serviceData = {
      ...formData,
      features: Array.isArray(formData.features) 
        ? formData.features 
        : formData.features.split(',').map(f => f.trim())
    }
    await updateService(id, serviceData)
    setEditingService(null)
  }

  const handleDeleteService = async (id) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      await deleteService(id)
    }
  }

  return (
    <div className="min-h-screen bg-secondary-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-secondary-900">
            Admin Dashboard
          </h1>
          <p className="text-secondary-600 mt-2">
            Manage doctors, services, and site settings
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="mb-8">
          <div className="border-b border-secondary-200">
            <nav className="-mb-px flex space-x-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-secondary-500 hover:text-secondary-700 hover:border-secondary-300'
                  }`}
                >
                  <SafeIcon icon={tab.icon} className="w-4 h-4" />
                  <span>{tab.name}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Doctors Tab */}
        {activeTab === 'doctors' && (
          <DoctorsTab
            doctors={doctors}
            editingDoctor={editingDoctor}
            setEditingDoctor={setEditingDoctor}
            showAddForm={showAddForm}
            setShowAddForm={setShowAddForm}
            onAddDoctor={handleAddDoctor}
            onUpdateDoctor={handleUpdateDoctor}
            onDeleteDoctor={handleDeleteDoctor}
          />
        )}

        {/* Services Tab */}
        {activeTab === 'services' && (
          <ServicesTab
            services={services}
            editingService={editingService}
            setEditingService={setEditingService}
            showAddForm={showAddForm}
            setShowAddForm={setShowAddForm}
            onAddService={handleAddService}
            onUpdateService={handleUpdateService}
            onDeleteService={handleDeleteService}
          />
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <SettingsTab
            siteSettings={siteSettings}
            onUpdateSettings={updateSiteSettings}
          />
        )}
      </div>
    </div>
  )
}

// Doctors Tab Component
const DoctorsTab = ({ 
  doctors, 
  editingDoctor, 
  setEditingDoctor, 
  showAddForm, 
  setShowAddForm,
  onAddDoctor,
  onUpdateDoctor,
  onDeleteDoctor
}) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-secondary-900">Manage Doctors</h2>
        <button
          onClick={() => setShowAddForm(true)}
          className="inline-flex items-center space-x-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
        >
          <SafeIcon icon={FiPlus} className="w-4 h-4" />
          <span>Add Doctor</span>
        </button>
      </div>

      {showAddForm && (
        <DoctorForm
          onSubmit={onAddDoctor}
          onCancel={() => setShowAddForm(false)}
          title="Add New Doctor"
        />
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {doctors.map((doctor) => (
          <motion.div
            key={doctor.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-md p-6"
          >
            {editingDoctor === doctor.id ? (
              <DoctorForm
                doctor={doctor}
                onSubmit={(data) => onUpdateDoctor(doctor.id, data)}
                onCancel={() => setEditingDoctor(null)}
                title="Edit Doctor"
              />
            ) : (
              <>
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-20 h-20 rounded-full object-cover mx-auto mb-4"
                />
                <h3 className="text-lg font-semibold text-center mb-2">{doctor.name}</h3>
                <p className="text-primary-600 text-center mb-2">{doctor.specialization}</p>
                <p className="text-sm text-secondary-600 text-center mb-4">{doctor.experience}</p>
                <div className="flex justify-center space-x-2">
                  <button
                    onClick={() => setEditingDoctor(doctor.id)}
                    className="p-2 text-primary-600 hover:bg-primary-50 rounded"
                  >
                    <SafeIcon icon={FiEdit2} className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onDeleteDoctor(doctor.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded"
                  >
                    <SafeIcon icon={FiTrash2} className="w-4 h-4" />
                  </button>
                </div>
              </>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  )
}

// Services Tab Component
const ServicesTab = ({ 
  services, 
  editingService, 
  setEditingService, 
  showAddForm, 
  setShowAddForm,
  onAddService,
  onUpdateService,
  onDeleteService
}) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-secondary-900">Manage Services</h2>
        <button
          onClick={() => setShowAddForm(true)}
          className="inline-flex items-center space-x-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
        >
          <SafeIcon icon={FiPlus} className="w-4 h-4" />
          <span>Add Service</span>
        </button>
      </div>

      {showAddForm && (
        <ServiceForm
          onSubmit={onAddService}
          onCancel={() => setShowAddForm(false)}
          title="Add New Service"
        />
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.map((service) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            {editingService === service.id ? (
              <div className="p-6">
                <ServiceForm
                  service={service}
                  onSubmit={(data) => onUpdateService(service.id, data)}
                  onCancel={() => setEditingService(null)}
                  title="Edit Service"
                />
              </div>
            ) : (
              <>
                <img
                  src={service.image}
                  alt={service.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-lg font-semibold mb-2">{service.name}</h3>
                  <p className="text-secondary-600 text-sm mb-4">{service.description}</p>
                  <div className="flex justify-end space-x-2">
                    <button
                      onClick={() => setEditingService(service.id)}
                      className="p-2 text-primary-600 hover:bg-primary-50 rounded"
                    >
                      <SafeIcon icon={FiEdit2} className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDeleteService(service.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded"
                    >
                      <SafeIcon icon={FiTrash2} className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  )
}

// Settings Tab Component
const SettingsTab = ({ siteSettings, onUpdateSettings }) => {
  const [settings, setSettings] = useState(siteSettings)
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = async () => {
    setIsSaving(true)
    await onUpdateSettings(settings)
    setIsSaving(false)
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-secondary-900">Site Settings</h2>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="inline-flex items-center space-x-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 disabled:bg-primary-400 transition-colors"
        >
          <SafeIcon icon={FiSave} className="w-4 h-4" />
          <span>{isSaving ? 'Saving...' : 'Save Settings'}</span>
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-2">
              Primary Color
            </label>
            <input
              type="color"
              value={settings.primaryColor}
              onChange={(e) => setSettings(prev => ({ ...prev, primaryColor: e.target.value }))}
              className="w-full h-10 border border-secondary-300 rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-2">
              Secondary Color
            </label>
            <input
              type="color"
              value={settings.secondaryColor}
              onChange={(e) => setSettings(prev => ({ ...prev, secondaryColor: e.target.value }))}
              className="w-full h-10 border border-secondary-300 rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-2">
              Accent Color
            </label>
            <input
              type="color"
              value={settings.accentColor}
              onChange={(e) => setSettings(prev => ({ ...prev, accentColor: e.target.value }))}
              className="w-full h-10 border border-secondary-300 rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-2">
              Font Family
            </label>
            <select
              value={settings.fontFamily}
              onChange={(e) => setSettings(prev => ({ ...prev, fontFamily: e.target.value }))}
              className="w-full px-3 py-2 border border-secondary-300 rounded-lg"
            >
              <option value="Inter">Inter</option>
              <option value="Roboto">Roboto</option>
              <option value="Open Sans">Open Sans</option>
              <option value="Lato">Lato</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  )
}

// Doctor Form Component
const DoctorForm = ({ doctor, onSubmit, onCancel, title }) => {
  const [formData, setFormData] = useState({
    name: doctor?.name || '',
    specialization: doctor?.specialization || '',
    experience: doctor?.experience || '',
    education: doctor?.education || '',
    intro: doctor?.intro || '',
    image: doctor?.image || '',
    phone: doctor?.phone || '',
    email: doctor?.email || ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Doctor Name"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            className="px-3 py-2 border border-secondary-300 rounded-lg"
            required
          />
          <input
            type="text"
            placeholder="Specialization"
            value={formData.specialization}
            onChange={(e) => setFormData(prev => ({ ...prev, specialization: e.target.value }))}
            className="px-3 py-2 border border-secondary-300 rounded-lg"
            required
          />
          <input
            type="text"
            placeholder="Experience (e.g., 15 years)"
            value={formData.experience}
            onChange={(e) => setFormData(prev => ({ ...prev, experience: e.target.value }))}
            className="px-3 py-2 border border-secondary-300 rounded-lg"
            required
          />
          <input
            type="text"
            placeholder="Education"
            value={formData.education}
            onChange={(e) => setFormData(prev => ({ ...prev, education: e.target.value }))}
            className="px-3 py-2 border border-secondary-300 rounded-lg"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
            className="px-3 py-2 border border-secondary-300 rounded-lg"
            required
          />
          <input
            type="tel"
            placeholder="Phone"
            value={formData.phone}
            onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
            className="px-3 py-2 border border-secondary-300 rounded-lg"
            required
          />
        </div>
        <input
          type="url"
          placeholder="Image URL"
          value={formData.image}
          onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
          className="w-full px-3 py-2 border border-secondary-300 rounded-lg"
          required
        />
        <textarea
          placeholder="Short Introduction"
          value={formData.intro}
          onChange={(e) => setFormData(prev => ({ ...prev, intro: e.target.value }))}
          className="w-full px-3 py-2 border border-secondary-300 rounded-lg h-20 resize-none"
          required
        />
        <div className="flex space-x-2">
          <button
            type="submit"
            className="flex items-center space-x-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700"
          >
            <SafeIcon icon={FiSave} className="w-4 h-4" />
            <span>Save</span>
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="flex items-center space-x-2 bg-secondary-500 text-white px-4 py-2 rounded-lg hover:bg-secondary-600"
          >
            <SafeIcon icon={FiX} className="w-4 h-4" />
            <span>Cancel</span>
          </button>
        </div>
      </form>
    </div>
  )
}

// Service Form Component
const ServiceForm = ({ service, onSubmit, onCancel, title }) => {
  const [formData, setFormData] = useState({
    name: service?.name || '',
    description: service?.description || '',
    details: service?.details || '',
    features: Array.isArray(service?.features) ? service.features.join(', ') : service?.features || '',
    duration: service?.duration || '',
    preparation: service?.preparation || '',
    image: service?.image || ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Service Name"
          value={formData.name}
          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
          className="w-full px-3 py-2 border border-secondary-300 rounded-lg"
          required
        />
        <textarea
          placeholder="Short Description"
          value={formData.description}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          className="w-full px-3 py-2 border border-secondary-300 rounded-lg h-20 resize-none"
          required
        />
        <textarea
          placeholder="Detailed Description"
          value={formData.details}
          onChange={(e) => setFormData(prev => ({ ...prev, details: e.target.value }))}
          className="w-full px-3 py-2 border border-secondary-300 rounded-lg h-32 resize-none"
          required
        />
        <input
          type="text"
          placeholder="Features (comma-separated)"
          value={formData.features}
          onChange={(e) => setFormData(prev => ({ ...prev, features: e.target.value }))}
          className="w-full px-3 py-2 border border-secondary-300 rounded-lg"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Duration (e.g., 1-3 hours)"
            value={formData.duration}
            onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))}
            className="px-3 py-2 border border-secondary-300 rounded-lg"
            required
          />
          <input
            type="text"
            placeholder="Preparation Required"
            value={formData.preparation}
            onChange={(e) => setFormData(prev => ({ ...prev, preparation: e.target.value }))}
            className="px-3 py-2 border border-secondary-300 rounded-lg"
            required
          />
        </div>
        <input
          type="url"
          placeholder="Image URL"
          value={formData.image}
          onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
          className="w-full px-3 py-2 border border-secondary-300 rounded-lg"
          required
        />
        <div className="flex space-x-2">
          <button
            type="submit"
            className="flex items-center space-x-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700"
          >
            <SafeIcon icon={FiSave} className="w-4 h-4" />
            <span>Save</span>
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="flex items-center space-x-2 bg-secondary-500 text-white px-4 py-2 rounded-lg hover:bg-secondary-600"
          >
            <SafeIcon icon={FiX} className="w-4 h-4" />
            <span>Cancel</span>
          </button>
        </div>
      </form>
    </div>
  )
}

export default Admin