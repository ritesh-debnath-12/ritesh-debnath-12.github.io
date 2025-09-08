import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import quotesData from "../../assets/json/quotes_data.json"
import './Home.css'

gsap.registerPlugin(ScrollTrigger)

interface HomeProps {
  onHeroReady?: () => void
  isLoading?: boolean
}
// Converts author names to their initials, but preserves their last names
const quoteAuthorInitials = (author: string) => {
  const nameParts = author.split(" ");
  if (nameParts.length === 1) {
    return author;
  }
  
  let initials = "";
  for (let i = 0; i < nameParts.length - 1; i++) {
    initials += nameParts[i].charAt(0).toUpperCase() + ".";
  }
  const lastName = nameParts[nameParts.length - 1];
  return `${initials} ${lastName}`;
}

/**
 * ### Home Component
 * This is the Home Section... this is the most painful component to be built.
 * It has a hero which has random quotes and a right side background removed picture of mine...
 * @returns React.FC => \<Home \/\>
 * @author Neko
 * @license GPLv3.0 (IMAGE ASSETS ARE UNDER COPYRIGHT!)
 */
const Home: React.FC<HomeProps> = ({ onHeroReady, isLoading = false }) => {
  const leftRef = useRef<HTMLDivElement>(null)
  const rightRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLDivElement>(null)
  const tlRef = useRef<gsap.core.Timeline | null>(null)
  const hasInitiallyAnimated = useRef(false)

  // Create a reusable animation function
  const createAnimation = (trigger: 'initial' | 'scroll' = 'initial') => {
    const isMobile = window.innerWidth <= 768
    
    // Create timeline
    const tl = gsap.timeline({ paused: true })
    
    // Set initial states
    gsap.set([leftRef.current, rightRef.current], {
      opacity: 0,
      x: isMobile ? 0 : (leftRef.current ? -100 : 100),
      y: isMobile ? 50 : 0,
      visibility: 'visible'
    })
    
    // Add animations
    tl.to(leftRef.current, {
      x: 0,
      y: 0,
      opacity: 1,
      duration: 1.2,
      ease: "power3.out",
    })
    .to(rightRef.current, {
      x: 0,
      y: 0, 
      opacity: 1,
      duration: 1.2,
      ease: "power3.out",
    }, "-=0.8")
    
    const delay = trigger === 'initial' ? 300 : 100
    // I AM ON THE VERGE OF TEARS... WHY YOU DON'T WORK!???!?!?
    // const logMessage = trigger === 'initial' ? 
    //   'Initial GSAP animation has been injected...' : 
    //   'Starting scroll-triggered GSAP animation...'
    
    setTimeout(() => {
      // console.log(logMessage)
      tl.play()
    }, delay)
    
    return tl
  }

  useEffect(() => {
    if (isLoading) return
    
    gsap.set('.profile-image', { visibility: 'visible' })
    
    tlRef.current = createAnimation('initial')
    hasInitiallyAnimated.current = true
    
    return () => {
      try {
        tlRef.current?.kill()
      } catch {}
      if (rightRef.current) {
        gsap.set(rightRef.current, { clearProps: 'all' })
      }
      if (leftRef.current) {
        gsap.set(leftRef.current, { clearProps: 'all' })
      }
      gsap.set('.profile-image', { visibility: 'visible' })
    }
  }, [isLoading])

  useEffect(() => {
    if (isLoading || !hasInitiallyAnimated.current) return
    
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 80%",
        end: "bottom 20%",
        onEnter: () => {
          // console.log('Home section entered!')
          createAnimation('scroll')
        },
        // onLeave: () => {
        //   // console.log('Home section left!')
        // },
        onEnterBack: () => {
          // console.log('Home section entered from beneath!')
          createAnimation('scroll')
        },
        // markers: true,       WHOEVER THOUGHT ABOUT IMPLEMENTING THIS IS AN ANGEL...
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [isLoading, hasInitiallyAnimated.current])

  // Hero images are loading sequence
  useEffect(() => {
    let loaded = 0
    const total = 2 // For some reason, changing this doesn't do anything anymore...Moreso, don't fiddle with this.
    const onLoad = () => {
      loaded += 1
      if (loaded >= total) {
        onHeroReady?.()
      }
    }
    const bw = document.querySelector('.profile-image--bw-hc') as HTMLImageElement | null
    const color = document.querySelector('.profile-image--color') as HTMLImageElement | null
    bw?.complete ? onLoad() : bw?.addEventListener('load', onLoad)
    color?.complete ? onLoad() : color?.addEventListener('load', onLoad)
    return () => {
      bw?.removeEventListener('load', onLoad)
      color?.removeEventListener('load', onLoad)
    }
  }, [onHeroReady])

  const quotes: string[][] = quotesData.quotes
//   {
//     "quotes": [
//         ["Code is poetry written in logic.", "Person-A"],
//         ["Innovation distinguishes between a leader and a follower.", "Person-B"],
//         ["The best way to predict the future is to invent it.", "Person-C"],
//         ["Simplicity is the ultimate sophistication.", "Person-D"],
//         ["Technology is nothing. What's important is that you have a faith in people.", "Person-E"]
//     ]
// }

  const randomQuoteIndex = Math.floor(Math.random() * quotes.length)

  return (
    <section id="home" className="home-section" ref={sectionRef}>
      <div className="home-container">
        <div className="home-left" ref={leftRef}>
          <div className="quote-container">
            <blockquote className="quote">
              "{quotes[randomQuoteIndex][0]}"
            </blockquote>
            <p className="quote-author">– {quoteAuthorInitials(quotes[randomQuoteIndex][1])}</p>
          </div>
        </div>
        
        <div className="home-right" ref={rightRef}>
          <div className="image-container">
            <img
              src="/images/me_bw_highcontrast.PNG"
              alt="Portfolio Profile (B&W High Contrast)"
              className="profile-image profile-image--bw-hc"
              // onLoad={() => console.log('BW high-contrast image loaded')}
              onError={(e) => {
                console.error('BW high-contrast image failed to load:', e)
              }}
            />
            {/* THESE IMAGES ARE NOT NEEDED */}
            {/* B/W -> COLORED PROJECT HAS BEEN CANCELED */}
            {/* <img
              src="/images/me_bw_.PNG"
              alt="Portfolio Profile (B&W Classic)"
              className="profile-image profile-image--bw-classic"
              onLoad={() => console.log('BW classic image loaded')}
              onError={(e) => {
                console.error('BW classic image failed to load:', e)
              }}
            />
            <img
              src="/images/me_colored.PNG"
              alt="Portfolio Profile (Color)"
              className="profile-image profile-image--color"
              onLoad={() => console.log('Color image loaded')}
              onError={(e) => {
                console.error('Color image failed to load:', e)
              }}
            /> */}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Home
