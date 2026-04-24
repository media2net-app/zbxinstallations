import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'

function Navbar({ t, language, setLanguage }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setIsMenuOpen(false)
  }, [location.pathname])

  const closeMobileMenu = () => setIsMenuOpen(false)

  return (
    <div className="header-wrap">
      <div className="utility-topbar">
        <div className="utility-inner">
          <div className="lang-switch" role="group" aria-label="Language switcher">
            <button
              type="button"
              className={language === 'ro' ? 'lang-btn active' : 'lang-btn'}
              onClick={() => setLanguage('ro')}
            >
              RO
            </button>
            <button
              type="button"
              className={language === 'en' ? 'lang-btn active' : 'lang-btn'}
              onClick={() => setLanguage('en')}
            >
              EN
            </button>
          </div>
          <Link className="button button-ghost" to="/contact" onClick={closeMobileMenu}>
            {t.nav.cta}
          </Link>
        </div>
      </div>

      <header className={isMenuOpen ? 'topbar menu-open' : 'topbar'}>
        <div className="topbar-inner">
          <Link className="brand brand-link" to="/">
            <span className="brand-mark">ZBX</span>
            <div>
              <p className="brand-name">ZBX Installations</p>
              <p className="brand-subtitle">{t.nav.subtitle}</p>
            </div>
          </Link>

          <button
            type="button"
            className="menu-toggle"
            aria-expanded={isMenuOpen}
            aria-label="Toggle menu"
            onClick={() => setIsMenuOpen((value) => !value)}
          >
            {isMenuOpen ? 'Close' : 'Menu'}
          </button>

          <nav className={isMenuOpen ? 'topbar-nav open' : 'topbar-nav'}>
            <NavLink to="/" end onClick={closeMobileMenu}>
              {t.nav.home}
            </NavLink>
            <NavLink to="/servicii" onClick={closeMobileMenu}>
              {t.nav.services}
            </NavLink>
            <NavLink to="/despre-noi" onClick={closeMobileMenu}>
              {t.nav.about}
            </NavLink>
            <NavLink to="/contact" onClick={closeMobileMenu}>
              {t.nav.contact}
            </NavLink>
          </nav>

          <a className="header-phone" href="tel:+40741064138" onClick={closeMobileMenu}>
            {t.nav.phoneLabel} +40 741 064 138
          </a>
        </div>
      </header>
    </div>
  )
}

export default Navbar
