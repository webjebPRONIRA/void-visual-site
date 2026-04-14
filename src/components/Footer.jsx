import { useRef, useEffect, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Footer() {
  const sectionRef = useRef()
  const titleRef = useRef()
  const [formData, setFormData] = useState({ name: '', telegram: '', message: '' })
  const [isSubmitted, setIsSubmitted] = useState(false)

  useEffect(() => {
    if (!sectionRef.current || !titleRef.current) return

    gsap.fromTo(titleRef.current.children,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      }
    )
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    
    let message = `Здравствуйте! Хочу обсудить проект.\n\n`
    if (formData.message) message += formData.message
    
    const encodedMessage = encodeURIComponent(message)
    window.open(`https://t.me/rodya_designer?text=${encodedMessage}`, '_blank')
    setIsSubmitted(true)
  }

  return (
    <footer id="contact" ref={sectionRef} className="py-24 lg:py-32 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={titleRef} className="mb-16 lg:mb-20 text-center">
          <h2 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight leading-none">
            ГОТОВЫ <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-purple-500">ОБСУДИТЬ</span>
          </h2>
          <h2 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight leading-none mt-2">
            ПРОЕКТ?
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 max-w-5xl mx-auto">
          <div className="space-y-8">
            <div className="flex flex-col gap-4">
              <a 
                href="https://t.me/rodya_designer?text=%D0%97%D0%B4%D1%80%D0%B0%D0%B2%D1%81%D1%82%D0%B2%D1%83%D0%B9%D1%82%D0%B5!%20%D0%A5%D0%BE%D1%87%D1%83%20%D0%BE%D0%B1%D1%81%D1%83%D0%B4%D0%B8%D1%82%D1%8C%20%D0%BF%D1%80%D0%BE%D0%B5%D0%BA%D1%82." 
                target="_blank" 
                rel="noopener noreferrer"
                className="group flex items-center gap-4 p-5 rounded-2xl border border-violet-500/30 bg-gradient-to-r from-violet-600/20 to-purple-600/10 hover:from-violet-600/30 hover:to-purple-600/20 hover:border-violet-500/50 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-[0_0_15px_rgba(139,92,246,0.4)]">
                  <img src="/telegram.png" alt="Telegram" className="w-6 h-6 object-contain" />
                </div>
                <div>
                  <span className="text-base text-violet-300 uppercase tracking-wider block mb-1">Написать в TG</span>
                  <span className="text-xl font-semibold text-white group-hover:text-violet-300 transition-colors">@rodya_designer</span>
                </div>
                <svg className="w-5 h-5 text-violet-400 ml-auto group-hover:translate-x-1 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>

              <a 
                href="https://funpay.com/users/15205864/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group flex items-center gap-4 p-5 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-violet-500/30 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-violet-500/20 flex items-center justify-center text-violet-400 text-xl font-bold">
                  FP
                </div>
                <div>
                  <span className="text-base text-white/70 uppercase tracking-wider block mb-1">Написать в Funpay</span>
                  <span className="text-xl font-semibold group-hover:text-violet-400 transition-colors">VOID VISUAL</span>
                </div>
                <svg className="w-5 h-5 text-white/40 ml-auto group-hover:translate-x-1 group-hover:text-violet-400 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>

            <div className="p-6 rounded-2xl bg-gradient-to-br from-violet-500/10 to-purple-500/10 border border-violet-500/20">
              <h3 className="text-xl font-semibold mb-4 text-white">Почему выбирают нас</h3>
              <ul className="space-y-3 text-base text-white/70">
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-violet-500 shadow-[0_0_8px_rgba(139,92,246,0.6)]" />
                  Делаем визуал, который продаёт
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-violet-500 shadow-[0_0_8px_rgba(139,92,246,0.6)]" />
                  Знаем каждую платформу изнутри
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-violet-500 shadow-[0_0_8px_rgba(139,92,246,0.6)]" />
                  Один подрядчик для всех площадок
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-violet-500 shadow-[0_0_8px_rgba(139,92,246,0.6)]" />
                  Срок от 24 часов
                </li>
              </ul>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-xs text-white/50 uppercase tracking-wider block mb-2">Ваше имя</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Как к вам обращаться"
                className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 focus:border-violet-500/50 focus:bg-white/10 transition-all outline-none placeholder:text-white/30"
              />
            </div>

            <div>
              <label className="text-xs text-white/50 uppercase tracking-wider block mb-2">Telegram username</label>
              <input
                type="text"
                value={formData.telegram}
                onChange={(e) => setFormData({ ...formData, telegram: e.target.value })}
                placeholder="@username"
                className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 focus:border-violet-500/50 focus:bg-white/10 transition-all outline-none placeholder:text-white/30"
              />
            </div>

            <div>
              <label className="text-xs text-white/50 uppercase tracking-wider block mb-2">Сообщение <span className="text-white/30">(необязательно)</span></label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Расскажите о задаче..."
                rows={4}
                className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 focus:border-violet-500/50 focus:bg-white/10 transition-all outline-none resize-none placeholder:text-white/30"
              />
            </div>

            <button
              type="submit"
              disabled={!formData.name || !formData.telegram}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 font-medium hover:from-violet-500 hover:to-purple-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Отправить заявку
            </button>
          </form>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-20 pt-8 border-t border-white/10">
          <div className="flex items-center gap-3">
            <img src="/лого.png" alt="VOID VISUAL" className="h-8 w-auto opacity-60" />
          </div>
          
          <p className="text-sm text-white/40">
            © VOID VISUAL — 2026
          </p>
        </div>
      </div>
    </footer>
  )
}
