import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { QuestLogin } from '@questlabs/react-sdk';
import { useAuth } from '../context/AuthContext';
import questConfig from '../config/questConfig';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiHeart, FiShield, FiUsers, FiAward } = FiIcons;

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  
  const from = location.state?.from?.pathname || '/dashboard';

  const handleLogin = ({ userId, token, newUser }) => {
    login({ userId, token });
    
    if (newUser) {
      navigate('/onboarding');
    } else {
      navigate(from);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-white flex">
      {/* Left Section - Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-600 to-primary-800"></div>
        <div className="absolute inset-0 bg-black bg-opacity-10"></div>
        
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-32 h-32 border border-white rounded-full"></div>
          <div className="absolute top-40 right-32 w-24 h-24 border border-white rounded-full"></div>
          <div className="absolute bottom-32 left-32 w-40 h-40 border border-white rounded-full"></div>
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
              Welcome Back to Your
              <span className="block text-primary-200">Heart Health Journey</span>
            </h1>

            <p className="text-xl text-primary-100 mb-12 leading-relaxed">
              Access your personalized dashboard, track your cardiovascular health, 
              and connect with our expert cardiologists.
            </p>

            {/* Features */}
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="bg-white bg-opacity-20 p-2 rounded-lg">
                  <SafeIcon icon={FiShield} className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold">Secure & Private</h3>
                  <p className="text-primary-100 text-sm">Your health data is protected with enterprise-grade security</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="bg-white bg-opacity-20 p-2 rounded-lg">
                  <SafeIcon icon={FiUsers} className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold">Expert Care Team</h3>
                  <p className="text-primary-100 text-sm">Connect directly with board-certified cardiologists</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="bg-white bg-opacity-20 p-2 rounded-lg">
                  <SafeIcon icon={FiAward} className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold">Personalized Care</h3>
                  <p className="text-primary-100 text-sm">Tailored treatment plans based on your unique needs</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Right Section - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full max-w-md"
        >
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center justify-center space-x-3 mb-8">
            <div className="bg-primary-600 p-2 rounded-lg">
              <SafeIcon icon={FiHeart} className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-secondary-900">Clove Cardiology</h2>
              <p className="text-sm text-secondary-600">Excellence in Heart Care</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 border border-secondary-100">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-secondary-900 mb-2">
                Welcome Back
              </h3>
              <p className="text-secondary-600">
                Sign in to access your health dashboard
              </p>
            </div>

            {/* Quest Login Component */}
            <div className="quest-login-container">
              <QuestLogin
                onSubmit={handleLogin}
                email={true}
                google={false}
                accent={questConfig.PRIMARY_COLOR}
              />
            </div>

            {/* Additional Info */}
            <div className="mt-8 text-center">
              <p className="text-sm text-secondary-500">
                By signing in, you agree to our{' '}
                <a href="/terms" className="text-primary-600 hover:text-primary-700 font-medium">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="/privacy" className="text-primary-600 hover:text-primary-700 font-medium">
                  Privacy Policy
                </a>
              </p>
            </div>
          </div>

          {/* Help Section */}
          <div className="mt-6 text-center">
            <p className="text-sm text-secondary-600">
              Need help?{' '}
              <a href="/contact" className="text-primary-600 hover:text-primary-700 font-medium">
                Contact Support
              </a>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;