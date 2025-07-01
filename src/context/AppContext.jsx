import React, { createContext, useContext, useState, useEffect } from 'react'
import { supabase } from '../config/supabase'

const AppContext = createContext()

export const useApp = () => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useApp must be used within an AppProvider')
  }
  return context
}

export const AppProvider = ({ children }) => {
  const [doctors, setDoctors] = useState([])
  const [services, setServices] = useState([])
  const [siteSettings, setSiteSettings] = useState({
    primaryColor: '#0ea5e9',
    secondaryColor: '#64748b',
    accentColor: '#ef4444',
    fontFamily: 'Inter'
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      setLoading(true)
      
      // Fetch doctors
      const { data: doctorsData, error: doctorsError } = await supabase
        .from('doctors')
        .select('*')
        .order('created_at', { ascending: true })

      if (doctorsError) {
        console.error('Error fetching doctors:', doctorsError)
        // Use fallback data
        setDoctors(getFallbackDoctors())
      } else {
        setDoctors(doctorsData || getFallbackDoctors())
      }

      // Fetch services
      const { data: servicesData, error: servicesError } = await supabase
        .from('services')
        .select('*')
        .order('created_at', { ascending: true })

      if (servicesError) {
        console.error('Error fetching services:', servicesError)
        // Use fallback data
        setServices(getFallbackServices())
      } else {
        setServices(servicesData || getFallbackServices())
      }

      // Fetch site settings
      const { data: settingsData, error: settingsError } = await supabase
        .from('site_settings')
        .select('*')
        .single()

      if (!settingsError && settingsData) {
        setSiteSettings(settingsData)
      }

    } catch (error) {
      console.error('Error fetching data:', error)
      // Use fallback data
      setDoctors(getFallbackDoctors())
      setServices(getFallbackServices())
    } finally {
      setLoading(false)
    }
  }

  const getFallbackDoctors = () => [
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      specialization: 'Interventional Cardiologist',
      experience: '15 years',
      education: 'MD from Harvard Medical School',
      intro: 'Specialized in complex cardiac procedures and minimally invasive treatments.',
      image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face',
      phone: '+1 (555) 123-4567',
      email: 'dr.johnson@clovecardiology.com'
    },
    {
      id: 2,
      name: 'Dr. Michael Chen',
      specialization: 'Cardiac Electrophysiologist',
      experience: '12 years',
      education: 'MD from Johns Hopkins University',
      intro: 'Expert in heart rhythm disorders and advanced pacemaker technologies.',
      image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=face',
      phone: '+1 (555) 123-4568',
      email: 'dr.chen@clovecardiology.com'
    },
    {
      id: 3,
      name: 'Dr. Emily Rodriguez',
      specialization: 'Preventive Cardiologist',
      experience: '10 years',
      education: 'MD from Stanford University',
      intro: 'Focused on cardiovascular disease prevention and lifestyle medicine.',
      image: 'https://images.unsplash.com/photo-1594824475480-87be7b4c2ba8?w=400&h=400&fit=crop&crop=face',
      phone: '+1 (555) 123-4569',
      email: 'dr.rodriguez@clovecardiology.com'
    }
  ]

  const getFallbackServices = () => [
    {
      id: 1,
      name: 'Cardiac Catheterization',
      description: 'Minimally invasive diagnostic and therapeutic procedures for heart conditions.',
      details: 'Our cardiac catheterization lab is equipped with state-of-the-art technology for both diagnostic and interventional procedures. We perform coronary angiography, angioplasty, stent placement, and other advanced cardiac interventions with the highest safety standards.',
      features: ['Advanced imaging technology', 'Minimally invasive procedures', 'Same-day discharge for many procedures', 'Experienced interventional team'],
      duration: '1-3 hours',
      preparation: 'Fasting required 6-8 hours before procedure',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=600&h=400&fit=crop'
    },
    {
      id: 2,
      name: 'Echocardiography',
      description: 'Advanced ultrasound imaging to assess heart structure and function.',
      details: 'Our comprehensive echocardiography services include transthoracic, transesophageal, and stress echocardiograms. Using the latest ultrasound technology, we provide detailed assessment of heart valves, chambers, and overall cardiac function.',
      features: ['3D/4D imaging capabilities', 'Stress echo testing', 'Transesophageal echo', 'Real-time analysis'],
      duration: '30-60 minutes',
      preparation: 'No special preparation required for most studies',
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=400&fit=crop'
    },
    {
      id: 3,
      name: 'Electrophysiology Studies',
      description: 'Specialized testing and treatment for heart rhythm disorders.',
      details: 'Our electrophysiology lab offers comprehensive evaluation and treatment of arrhythmias. We perform EP studies, ablation procedures, and device implantations including pacemakers, defibrillators, and cardiac resynchronization therapy devices.',
      features: ['3D mapping systems', 'Radiofrequency ablation', 'Device implantation', 'Remote monitoring'],
      duration: '2-4 hours',
      preparation: 'Fasting and medication adjustments may be required',
      image: 'https://images.unsplash.com/photo-1551076805-e1869033e561?w=600&h=400&fit=crop'
    }
  ]

  const updateSiteSettings = async (newSettings) => {
    try {
      const { error } = await supabase
        .from('site_settings')
        .upsert(newSettings)

      if (!error) {
        setSiteSettings(newSettings)
      }
      return { error }
    } catch (error) {
      return { error }
    }
  }

  const addDoctor = async (doctorData) => {
    try {
      const { data, error } = await supabase
        .from('doctors')
        .insert([doctorData])
        .select()

      if (!error && data) {
        setDoctors(prev => [...prev, ...data])
      }
      return { data, error }
    } catch (error) {
      return { error }
    }
  }

  const updateDoctor = async (id, doctorData) => {
    try {
      const { data, error } = await supabase
        .from('doctors')
        .update(doctorData)
        .eq('id', id)
        .select()

      if (!error && data) {
        setDoctors(prev => prev.map(doc => doc.id === id ? data[0] : doc))
      }
      return { data, error }
    } catch (error) {
      return { error }
    }
  }

  const deleteDoctor = async (id) => {
    try {
      const { error } = await supabase
        .from('doctors')
        .delete()
        .eq('id', id)

      if (!error) {
        setDoctors(prev => prev.filter(doc => doc.id !== id))
      }
      return { error }
    } catch (error) {
      return { error }
    }
  }

  const addService = async (serviceData) => {
    try {
      const { data, error } = await supabase
        .from('services')
        .insert([serviceData])
        .select()

      if (!error && data) {
        setServices(prev => [...prev, ...data])
      }
      return { data, error }
    } catch (error) {
      return { error }
    }
  }

  const updateService = async (id, serviceData) => {
    try {
      const { data, error } = await supabase
        .from('services')
        .update(serviceData)
        .eq('id', id)
        .select()

      if (!error && data) {
        setServices(prev => prev.map(service => service.id === id ? data[0] : service))
      }
      return { data, error }
    } catch (error) {
      return { error }
    }
  }

  const deleteService = async (id) => {
    try {
      const { error } = await supabase
        .from('services')
        .delete()
        .eq('id', id)

      if (!error) {
        setServices(prev => prev.filter(service => service.id !== id))
      }
      return { error }
    } catch (error) {
      return { error }
    }
  }

  const value = {
    doctors,
    services,
    siteSettings,
    loading,
    updateSiteSettings,
    addDoctor,
    updateDoctor,
    deleteDoctor,
    addService,
    updateService,
    deleteService,
    fetchData
  }

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  )
}