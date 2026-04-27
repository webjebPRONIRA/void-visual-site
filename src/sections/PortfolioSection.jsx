import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLanguage } from '../context/LanguageContext'
import { useLenis } from '../context/LenisContext'

gsap.registerPlugin(ScrollTrigger)

const portfolioImages = {
  channels: ['/optimized/оформление1.webp', '/optimized/оформление2.webp', '/optimized/оформление3.webp', '/optimized/оформление4.webp', '/optimized/оформление5.webp'],
  previews: ['/optimized/1превью1.webp', '/optimized/1превью2.webp', '/optimized/1превью3.webp', '/optimized/1превью4.webp', '/optimized/1превью5.webp'],
  creatives: ['/optimized/инфографика1.webp', '/optimized/инфографика2.webp', '/optimized/инфографика3.webp', '/optimized/инфографика4.webp', '/optimized/инфографика5.webp'],
  other: ['/optimized/прочее1.webp', '/optimized/прочее2.webp', '/optimized/прочее3.webp', '/optimized/прочее4.webp', '/optimized/прочее5.webp'],
}

function normalizeWord(word) {
  return word.toLowerCase().replace(/[^\p{L}\p{N}]/gu, '')
}

function Lightbox({ images, currentIndex, onClose, onNext, onPrev }) {
  const lenis = useLenis()
  const { copy } = useLanguage()

  useEffect(() => {
    lenis?.stop()

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
      if (event.key === 'ArrowRight') onNext()
      if (event.key === 'ArrowLeft') onPrev()
    }

    document.body.style.overflow = 'hidden'
    document.documentElement.style.overflow = 'hidden'
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
      document.documentElement.style.overflow = ''
      lenis?.start()
    }
  }, [lenis, onClose, onNext, onPrev])

  return createPortal(
    <div className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center" onClick={onClose}>
      <button
        onClick={(event) => {
          event.stopPropagation()
          onClose()
        }}
        className="absolute top-4 right-4 w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white transition-all duration-300 z-20"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      </button>

      <button
        onClick={(event) => {
          event.stopPropagation()
          onPrev()
        }}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white/70 hover:bg-violet-600 hover:border-violet-500 transition-all duration-300 z-20"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>

      <div className="w-full h-full flex items-center justify-center p-0 md:p-8 lg:p-12" onClick={(event) => event.stopPropagation()}>
        <img
          src={images[currentIndex]}
          alt={`${copy.carousel.imageAlt} ${currentIndex + 1}`}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-contain"
        />
      </div>

      <img src={images[(currentIndex + 1) % images.length]} className="hidden" aria-hidden="true" alt="" />
      <img src={images[(currentIndex - 1 + images.length) % images.length]} className="hidden" aria-hidden="true" alt="" />

      <button
        onClick={(event) => {
          event.stopPropagation()
          onNext()
        }}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white/70 hover:bg-violet-600 hover:border-violet-500 transition-all duration-300 z-20"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 text-white/70 text-sm z-20">
        <span>{currentIndex + 1}</span>
        <span className="text-white/40">/</span>
        <span>{images.length}</span>
      </div>
    </div>,
    document.body
  )
}

function SimpleCarousel({ images }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [lightbox, setLightbox] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [isInView, setIsInView] = useState(false)
  const carouselRef = useRef(null)
  const imageRef = useRef(null)
  const animatingRef = useRef(false)
  const { copy } = useLanguage()

  useEffect(() => {
    if (!carouselRef.current) return

    const observer = new IntersectionObserver(([entry]) => {
      setIsInView(entry.isIntersecting)
    }, { threshold: 0.35 })

    observer.observe(carouselRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (isPaused || !isInView) return
    const interval = setInterval(() => {
      changeImage('next')
    }, 4000)
    return () => clearInterval(interval)
  }, [isPaused, currentIndex, isInView])

  const changeImage = (direction, targetIndex = null) => {
    if (animatingRef.current) return
    animatingRef.current = true

    let nextIndex
    if (targetIndex !== null) {
      nextIndex = targetIndex
    } else if (direction === 'next') {
      nextIndex = (currentIndex + 1) % images.length
    } else {
      nextIndex = (currentIndex - 1 + images.length) % images.length
    }

    if (nextIndex === currentIndex) {
      animatingRef.current = false
      return
    }

    const isMovingForward = targetIndex !== null ? targetIndex > currentIndex : direction === 'next'

    gsap.to(imageRef.current, {
      opacity: 0,
      scale: 0.96,
      x: isMovingForward ? -15 : 15,
      duration: 0.25,
      ease: 'power1.inOut',
      onComplete: () => {
        setCurrentIndex(nextIndex)
        gsap.set(imageRef.current, { x: isMovingForward ? 15 : -15 })
        gsap.to(imageRef.current, {
          opacity: 1,
          scale: 1,
          x: 0,
          duration: 0.3,
          ease: 'power2.out',
          onComplete: () => {
            animatingRef.current = false
          },
        })
      },
    })
  }

  if (lightbox) {
    return (
      <Lightbox
        images={images}
        currentIndex={currentIndex}
        onClose={() => setLightbox(false)}
        onNext={() => setCurrentIndex((prev) => (prev + 1) % images.length)}
        onPrev={() => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)}
      />
    )
  }

  return (
    <div
      ref={carouselRef}
      className="relative cursor-pointer group transition-all duration-300"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onClick={() => setLightbox(true)}
    >
      <div ref={imageRef} className="w-full flex justify-center">
        <img
          src={images[currentIndex]}
          alt={`${copy.carousel.slideAlt} ${currentIndex + 1}`}
          loading="lazy"
          decoding="async"
          className="w-full h-auto object-contain rounded-xl shadow-[0_0_30px_rgba(139,92,246,0.1)] group-hover:shadow-[0_0_40px_rgba(139,92,246,0.2)] transition-shadow duration-300"
        />
      </div>

      <img src={images[(currentIndex + 1) % images.length]} className="hidden" aria-hidden="true" alt="" />
      <img src={images[(currentIndex - 1 + images.length) % images.length]} className="hidden" aria-hidden="true" alt="" />

      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={(event) => {
              event.stopPropagation()
              changeImage(null, index)
            }}
            className={`mobile-carousel-dot h-2 rounded-full transition-all duration-300 hover:scale-125 ${index === currentIndex ? 'bg-gradient-to-r from-violet-500 to-purple-500 w-8' : 'bg-violet-600/40 w-3 hover:from-violet-400 hover:to-purple-400'}`}
            aria-label={`${copy.carousel.goToSlide} ${index + 1}`}
          />
        ))}
      </div>

      <button
        className="mobile-tap-target mobile-carousel-arrow absolute left-2 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/70 border border-white/30 flex items-center justify-center text-white/80 hover:bg-violet-600 hover:border-violet-500 hover:scale-105 active:scale-90 transition-all duration-300 opacity-0 group-hover:opacity-100 z-10"
        onClick={(event) => {
          event.stopPropagation()
          changeImage('prev')
        }}
        aria-label={copy.carousel.prevSlide}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>

      <button
        className="mobile-tap-target mobile-carousel-arrow absolute right-2 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/70 border border-white/30 flex items-center justify-center text-white/80 hover:bg-violet-600 hover:border-violet-500 hover:scale-105 active:scale-90 transition-all duration-300 opacity-0 group-hover:opacity-100 z-10"
        onClick={(event) => {
          event.stopPropagation()
          changeImage('next')
        }}
        aria-label={copy.carousel.nextSlide}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>
    </div>
  )
}

function PortfolioBlock({ item, index }) {
  const sectionRef = useRef()
  const imageFirst = index % 2 === 1

  useEffect(() => {
    if (!sectionRef.current) return

    gsap.fromTo(sectionRef.current,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      }
    )
  }, [])

  const isLeft = index % 2 === 0
  const bgAccent = isLeft
    ? `radial-gradient(ellipse 55% 80% at -5% 50%, rgba(139, 92, 246, 0.13) 0%, transparent 65%),
       radial-gradient(ellipse 40% 40% at 15% 50%, rgba(109, 40, 217, 0.07) 0%, transparent 50%)`
    : `radial-gradient(ellipse 55% 80% at 105% 50%, rgba(139, 92, 246, 0.13) 0%, transparent 65%),
       radial-gradient(ellipse 40% 40% at 85% 50%, rgba(109, 40, 217, 0.07) 0%, transparent 50%)`

  const isPreview = item.id === 'previews'
  const accentKey = item.accentWord.toLowerCase()

  const photoCol = (
    <div className={isPreview ? 'lg:col-span-8' : 'lg:col-span-7'}>
      <div className="lg:sticky lg:top-24">
        <SimpleCarousel images={item.images} />
      </div>
    </div>
  )

  const textCol = (
    <div className={isPreview ? 'lg:col-span-4' : 'lg:col-span-5'}>
      <div className="flex flex-col gap-6 justify-center h-full">
        <h2 className="text-[1.85rem] sm:text-3xl lg:text-5xl font-bold tracking-tight uppercase leading-[0.95] sm:leading-tight">
          {item.title.split(' ').map((word, wordIndex, words) => {
            const normalized = normalizeWord(word)
            const isAccent = normalized === accentKey
            return (
              <span
                key={`${word}-${wordIndex}`}
                className={isAccent ? 'bg-gradient-to-r from-violet-400 to-purple-500 bg-clip-text text-transparent' : 'text-white'}
                style={isAccent ? { textShadow: '0 0 20px rgba(139, 92, 246, 0.5)' } : {}}
              >
                {word}{wordIndex < words.length - 1 ? ' ' : ''}
              </span>
            )
          })}
        </h2>
        <p className="text-base sm:text-lg lg:text-xl text-white/70 font-normal leading-relaxed">
          {item.description}
        </p>
      </div>
    </div>
  )

  return (
    <section id={item.id} ref={sectionRef} className="py-16 lg:py-24 border-t border-white/5 relative overflow-hidden">
      <div className="absolute inset-0 z-[-1] pointer-events-none" style={{ background: bgAccent }} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          {imageFirst ? <>{photoCol}{textCol}</> : <>{textCol}{photoCol}</>}
        </div>
      </div>
    </section>
  )
}

export default function PortfolioSection() {
  const { copy } = useLanguage()

  const portfolioData = copy.portfolio.map((item) => ({
    ...item,
    images: portfolioImages[item.id],
  }))

  return (
    <div>
      {portfolioData.map((item, index) => (
        <PortfolioBlock key={item.id} item={item} index={index} />
      ))}
    </div>
  )
}
