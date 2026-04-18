import { useEffect, useRef, useState } from 'react'
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
import { LenisContext } from './context/LenisContext'
import './index.css'

gsap.registerPlugin(ScrollTrigger)

function App() {
  const [lenis, setLenis] = useState(null)

  useEffect(() => {
    const lenisInstance = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    lenisInstance.on('scroll', ScrollTrigger.update)
    const tickerCallback = (time) => { lenisInstance.raf(time * 1000) }
    gsap.ticker.add(tickerCallback)
    gsap.ticker.lagSmoothing(0)

    setLenis(lenisInstance)

    return () => {
      gsap.ticker.remove(tickerCallback)
      lenisInstance.destroy()
    }
  }, [])

  return (
    <LenisContext.Provider value={lenis}>
      <div className="min-h-screen bg-[#080810] text-white overflow-hidden">

        {/* ── Фиксированный фон первой половины (Hero / Stats) ── */}
        <div className="fixed inset-0 z-[-1] pointer-events-none">
          <svg className="absolute inset-0 w-full h-full opacity-[0.03]">
            <filter id="noise">
              <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" />
              <feColorMatrix type="saturate" values="0" />
            </filter>
            <rect width="100%" height="100%" filter="url(#noise)" />
          </svg>

          {/* верхнее центральное зарево */}
          <div className="absolute top-0 left-0 w-full h-[800px]" style={{
            background: 'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(139,92,246,0.10) 0%, transparent 70%)',
          }} />

          {/* боковые акценты первой половины */}
          <div className="absolute top-0 left-0 w-[500px] h-full" style={{
            background: 'radial-gradient(ellipse 50% 40% at 0% 30%, rgba(139,92,246,0.09) 0%, transparent 70%)',
          }} />
          <div className="absolute top-0 right-0 w-[500px] h-full" style={{
            background: 'radial-gradient(ellipse 50% 40% at 100% 30%, rgba(109,40,217,0.09) 0%, transparent 70%)',
          }} />
        </div>

        <Header />
        <Hero />
        <StatsSection />
        <Marquee />

        {/* ── ВТОРАЯ ПОЛОВИНА: relative-обёртка с absolute градиентами ── */}
        <div className="relative">

          {/* левый боковой градиент — 4 пятна по высоте */}
          <div
            className="absolute inset-y-0 left-0 w-[500px] pointer-events-none z-0"
            style={{
              background: `
                radial-gradient(ellipse 90% 28% at 0% 12%, rgba(139,92,246,0.20) 0%, transparent 60%),
                radial-gradient(ellipse 80% 24% at 0% 40%, rgba(109,40,217,0.15) 0%, transparent 60%),
                radial-gradient(ellipse 80% 24% at 0% 68%, rgba(139,92,246,0.13) 0%, transparent 58%),
                radial-gradient(ellipse 70% 20% at 0% 92%, rgba(109,40,217,0.11) 0%, transparent 55%)
              `,
            }}
          />

          {/* правый боковой градиент — 4 пятна по высоте */}
          <div
            className="absolute inset-y-0 right-0 w-[500px] pointer-events-none z-0"
            style={{
              background: `
                radial-gradient(ellipse 90% 28% at 100% 16%, rgba(109,40,217,0.20) 0%, transparent 60%),
                radial-gradient(ellipse 80% 24% at 100% 44%, rgba(139,92,246,0.15) 0%, transparent 60%),
                radial-gradient(ellipse 80% 24% at 100% 72%, rgba(109,40,217,0.13) 0%, transparent 58%),
                radial-gradient(ellipse 70% 20% at 100% 94%, rgba(139,92,246,0.11) 0%, transparent 55%)
              `,
            }}
          />

          {/* мягкое центральное свечение */}
          <div
            className="absolute inset-0 pointer-events-none z-0"
            style={{
              background: 'radial-gradient(ellipse 60% 30% at 50% 50%, rgba(109,40,217,0.06) 0%, transparent 70%)',
            }}
          />

          <PortfolioSection />
          <Marquee />
          <Process />
        </div>

        <Footer />
      </div>
    </LenisContext.Provider>
  )
}

export default App
