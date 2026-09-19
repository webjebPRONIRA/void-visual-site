import Header from './components/Header'
import Hero from './sections/Hero'
import StatsSection from './sections/StatsSection'
import PortfolioSection from './sections/PortfolioSection'
import Process from './sections/Process'
import Footer from './components/Footer'
import Marquee from './sections/Marquee'
import GrainOverlay from './GrainOverlay'
import { LanguageProvider } from './context/LanguageContext'
import './index.css'

function AppShell() {
  return (
    <div className="site-shell">
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
  )
}

export default function App() {
  return (
    <LanguageProvider>
      <AppShell />
    </LanguageProvider>
  )
}
