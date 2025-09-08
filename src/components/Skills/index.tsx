import { useEffect, useRef, useState, useCallback } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import skillsData from '../../assets/json/skills_data.json'
import symbolLookUpTable from '../../util/SymbolLookUpTable'
import renderIcon from '../../util/SymbolComponentRenderer'
import './Skills.css'


gsap.registerPlugin(ScrollTrigger)

interface Skill {
  icon: string
  title: string
  description: string
  color: string
  colorRgb: string
}

// Icon mapping object - maps string names to React components
const iconMap: { [key: string]: React.ComponentType } = symbolLookUpTable

/**
 * ### Skills Component
 * This is the Skills Section... this section showcases my skills and expertise.
 * This is the second most painful section to implement.
 * Thanks to that godawful carousel...thankfully AIs exists lest I had to go back to math school
 * @returns React.FC => \<Skills \/\>
 * @author Neko
 * @license GPLv3.0
 */
const Skills: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const carouselRef = useRef<HTMLDivElement>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [isScrolling, setIsScrolling] = useState(false)
  
  // Touch/swipe state
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)
  const [isSwiping, setIsSwiping] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      })

      // Initialize all cards to be visible first
      const cards = carouselRef.current?.querySelectorAll('.skill-card')
      if (cards) {
        cards.forEach((card) => {
          gsap.set(card, {
            opacity: 1,
            display: 'flex',
            scale: 1
          })
        })
      }
    }, sectionRef)

    // Initialize carousel after a short delay
    const timer = setTimeout(() => {
      updateCarousel(currentIndex)
    }, 200)

    return () => {
      ctx.revert()
      clearTimeout(timer)
    }
  }, [])

  const skills: Skill[] = skillsData.skills

  const updateCarousel = (index: number) => {
    const cards = carouselRef.current?.querySelectorAll('.skill-card')
    if (!cards) return

    const totalCards = skills.length
    // Responsive radius based on screen size - much smaller for mobile to prevent overflow
    const isMobile = window.innerWidth <= 768
    const isExtraSmall = window.innerWidth <= 480
    
    let radius: number
    if (isExtraSmall) {
      radius = 180 // Very small radius for extra small screens
    } else if (isMobile) {
      radius = 220 // Small radius for mobile to prevent overflow
    } else {
      radius = 450 // Original radius for desktop
    }
    
    const angleStep = (2 * Math.PI) / totalCards // Divide circle into equal parts
    
    cards.forEach((card, i) => {
      const element = card as HTMLElement
      
      // Calculate the current position based on rotation
      const currentAngle = (i - index) * angleStep
      
      // Calculate 3D position for circular arrangement
      const x = Math.sin(currentAngle) * radius
      const z = Math.cos(currentAngle) * radius
      const rotationY = (currentAngle * 180) / Math.PI
      
      // Scale and opacity based on distance from center
      const isActive = i === index
      const absDistance = Math.abs(i - index)
      const normalizedDistance = Math.min(absDistance, totalCards - absDistance) / (totalCards / 2)
      
      const scale = isActive ? 1 : 0.7 + (0.3 * (1 - normalizedDistance))
      const opacity = isActive ? 1 : 0.4 + (0.6 * (1 - normalizedDistance))
      
      // Use gsap.to for smooth animations
      gsap.to(element, {
        x: x,
        z: z,
        rotationY: rotationY,
        scale: scale,
        opacity: opacity,
        zIndex: isActive ? 10 : Math.round(5 * (1 - normalizedDistance)),
        duration: 0.8,
        ease: "power2.out"
      })
      
      // Update active class
      if (isActive) {
        element.classList.add('active')
      } else {
        element.classList.remove('active')
      }
    })
  }

  const goToCard = (index: number) => {
    setCurrentIndex(index)
    updateCarousel(index)
  }

  // Touch/swipe handling
  const minSwipeDistance = 50

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null) // Reset touch end
    setTouchStart(e.targetTouches[0].clientX)
    setIsSwiping(true)
    setIsAutoPlaying(false) // Pause auto-play during swipe
  }

  const onTouchMove = (e: React.TouchEvent) => {
    if (!touchStart) return
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) {
      setIsSwiping(false)
      return
    }
    
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    if (isLeftSwipe) {
      // Swipe left - next card
      setCurrentIndex(prev => (prev + 1) % skills.length)
      // console.log('Left swipe listened successfully')
    } else if (isRightSwipe) {
      // Swipe right - previous card
      setCurrentIndex(prev => (prev - 1 + skills.length) % skills.length)
      // console.log('Right swipe listened successfully')
    }
    
    setIsSwiping(false)
    
    // Resume auto-play after a delay
    setTimeout(() => {
      setIsAutoPlaying(true)
    }, 3000)
  }

  // Mouse scroll navigation
  const handleWheelScroll = useCallback((e: WheelEvent) => {
    // Only handle scroll if we're hovering over the skills section
    if (!sectionRef.current?.contains(e.target as Node)) return
    
    // Prevent default scroll behavior
    e.preventDefault()
    
    // Throttle scroll events to prevent too rapid changes
    if (isScrolling) return
    
    setIsScrolling(true)
    setIsAutoPlaying(false) // Pause auto-play when user scrolls
    
    // Determine scroll direction
    const deltaY = e.deltaY
    
    if (deltaY > 0) {
      // Scroll down - next card
      setCurrentIndex(prev => (prev + 1) % skills.length)
    } else {
      // Scroll up - previous card
      setCurrentIndex(prev => (prev - 1 + skills.length) % skills.length)
    }
    
    // Reset scrolling flag after a short delay
    setTimeout(() => {
      setIsScrolling(false)
      // Resume auto-play after 3 seconds of no scroll activity
      setTimeout(() => {
        setIsAutoPlaying(true)
      }, 3000)
    }, 150) // Throttle scroll events to ~150ms
  }, [isScrolling, skills.length])

  useEffect(() => {
    updateCarousel(currentIndex)
  }, [currentIndex])

  // Handle window resize to recalculate carousel
  useEffect(() => {
    const handleResize = () => {
      updateCarousel(currentIndex)
    }
    
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [currentIndex])

  // Auto-play functionality (optional - pauses on hover)
  useEffect(() => {
    let interval: number | null = null
    
    if (isAutoPlaying) {
      interval = window.setInterval(() => {
        setCurrentIndex(prev => (prev + 1) % skills.length)
      }, 3000) // Change card every 4 seconds
    }
    
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isAutoPlaying, skills.length])

  // Add wheel scroll event listener
  useEffect(() => {
    const skillsSection = sectionRef.current
    if (!skillsSection) return
    
    // Add event listener with passive: false to enable preventDefault
    skillsSection.addEventListener('wheel', handleWheelScroll, { passive: false })
    
    return () => {
      skillsSection.removeEventListener('wheel', handleWheelScroll)
    }
  }, [handleWheelScroll])

  return (
    <section id="skills" className="skills-section" ref={sectionRef}>
      <div className="skills-container">
        <h2 className="skills-title" ref={titleRef}>Skills</h2>
        <p className="skills-subtitle">A showcase of my technical skills</p>
        
        <div 
          className="carousel-container"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          <div 
            className={`skills-carousel ${isSwiping ? 'swiping' : ''}`}
            ref={carouselRef}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            {skills.map((skill, index) => (
              <div 
                key={skill.title} 
                className={`skill-card ${index === currentIndex ? 'active' : ''}`}
                style={{ 
                  '--skill-color': skill.color,
                  '--skill-color-rgb': skill.colorRgb
                } as React.CSSProperties}
                onClick={() => goToCard(index)}
              >
                <div className="skill-icon">
                  {renderIcon(iconMap, skill.icon)}
                </div>
                <h3 className="skill-title">{skill.title}</h3>
                <p className="skill-description">{skill.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Skills
