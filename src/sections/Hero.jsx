import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function Hero() {
  const titleRef = useRef()
  const textBlockRef = useRef()
  const ctaRef = useRef()

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.3 })

    if (titleRef.current) {
      tl.fromTo(titleRef.current.querySelectorAll('.title-line'),
        { y: 80, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: 'power3.out' }
      )
    }

    if (textBlockRef.current) {
      tl.fromTo(textBlockRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
        '-=0.6'
      )
    }

    if (ctaRef.current) {
      tl.fromTo(ctaRef.current.children,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'back.out(1.7)' },
        '-=0.4'
      )
    }
  }, [])

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div
        className="absolute inset-0 z-0"
        style={{
          background: 'linear-gradient(135deg, #080810 0%, #0f0820 40%, #130a28 60%, #080810 100%)',
        }}
      />
      <svg className="absolute inset-0 z-0 w-full h-full opacity-[0.035] pointer-events-none">
        <filter id="noise"><feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/></filter>
        <rect width="100%" height="100%" filter="url(#noise)"/>
      </svg>
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.07]" style={{
        backgroundImage: 'radial-gradient(circle, rgba(139,92,246,0.8) 1px, transparent 1px)',
        backgroundSize: '40px 40px',
      }} />
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-transparent via-transparent to-black/80" />
      <div className="absolute inset-0 z-0 opacity-40" style={{
        background: 'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(139, 92, 246, 0.18) 0%, transparent 100%)',
      }} />

      <div className="relative z-10 w-full pt-16 sm:pt-20 lg:pt-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 sm:gap-12">

            {/* Заголовок — прижат к левому краю контейнера */}
            <div className="flex-1 min-w-0">
              <h1
                ref={titleRef}
                className="font-bold tracking-tighter leading-[0.88] uppercase"
                style={{
                  fontFamily: 'Montserrat, sans-serif',
                  fontSize: 'clamp(3.2rem, 10vw, 7.5rem)',
                }}
              >
                <span
                  className="title-line block text-white"
                  style={{ textShadow: '0 0 40px rgba(255,255,255,0.18), 0 0 80px rgba(255,255,255,0.08)' }}
                >
                  ДОМИНИРУЙ
                </span>
                <span
                  className="title-line block text-white"
                  style={{ textShadow: '0 0 40px rgba(255,255,255,0.18), 0 0 80px rgba(255,255,255,0.08)' }}
                >
                  НА РЫНКЕ
                </span>
                <span
                  className="title-line block text-white/80 mt-2"
                  style={{ textShadow: '0 0 40px rgba(255,255,255,0.14), 0 0 80px rgba(255,255,255,0.06)' }}
                >
                  ЧЕРЕЗ
                </span>
                <span
                  className="title-line block bg-gradient-to-r from-violet-400 to-purple-500 bg-clip-text text-transparent mt-1"
                  style={{
                    filter: 'drop-shadow(0 0 18px rgba(139,92,246,0.55)) drop-shadow(0 0 40px rgba(139,92,246,0.25))',
                  }}
                >
                  ВИЗУАЛ
                </span>
              </h1>
            </div>

            {/* Правый блок — прижат к правому краю контейнера */}
            <div
              ref={textBlockRef}
              className="lg:w-[340px] xl:w-[380px] lg:pb-2 opacity-0 lg:text-left"
            >
              <p className="text-sm sm:text-base text-white/60 font-light leading-relaxed mb-6 max-w-md">
                Дизайн, который цепляет взгляд — на любой платформе
              </p>

              <div ref={ctaRef} className="flex flex-col sm:flex-row gap-3">
                <a
                  href="#contact"
                  className="px-6 py-3 bg-gradient-to-r from-violet-600 to-purple-600 text-white font-medium rounded-full hover:from-violet-500 hover:to-purple-500 transition-all duration-300 text-center whitespace-nowrap"
                  style={{ boxShadow: '0 0 20px rgba(139,92,246,0.35), 0 0 60px rgba(139,92,246,0.12)' }}
                >
                  Заказать дизайн
                </a>

                <a
                  href="#channels"
                  className="px-6 py-3 border border-white/30 text-white font-light rounded-full hover:bg-white/10 hover:border-white/50 transition-all duration-300 text-center whitespace-nowrap"
                >
                  Посмотреть работы
                </a>
              </div>
            </div>

          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 hidden sm:block">
        <div className="w-6 h-10 border-2 border-white/20 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-white/40 rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  )
}
