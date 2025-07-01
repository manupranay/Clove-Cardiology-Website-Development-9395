import React from 'react'
import Hero from '../components/Home/Hero'
import ServicesSection from '../components/Home/ServicesSection'
import DoctorsSection from '../components/Home/DoctorsSection'

const Home = () => {
  return (
    <div>
      <Hero />
      <ServicesSection />
      <DoctorsSection />
    </div>
  )
}

export default Home