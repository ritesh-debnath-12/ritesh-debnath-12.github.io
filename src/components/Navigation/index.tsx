import { useState, useEffect } from 'react'
import { HiOutlineLightBulb, HiLightBulb } from 'react-icons/hi'
import './Navigation.css'

interface NavigationProps {
  isDarkMode: boolean
  toggleTheme: () => void
}

/**
 * ### Navigation Component
 * This is the Navigation Section... it shows current sections and navigation links.
 * @returns React.FC => \<Navigation \/\>
 * @author Neko
 * @license GPLv3.0
 */
const Navigation: React.FC<NavigationProps> = ({ isDarkMode, toggleTheme }) => {
  const [activeSection, setActiveSection] = useState('home')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  // Close mobile menu after navigation
  setIsMobileMenuOpen(false)
  }

  // Handle scroll to detect active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'projects', 'hobbies', 'contact']
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const offsetTop = element.offsetTop
          const offsetHeight = element.offsetHeight

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

  window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = ['home', 'about', 'skills', 'projects', 'hobbies', 'contact']
  const onToggleTheme = () => { toggleTheme(); setIsMobileMenuOpen(false) }

  return (
    <nav className="navigation">
      <div className="nav-container">
        <div className="nav-left">
          <span className="portfolio-name">Neko</span>
        </div>
        
        <div className="nav-center">
          {navItems.map((item) => (
            <button
              key={item}
              className={`nav-item ${activeSection === item ? 'active' : ''}`}
              onClick={() => scrollToSection(item)}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="nav-right">
          <button
            className="mobile-menu-button"
            aria-label="Menu"
            aria-controls="mobile-menu"
            aria-expanded={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen(v => !v)}
          >
            {/* Simple hamburger icon */}
            <span className="hamburger" />
          </button>
          <button className="theme-toggle" onClick={toggleTheme}>
            {isDarkMode ? <HiLightBulb /> : <HiOutlineLightBulb />}
            <span>{isDarkMode ? 'Dark' : 'Light'}</span>
          </button>
        </div>

        {/* Mobile dropdown menu */}
        <div
          id="mobile-menu"
          className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}
          role="menu"
          aria-hidden={!isMobileMenuOpen}
        >
          {navItems.map((item) => (
            <button
              key={item}
              className={`mobile-menu-item ${activeSection === item ? 'active' : ''}`}
              onClick={() => scrollToSection(item)}
              role="menuitem"
            >
              {item}
            </button>
          ))}
          <div className="mobile-menu-divider" role="separator" />
          <button
            className="mobile-menu-item mobile-theme-toggle"
            onClick={onToggleTheme}
            role="menuitem"
          >
            {isDarkMode ? <HiLightBulb /> : <HiOutlineLightBulb />}
            <span>{isDarkMode ? 'Dark' : 'Light'}</span>
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navigation
