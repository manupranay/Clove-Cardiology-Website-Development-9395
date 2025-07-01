import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { OnBoarding } from '@questlabs/react-sdk';
import { useAuth } from '../context/AuthContext';
import questConfig from '../config/questConfig';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiHeart, FiCheckCircle, FiUser, FiActivity } = FiIcons;

const OnboardingPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    // Redirect if not authenticated
    if (!user) {
      navigate('/login');
      return;
    }
  }, [user, navigate]);

  const getAnswers = () => {
    // Navigate to dashboard after onboarding completion
    navigate('/dashboard');
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-secondary-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-secondary-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-white flex">
      {/* Left Section - Visual/Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-600 to-primary-800"></div>
        <div className="absolute inset-0 bg-black bg-opacity-10"></div>
        
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-32 left-24 w-24 h-24 border-2 border-white rounded-full animate-pulse"></div>
          <div className="absolute top-48 right-32 w-32 h-32 border border-white rounded-full animate-pulse delay-1000"></div>
          <div className="absolute bottom-40 left-40 w-20 h-20 border-2 border-white rounded-full animate-pulse delay-500"></div>
        </div>

        <div className="relative z-10 flex flex-col justify-center px-12 text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Logo */}
            <div className="flex items-center space-x-3 mb-8">
              <div className="bg-white bg-opacity-20 p-3 rounded-xl backdrop-blur-sm">
                <SafeIcon icon={FiHeart} className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Clove Cardiology</h2>
                <p className="text-primary-100">Excellence in Heart Care</p>
              </div>
            </div>

            <h1 className="text-4xl font-bold mb-6 leading-tight">
              Let's Get Started with Your
              <span className="block text-primary-200">Personalized Care</span>
            </h1>

            <p className="text-xl text-primary-100 mb-12 leading-relaxed">
              Help us understand your health needs better so we can provide 
              you with the most personalized cardiovascular care experience.
            </p>

            {/* Progress Indicators */}
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="bg-white bg-opacity-20 p-2 rounded-lg">
                  <SafeIcon icon={FiUser} className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold">Personal Profile</h3>
                  <p className="text-primary-100 text-sm">Tell us about yourself and your health goals</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="bg-white bg-opacity-20 p-2 rounded-lg">
                  <SafeIcon icon={FiActivity} className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold">Health Assessment</h3>
                  <p className="text-primary-100 text-sm">Quick questions about your cardiovascular health</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="bg-white bg-opacity-20 p-2 rounded-lg">
                  <SafeIcon icon={FiCheckCircle} className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold">Care Preferences</h3>
                  <p className="text-primary-100 text-sm">Set up your communication and appointment preferences</p>
                </div>
              </div>
            </div>

            <div className="mt-12 p-6 bg-white bg-opacity-10 rounded-xl backdrop-blur-sm">
              <h4 className="font-semibold mb-2">Why This Matters</h4>
              <p className="text-primary-100 text-sm">
                This information helps our cardiologists provide you with personalized 
                recommendations and ensures you receive the most appropriate care for your unique situation.
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Right Section - Onboarding Component */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full max-w-md"
        >
          {/* Mobile Header */}
          <div className="lg:hidden text-center mb-8">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="bg-primary-600 p-2 rounded-lg">
                <SafeIcon icon={FiHeart} className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-secondary-900">Clove Cardiology</h2>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-secondary-900 mb-2">
              Let's Get Started!
            </h3>
            <p className="text-secondary-600">
              We're setting up your personalized care experience.
            </p>
          </div>

          {/* Quest Onboarding Component */}
          <div className="bg-white rounded-2xl shadow-xl border border-secondary-100 overflow-hidden">
            <div className="quest-onboarding-container" style={{ minHeight: '400px' }}>
              <OnBoarding
                userId={user.userId}
                token={user.token}
                questId={questConfig.QUEST_ONBOARDING_QUESTID}
                answer={answers}
                setAnswer={setAnswers}
                getAnswers={getAnswers}
                accent={questConfig.PRIMARY_COLOR}
                singleChoose="modal1"
                multiChoice="modal2"
              >
                <OnBoarding.Header />
                <OnBoarding.Content />
                <OnBoarding.Footer />
              </OnBoarding>
            </div>
          </div>

          {/* Help Section */}
          <div className="mt-6 text-center">
            <p className="text-sm text-secondary-600">
              Need assistance?{' '}
              <a href="/contact" className="text-primary-600 hover:text-primary-700 font-medium">
                Contact our support team
              </a>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default OnboardingPage;