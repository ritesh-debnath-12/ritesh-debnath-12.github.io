import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { 
  FaEnvelope, 
  FaLinkedin, 
  FaGithub, 
  FaTwitter, 
  FaDiscord 
} from 'react-icons/fa'
import './Contact.css'

gsap.registerPlugin(ScrollTrigger)

/**
 * ### Contact Component
 * This is the Contact Section... it contains various cards
 * neccesary for getting in touch with me.
 * @returns React.FC => \<Contact \/\>
 * @author Neko
 * @license GPLv3.0
 */
const Contact: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial visibility for GSAP animations
      gsap.set(".contact-card", { 
        opacity: 0, 
        y: 50,
        visibility: "visible" // Ensure cards are visible for GSAP
      })

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

      gsap.fromTo(".contact-card", 
        {
          y: 50,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const contactMethods = [
    {
      icon: <FaEnvelope />,
      name: "Email",
      url: "mailto:riteshdebnath12@gmail.com",
      color: "#EA4335",
      colorRgb: "234, 67, 53"
    },
    {
      icon: <FaLinkedin />,
      name: "LinkedIn",
      url: "https://linkedin.com/in/ritesh-debnath",
      color: "#0A66C2",
      colorRgb: "10, 102, 194"
    },
    {
      icon: <FaGithub />,
      name: "GitHub",
      url: "https://github.com/ritesh-debnath-12",
      color: "#333",
      colorRgb: "51, 51, 51"
    },
    {
      icon: <FaTwitter />,
      name: "Twitter",
      url: "https://x.com/KrosKat23",
      color: "#1DA1F2",
      colorRgb: "29, 161, 242"
    },
    {
      icon: <FaDiscord />,
      name: "Discord",
      url: "https://discord.com/users/765874807698227210",
      color: "#5865F2",
      colorRgb: "88, 101, 242"
    }
  ]

  return (
    <section id="contact" className="contact-section" ref={sectionRef}>
      <div className="contact-container">
        <h2 className="contact-title" ref={titleRef}>Contact Me</h2>
        <p className="contact-subtitle">A way for people to get in touch with me.</p>
        
        <div className="contact-grid" ref={cardsRef}>
          {contactMethods.map((method) => (
            <a
              key={method.name}
              href={method.url}
              className="contact-card"
              style={{ 
                '--contact-color': method.color,
                '--contact-color-rgb': method.colorRgb
              } as React.CSSProperties}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="contact-icon">
                {method.icon}
              </div>
              <span className="contact-name">{method.name}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Contact
