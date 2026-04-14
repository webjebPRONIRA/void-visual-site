import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const steps = [
  {
    number: '01',
    title: 'АНАЛИТИКА',
    description: 'Погружение в нишу, аудит конкурентов и выявление триггеров целевой аудитории.',
    color: '#8B5CF6',
  },
  {
    number: '02',
    title: 'КОНЦЕПЦИЯ',
    description: 'Разрабатываем визуальную стратегию и композиционный скелет. Подбираем акцентную типографику, цветовую палитру и создаем эскизы, задающие вектор будущей воронки продаж.',
    color: '#22D3EE',
  },
  {
    number: '03',
    title: 'ПРОДАКШН',
    description: 'Финальная реализация графики. Используем ИИ для апскейла и улучшения качества исходников. Работаем с глубокой ретушью и докруткой визуала, доводя макет до абсолюта.',
    color: '#FB923C',
  },
  {
    number: '04',
    title: 'ФИНАЛИЗАЦИЯ',
    description: 'Подготовка и передача материалов. Контролируем полное соответствие графики техническим регламентам и стандартам качества целевых платформ.',
    color: '#34D399',
  },
]

function ProcessStep({ step, index }) {
  const stepRef = useRef()

  useEffect(() => {
    if (!stepRef.current) return

    gsap.fromTo(stepRef.current,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        delay: index * 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: stepRef.current,
          start: 'top 85%',
        },
      }
    )
  }, [index])

  return (
    <div
      ref={stepRef}
      className="group relative p-8 lg:p-10 rounded-3xl border-2 border-white/10 bg-white/[0.03] transition-all duration-300 cursor-pointer hover:bg-white/[0.06] hover:border-white/20"
      style={{
        opacity: 0,
        transform: 'translateY(40px)',
      }}
    >
      <div
        className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"
        style={{
          background: `radial-gradient(circle at center, ${step.color}28 0%, transparent 70%)`,
          boxShadow: `0 0 50px ${step.color}40, inset 0 0 25px ${step.color}10`,
        }}
      />

      <div className="flex items-start justify-between mb-6">
        <span
          className="text-5xl font-bold"
          style={{
            color: step.color,
            opacity: 0.55,
            filter: `drop-shadow(0 0 8px ${step.color}60)`,
          }}
        >
          {step.number}
        </span>
      </div>

      <div className="mb-4">
        <div
          className="w-14 h-1.5 rounded-full mb-5"
          style={{
            backgroundColor: step.color,
            boxShadow: `0 0 14px ${step.color}CC, 0 0 28px ${step.color}66`,
          }}
        />
        <h3 className="text-2xl lg:text-3xl font-bold tracking-tight text-white">
          {step.title}
        </h3>
      </div>

      <p className="text-lg text-white/75 font-normal leading-relaxed group-hover:text-white transition-colors duration-300">
        {step.description}
      </p>
    </div>
  )
}

export default function Process() {
  const titleRef = useRef()
  const ctaRef = useRef()

  useEffect(() => {
    if (!titleRef.current) return

    gsap.fromTo(titleRef.current.children,
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top 80%',
        },
      }
    )
  }, [])

  useEffect(() => {
    if (!ctaRef.current) return
    gsap.fromTo(ctaRef.current,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: ctaRef.current,
          start: 'top 90%',
        },
      }
    )
  }, [])

  return (
    <section className="py-20 lg:py-28 bg-black border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={titleRef} className="mb-16 lg:mb-20 text-center">
          <span className="text-sm font-semibold tracking-widest uppercase text-white/60 mb-6 block">
            Наш метод
          </span>
          <h2
            className="text-5xl sm:text-6xl lg:text-8xl font-bold tracking-tight"
            style={{
              textShadow: '0 0 40px rgba(255,255,255,0.16), 0 0 80px rgba(255,255,255,0.07)',
            }}
          >
            КАК МЫ РАБОТАЕМ
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {steps.map((step, index) => (
            <ProcessStep key={step.number} step={step} index={index} />
          ))}
        </div>

        <div ref={ctaRef} className="mt-16 lg:mt-20 text-center" style={{ opacity: 0 }}>
          {/* Надпись с таким же свечением как у главного заголовка */}
          <p
            className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight uppercase mb-10"
            style={{
              background: 'linear-gradient(to right, #ffffff, rgba(255,255,255,0.85))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              filter: 'drop-shadow(0 0 20px rgba(255,255,255,0.20)) drop-shadow(0 0 50px rgba(139,92,246,0.20))',
            }}
          >
            ГОТОВЫ ОБСУДИТЬ ПРОЕКТ?
          </p>

          <a
            href="#contact"
            className="group inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-violet-600 to-purple-600 text-white font-semibold text-lg rounded-full transition-all duration-300 hover:from-violet-500 hover:to-purple-500"
            style={{
              boxShadow: '0 0 30px rgba(139,92,246,0.40), 0 0 70px rgba(139,92,246,0.15)',
            }}
            onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 0 40px rgba(139,92,246,0.55), 0 0 90px rgba(139,92,246,0.22)' }}
            onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 0 30px rgba(139,92,246,0.40), 0 0 70px rgba(139,92,246,0.15)' }}
          >
            <span>Начать проект</span>
            <svg
              className="w-6 h-6 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
