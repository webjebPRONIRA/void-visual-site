import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { useLanguage } from '../context/LanguageContext'
import { useLenis } from '../context/LenisContext'
import BackgroundWordmark from '../components/BackgroundWordmark'

const portfolioImages = {
  channels: [
    { src: '/optimized/оформление1.webp', width: 1600, height: 1195 },
    { src: '/optimized/оформление2.webp', width: 1600, height: 1195 },
    { src: '/optimized/оформление3.webp', width: 1600, height: 1195 },
    { src: '/optimized/оформление4.webp', width: 1600, height: 1195 },
    { src: '/optimized/оформление5.webp', width: 1600, height: 1249 },
  ],
  previews: [
    { src: '/optimized/1превью1.webp', width: 1600, height: 915 },
    { src: '/optimized/1превью2.webp', width: 928, height: 537 },
    { src: '/optimized/1превью3.webp', width: 929, height: 537 },
    { src: '/optimized/1превью4.webp', width: 1600, height: 913 },
    { src: '/optimized/1превью5.webp', width: 992, height: 563 },
  ],
  creatives: [
    { src: '/optimized/инфографика1.webp', width: 1233, height: 864 },
    { src: '/optimized/инфографика2.webp', width: 1600, height: 1122 },
    { src: '/optimized/инфографика3.webp', width: 1233, height: 864 },
    { src: '/optimized/инфографика4.webp', width: 1600, height: 1122 },
    { src: '/optimized/инфографика5.webp', width: 1600, height: 1122 },
  ],
  other: [
    { src: '/optimized/прочее1.webp', width: 960, height: 540 },
    { src: '/optimized/прочее2.webp', width: 736, height: 736 },
    { src: '/optimized/прочее3.webp', width: 1325, height: 740 },
    { src: '/optimized/прочее4.webp', width: 1280, height: 960 },
    { src: '/optimized/прочее5.webp', width: 1200, height: 900 },
  ],
}

function Arrow({ direction = 'right' }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
      <path d={direction === 'left' ? 'M15 5 8 12l7 7' : 'm9 5 7 7-7 7'} stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function Lightbox({ images, currentIndex, title, onClose, onNext, onPrev }) {
  const lenis = useLenis()
  const { copy } = useLanguage()
  const image = images[currentIndex]

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
    <div className="lightbox" role="dialog" aria-modal="true" aria-label={title} onClick={onClose}>
      <button className="lightbox-close" type="button" aria-label={copy.header.closeMenu} onClick={(event) => { event.stopPropagation(); onClose() }}>
        <span aria-hidden="true" />
        <span aria-hidden="true" />
      </button>

      <button className="lightbox-arrow lightbox-arrow-left" type="button" aria-label={copy.carousel.prevSlide} onClick={(event) => { event.stopPropagation(); onPrev() }}>
        <Arrow direction="left" />
      </button>

      <div className="lightbox-stage" onClick={(event) => event.stopPropagation()}>
        <img
          src={image.src}
          width={image.width}
          height={image.height}
          alt={`${title}. ${copy.carousel.slideAlt} ${currentIndex + 1}`}
          decoding="async"
        />
      </div>

      <button className="lightbox-arrow lightbox-arrow-right" type="button" aria-label={copy.carousel.nextSlide} onClick={(event) => { event.stopPropagation(); onNext() }}>
        <Arrow />
      </button>

      <div className="lightbox-count" aria-live="polite">
        {String(currentIndex + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
      </div>
    </div>,
    document.body
  )
}

function ProjectGallery({ images, title }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [lightboxIndex, setLightboxIndex] = useState(null)
  const trackRef = useRef(null)
  const targetIndexRef = useRef(null)
  const unlockTimerRef = useRef(null)
  const { copy } = useLanguage()

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    const slides = Array.from(track.querySelectorAll('[data-gallery-slide]'))
    const observer = new IntersectionObserver(
      (entries) => {
        if (targetIndexRef.current !== null) return

        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]

        if (visible) setActiveIndex(Number(visible.target.dataset.gallerySlide))
      },
      { root: track, threshold: [0.45, 0.65, 0.85] }
    )

    const finishProgrammaticScroll = () => {
      if (targetIndexRef.current === null) return
      setActiveIndex(targetIndexRef.current)
      targetIndexRef.current = null
      window.clearTimeout(unlockTimerRef.current)
    }

    slides.forEach((slide) => observer.observe(slide))
    track.addEventListener('scrollend', finishProgrammaticScroll)

    return () => {
      observer.disconnect()
      track.removeEventListener('scrollend', finishProgrammaticScroll)
      window.clearTimeout(unlockTimerRef.current)
    }
  }, [images])

  const scrollToIndex = (index) => {
    const track = trackRef.current
    const slide = track?.querySelector(`[data-gallery-slide="${index}"]`)
    if (!track || !slide) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const left = slide.offsetLeft - (track.clientWidth - slide.clientWidth) / 2

    targetIndexRef.current = index
    setActiveIndex(index)
    track.scrollTo({ left, behavior: reducedMotion ? 'auto' : 'smooth' })

    window.clearTimeout(unlockTimerRef.current)
    unlockTimerRef.current = window.setTimeout(() => {
      targetIndexRef.current = null
    }, reducedMotion ? 50 : 1200)
  }

  const changeSlide = (direction) => {
    const nextIndex = direction === 'next'
      ? (activeIndex + 1) % images.length
      : (activeIndex - 1 + images.length) % images.length

    scrollToIndex(nextIndex)
  }

  const handleKeyDown = (event) => {
    if (event.key === 'ArrowRight') changeSlide('next')
    if (event.key === 'ArrowLeft') changeSlide('prev')
  }

  return (
    <div className="portfolio-gallery">
      <div className="portfolio-gallery-toolbar content-container">
        <div className="portfolio-gallery-count" aria-live="polite">
          <span>{String(activeIndex + 1).padStart(2, '0')}</span>
          <span>/</span>
          <span>{String(images.length).padStart(2, '0')}</span>
        </div>

        <div className="portfolio-gallery-controls">
          <button type="button" aria-label={copy.carousel.prevSlide} onClick={() => changeSlide('prev')}>
            <Arrow direction="left" />
          </button>
          <button type="button" aria-label={copy.carousel.nextSlide} onClick={() => changeSlide('next')}>
            <Arrow />
          </button>
        </div>
      </div>

      <div
        ref={trackRef}
        className="portfolio-gallery-track"
        tabIndex="0"
        onKeyDown={handleKeyDown}
        aria-label={title}
      >
        {images.map((image, index) => (
          <button
            key={image.src}
            type="button"
            className="portfolio-slide"
            data-gallery-slide={index}
            style={{ '--image-ratio': image.width / image.height }}
            onClick={() => setLightboxIndex(index)}
            aria-label={`${copy.carousel.goToSlide} ${index + 1}`}
          >
            <img
              src={image.src}
              width={image.width}
              height={image.height}
              alt={`${title}. ${copy.carousel.slideAlt} ${index + 1}`}
              loading="lazy"
              decoding="async"
            />
          </button>
        ))}
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          images={images}
          currentIndex={lightboxIndex}
          title={title}
          onClose={() => setLightboxIndex(null)}
          onNext={() => setLightboxIndex((index) => (index + 1) % images.length)}
          onPrev={() => setLightboxIndex((index) => (index - 1 + images.length) % images.length)}
        />
      )}
    </div>
  )
}

function PortfolioBlock({ item, index }) {
  return (
    <section id={item.id} className={`portfolio-section portfolio-section-${item.id}`}>
      <BackgroundWordmark word="VOID" className="section-wordmark section-wordmark-primary" />
      <BackgroundWordmark word="VISUAL" className="section-wordmark section-wordmark-secondary" />
      <div className="content-container portfolio-heading-grid">
        <div className="portfolio-section-number" aria-hidden="true">
          {String(index + 1).padStart(2, '0')}
        </div>
        <h2>{item.title}</h2>
        <p>{item.description}</p>
      </div>

      <ProjectGallery images={item.images} title={item.title} />
    </section>
  )
}

export default function PortfolioSection() {
  const { copy } = useLanguage()
  const portfolioData = copy.portfolio.map((item) => ({ ...item, images: portfolioImages[item.id] }))

  return (
    <div className="portfolio" aria-label="Portfolio">
      {portfolioData.map((item, index) => (
        <PortfolioBlock key={item.id} item={item} index={index} />
      ))}
    </div>
  )
}
