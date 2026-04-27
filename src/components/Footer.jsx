import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLanguage } from '../context/LanguageContext'

gsap.registerPlugin(ScrollTrigger)

export default function Footer() {
  const sectionRef = useRef()
  const titleRef = useRef()
  const [formData, setFormData] = useState({ name: '', telegram: '', message: '' })
  const { copy } = useLanguage()

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
  }, [copy.footer.titleBottom])

  const handleSubmit = (event) => {
    event.preventDefault()

    let message = copy.footer.telegramMessage
    if (formData.message) message += formData.message

    const encodedMessage = encodeURIComponent(message)
    window.open(`https://t.me/rodya_designer?text=${encodedMessage}`, '_blank')
  }

  return (
    <footer id="contact" ref={sectionRef} className="relative py-24 lg:py-32 overflow-hidden border-t border-white/5">
      <div className="absolute inset-0 z-0 pointer-events-none" style={{ backgroundColor: '#080810' }} />
      <div
        className="absolute top-0 left-0 w-full h-[500px] z-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(139,92,246,0.08) 0%, transparent 70%)' }}
      />
      <div
        className="absolute bottom-0 left-0 w-[500px] h-[500px] z-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 50% 50% at 0% 100%, rgba(139,92,246,0.12) 0%, transparent 70%)' }}
      />
      <div
        className="absolute bottom-0 right-0 w-[500px] h-[500px] z-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 50% 50% at 100% 100%, rgba(109,40,217,0.12) 0%, transparent 70%)' }}
      />
      <div
        className="absolute inset-0 z-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(139,92,246,0.8) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={titleRef} className="mb-16 lg:mb-20 text-center">
          <h2 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight leading-none">
            {copy.footer.titleTop}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-purple-500">
              {copy.footer.titleAccent}
            </span>
          </h2>
          <h2 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight leading-none mt-2">
            {copy.footer.titleBottom}
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 max-w-5xl mx-auto">
          <div className="space-y-8">
            <div className="flex flex-col gap-4">
              <a
                href="https://t.me/rodya_designer"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 p-5 rounded-2xl border border-violet-500/30 bg-gradient-to-r from-violet-600/20 to-purple-600/10 hover:from-violet-600/30 hover:to-purple-600/20 hover:border-violet-500/50 transition-all duration-300 backdrop-blur-sm"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-[0_0_15px_rgba(139,92,246,0.4)]">
                  <img src="/telegram.png" alt="Telegram" className="w-6 h-6 object-contain" />
                </div>
                <div>
                  <span className="text-base text-violet-300 uppercase tracking-wider block mb-1">{copy.footer.telegramLabel}</span>
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
                className="group flex items-center gap-4 p-5 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-violet-500/30 transition-all duration-300 backdrop-blur-sm"
              >
                <div className="w-12 h-12 rounded-xl bg-violet-500/20 flex items-center justify-center text-violet-400 text-xl font-bold">
                  FP
                </div>
                <div>
                  <span className="text-base text-white/70 uppercase tracking-wider block mb-1">{copy.footer.funpayLabel}</span>
                  <span className="text-xl font-semibold group-hover:text-violet-400 transition-colors">waydamn</span>
                </div>
                <svg className="w-5 h-5 text-white/40 ml-auto group-hover:translate-x-1 group-hover:text-violet-400 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>

            <div className="p-6 rounded-2xl bg-gradient-to-br from-violet-500/10 to-purple-500/10 border border-violet-500/20 backdrop-blur-sm">
              <h3 className="text-xl font-semibold mb-4 text-white">{copy.footer.whyTitle}</h3>
              <ul className="space-y-3 text-base text-white/70">
                {copy.footer.whyItems.map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-violet-500 shadow-[0_0_8px_rgba(139,92,246,0.6)]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
            <div>
              <label className="text-xs text-white/50 uppercase tracking-wider block mb-2">{copy.footer.form.nameLabel}</label>
              <input
                type="text"
                value={formData.name}
                onChange={(event) => setFormData({ ...formData, name: event.target.value })}
                placeholder={copy.footer.form.namePlaceholder}
                className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 focus:border-violet-500/50 focus:bg-white/10 transition-all outline-none placeholder:text-white/30 backdrop-blur-sm"
              />
            </div>

            <div>
              <label className="text-xs text-white/50 uppercase tracking-wider block mb-2">{copy.footer.form.telegramLabel}</label>
              <input
                type="text"
                value={formData.telegram}
                onChange={(event) => setFormData({ ...formData, telegram: event.target.value })}
                placeholder={copy.footer.form.telegramPlaceholder}
                className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 focus:border-violet-500/50 focus:bg-white/10 transition-all outline-none placeholder:text-white/30 backdrop-blur-sm"
              />
            </div>

            <div>
              <label className="text-xs text-white/50 uppercase tracking-wider block mb-2">
                {copy.footer.form.messageLabel} <span className="text-white/30">{copy.footer.form.messageOptional}</span>
              </label>
              <textarea
                value={formData.message}
                onChange={(event) => setFormData({ ...formData, message: event.target.value })}
                placeholder={copy.footer.form.messagePlaceholder}
                rows={4}
                className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 focus:border-violet-500/50 focus:bg-white/10 transition-all outline-none resize-none placeholder:text-white/30 backdrop-blur-sm"
              />
            </div>

            <button
              type="submit"
              disabled={!formData.name || !formData.telegram}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 font-medium hover:from-violet-500 hover:to-purple-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:shadow-[0_0_30px_rgba(139,92,246,0.5)] cursor-pointer"
            >
              {copy.footer.form.submit}
            </button>
          </form>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-20 pt-8 border-t border-white/10">
          <div className="flex items-center gap-3">
            <img src="/лого.png" alt="VOID VISUAL" className="h-8 w-auto opacity-60" />
          </div>

          <p className="text-sm text-white/40">{copy.footer.copyright}</p>
        </div>
      </div>
    </footer>
  )
}
