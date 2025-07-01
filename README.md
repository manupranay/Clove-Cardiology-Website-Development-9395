# Clove Cardiology Website

A comprehensive cardiology center website built with React, Vite, Tailwind CSS, and Supabase.

## Features

- **Modern Design**: Professional, responsive design with smooth animations
- **Doctor Profiles**: Comprehensive doctor information with booking capabilities
- **Service Management**: Detailed service pages with full descriptions
- **Admin Panel**: Complete backend management for doctors, services, and site settings
- **Booking System**: Patient consultation booking with form validation
- **Supabase Integration**: Real-time backend with PostgreSQL database
- **Responsive**: Mobile-first design that works on all devices

## Tech Stack

- **Frontend**: React 18, Vite, Tailwind CSS
- **Backend**: Supabase (PostgreSQL, Auth, Storage)
- **Animations**: Framer Motion
- **Icons**: React Icons (Feather Icons)
- **Routing**: React Router DOM

## Getting Started

### Prerequisites

- Node.js 16+ and npm
- Supabase account (free tier available)

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up Supabase:
   - Create a new Supabase project
   - Copy the project URL and anon key
   - Create a `.env` file based on `.env.example`
   - Add your Supabase credentials

4. Set up the database tables:

```sql
-- Doctors table
CREATE TABLE doctors (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  specialization VARCHAR(255) NOT NULL,
  experience VARCHAR(100) NOT NULL,
  education TEXT NOT NULL,
  intro TEXT NOT NULL,
  image TEXT NOT NULL,
  phone VARCHAR(50) NOT NULL,
  email VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Services table
CREATE TABLE services (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  details TEXT NOT NULL,
  features TEXT[] DEFAULT '{}',
  duration VARCHAR(100) NOT NULL,
  preparation TEXT NOT NULL,
  image TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Site settings table
CREATE TABLE site_settings (
  id SERIAL PRIMARY KEY,
  primary_color VARCHAR(20) DEFAULT '#0ea5e9',
  secondary_color VARCHAR(20) DEFAULT '#64748b',
  accent_color VARCHAR(20) DEFAULT '#ef4444',
  font_family VARCHAR(100) DEFAULT 'Inter',
  updated_at TIMESTAMP DEFAULT NOW()
);
```

5. Start the development server:
   ```bash
   npm run dev
   ```

## Project Structure

```
src/
├── components/          # Reusable components
│   ├── Layout/         # Header, Footer, Layout
│   └── Home/           # Home page sections
├── pages/              # Page components
├── context/            # React Context for state management
├── config/             # Configuration files
└── common/             # Common utilities and components
```

## Key Features

### Doctor Management
- Add, edit, and delete doctor profiles
- Complete doctor information including specialization, experience, and contact details
- Professional photo management

### Service Management
- Comprehensive service descriptions
- Feature lists and preparation requirements
- Service duration and team information
- High-quality service images

### Admin Dashboard
- Intuitive interface for content management
- Real-time updates with Supabase
- Color and font customization
- Bulk operations support

### Booking System
- Patient-friendly booking form
- Doctor and service selection
- Date and time preferences
- Additional information capture

## Customization

### Colors and Fonts
Use the admin panel to customize:
- Primary color scheme
- Secondary colors
- Accent colors
- Font families

### Content Management
All content is managed through the admin interface:
- Doctor profiles and credentials
- Service descriptions and features
- Site-wide settings and branding

## Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Vercel/Netlify
The site is optimized for static hosting platforms. Simply connect your repository and deploy.

### Environment Variables
Make sure to set your environment variables in your hosting platform:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

## Support

For support and questions, please refer to the documentation or create an issue in the repository.

## License

This project is licensed under the MIT License.