import { useEffect, useState } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Header from './components/Header'
import Hero from './sections/Hero'
import StatsSection from './sections/StatsSection'
import PortfolioSection from './sections/PortfolioSection'
import Process from './sections/Process'
import Footer from './components/Footer'
import Marquee from './sections/Marquee'
import GrainOverlay from './GrainOverlay'
import AmbientMotion from './components/AmbientMotion'
import { LanguageProvider } from './context/LanguageContext'
import { LenisContext } from './context/LenisContext'
import './index.css'

gsap.registerPlugin(ScrollTrigger)

function AppShell() {
  const [lenis, setLenis] = useState(null)

  useEffect(() => {
    const lenisInstance = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    lenisInstance.on('scroll', ScrollTrigger.update)
    const tickerCallback = (time) => {
      lenisInstance.raf(time * 1000)
    }

    gsap.ticker.add(tickerCallback)
    gsap.ticker.lagSmoothing(0)
    // The Lenis instance is created by this external-system effect and shared through context.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLenis(lenisInstance)

    return () => {
      gsap.ticker.remove(tickerCallback)
      lenisInstance.destroy()
    }
  }, [])

  return (
    <LenisContext.Provider value={lenis}>
      <div className="site-shell">
        <AmbientMotion />
        <Header />
        <main id="main-content">
          <Hero />
          <StatsSection />
          <Marquee />
          <PortfolioSection />
          <Marquee />
          <Process />
        </main>
        <Footer />
        <GrainOverlay />
      </div>
    </LenisContext.Provider>
  )
}

export default function App() {
  return (
    <LanguageProvider>
      <AppShell />
    </LanguageProvider>
  )
}
