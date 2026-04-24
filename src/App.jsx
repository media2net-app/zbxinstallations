import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { useState } from 'react'
import AboutPage from './AboutPage'
import ContactPage from './ContactPage'
import Footer from './Footer'
import HomePage from './HomePage'
import Navbar from './Navbar'
import ServicesPage from './ServicesPage'
import { translations } from './translations'
import './App.css'

function App() {
  const [language, setLanguage] = useState('ro')
  const t = translations[language]

  return (
    <BrowserRouter>
      <div className="page">
        <Navbar t={t} language={language} setLanguage={setLanguage} />
        <Routes>
          <Route path="/" element={<HomePage t={t} />} />
          <Route path="/servicii" element={<ServicesPage t={t} />} />
          <Route path="/despre-noi" element={<AboutPage t={t} />} />
          <Route path="/contact" element={<ContactPage t={t} />} />
          <Route path="/services" element={<Navigate to="/servicii" replace />} />
          <Route path="/about-us" element={<Navigate to="/despre-noi" replace />} />
          <Route path="/diensten" element={<Navigate to="/servicii" replace />} />
          <Route path="/over-ons" element={<Navigate to="/despre-noi" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Footer t={t} />
      </div>
    </BrowserRouter>
  )
}

export default App
