import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './About.css'

gsap.registerPlugin(ScrollTrigger)

/**
 * ### About Component
 * This is the About Section... it is 'about' me.
 * @returns React.FC => \<About \/\>
 * @author Neko
 * @license GPLv3.0
 */
const About: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const bioRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    // About section animations
    const ctx = gsap.context(() => {
      // Title smooth entrance
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

      // Body smooth entrance
      gsap.from(bioRef.current, {
        y: 30,
        opacity: 0,
        duration: 1,
        delay: 0.3,
        ease: "power3.out",
        scrollTrigger: {
          trigger: bioRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="about" className="about-section" ref={sectionRef}>
      <div className="about-container">
        <h2 className="about-title" ref={titleRef}>About Me</h2>
        <div className="about-content">
          <p className="about-bio" ref={bioRef}>
            Hello! I am Ritesh(a.k.a Neko). I like tinkering with the miracle sand and rocks machine!
            I love making beautiful, functional, and user-friendly applications.
            <br /><br />
            I believe in writing clean, maintainable code and staying up-to-date with the latest industry trends and best practices. 
            When I'm not coding, you can find me exploring new technologies, writing documentation, or pursuing my various hobbies.
            <br /><br />
            I'm always excited to collaborate on interesting projects and connect with fellow developers and creators.
            <br />
            PS: I like to adapt to new stuff, whether that be tools, technologies, or methodologies. After all, change is the only constant!
          </p>
        </div>
      </div>
    </section>
  )
}

export default About
 