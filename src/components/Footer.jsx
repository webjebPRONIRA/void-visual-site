import { useState } from 'react'
import { useLanguage } from '../context/LanguageContext'
import BackgroundWordmark from './BackgroundWordmark'

function LinkArrow() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
      <path d="M7 17 17 7M8 7h9v9" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function ServiceIcon({ service }) {
  if (service === 'telegram') {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
        <path d="M21.3 3.1 18.2 18.8c-.23 1.11-.86 1.38-1.75.86l-4.8-3.55-2.32 2.24c-.26.26-.47.47-.97.47l.35-4.9 8.9-8.05c.39-.35-.08-.54-.6-.2L6 12.6l-4.74-1.48c-1.03-.32-1.05-1.03.22-1.53L20 2.46c.86-.31 1.61.2 1.3.64Z" fill="currentColor" />
      </svg>
    )
  }

  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
      <path d="M6.5 4.5h11v4h-6.6v2.8h5.8v3.8h-5.8v4.4H6.5v-15Z" fill="currentColor" />
    </svg>
  )
}

export default function Footer() {
  const [formData, setFormData] = useState({ name: '', telegram: '', message: '' })
  const { copy } = useLanguage()

  const handleSubmit = (event) => {
    event.preventDefault()

    let message = `${copy.footer.telegramMessage}${copy.footer.form.nameLabel}: ${formData.name}\n${copy.footer.form.telegramLabel}: ${formData.telegram}\n`
    if (formData.message) message += `${copy.footer.form.messageLabel}: ${formData.message}`

    window.open(`https://t.me/rodya_designer?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer')
  }

  return (
    <footer id="contact" className="site-footer">
      <BackgroundWordmark word="VOID" className="section-wordmark section-wordmark-primary" />
      <BackgroundWordmark word="CONTACT" className="section-wordmark section-wordmark-secondary" />
      <div className="content-container">
        <header className="footer-heading">
          <h2>
            {copy.footer.titleTop}{' '}
            <span>{copy.footer.titleAccent}</span><br />
            {copy.footer.titleBottom}
          </h2>
        </header>

        <div className="footer-grid">
          <div className="contact-column">
            <div className="contact-links">
              <a className="contact-card contact-card-telegram" href="https://t.me/rodya_designer" target="_blank" rel="noopener noreferrer">
                <span className="contact-service-icon"><ServiceIcon service="telegram" /></span>
                <span className="contact-link-content">
                  <span className="contact-link-label">{copy.footer.telegramLabel}</span>
                  <strong>@rodya_designer</strong>
                </span>
                <span className="contact-link-action"><LinkArrow /></span>
              </a>

              <a className="contact-card contact-card-funpay" href="https://funpay.com/users/15205864/" target="_blank" rel="noopener noreferrer">
                <span className="contact-service-icon"><ServiceIcon service="funpay" /></span>
                <span className="contact-link-content">
                  <span className="contact-link-label">{copy.footer.funpayLabel}</span>
                  <strong>waydamn</strong>
                </span>
                <span className="contact-link-action"><LinkArrow /></span>
              </a>
            </div>

            <div className="why-us">
              <h3>{copy.footer.whyTitle}</h3>
              <ul>
                {copy.footer.whyItems.map((item, index) => (
                  <li key={item}><span>{String(index + 1).padStart(2, '0')}</span>{item}</li>
                ))}
              </ul>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="contact-form">
            <div className="field">
              <label htmlFor="contact-name">{copy.footer.form.nameLabel}</label>
              <input
                id="contact-name"
                type="text"
                value={formData.name}
                onChange={(event) => setFormData({ ...formData, name: event.target.value })}
                placeholder={copy.footer.form.namePlaceholder}
                autoComplete="name"
                required
              />
            </div>

            <div className="field">
              <label htmlFor="contact-telegram">{copy.footer.form.telegramLabel}</label>
              <input
                id="contact-telegram"
                type="text"
                value={formData.telegram}
                onChange={(event) => setFormData({ ...formData, telegram: event.target.value })}
                placeholder={copy.footer.form.telegramPlaceholder}
                autoComplete="off"
                required
              />
            </div>

            <div className="field">
              <label htmlFor="contact-message">
                {copy.footer.form.messageLabel} <span>{copy.footer.form.messageOptional}</span>
              </label>
              <textarea
                id="contact-message"
                value={formData.message}
                onChange={(event) => setFormData({ ...formData, message: event.target.value })}
                placeholder={copy.footer.form.messagePlaceholder}
                rows="4"
              />
            </div>

            <button type="submit" className="button contact-submit" disabled={!formData.name || !formData.telegram}>
              {copy.footer.form.submit}
              <LinkArrow />
            </button>
          </form>
        </div>

        <div className="footer-bottom">
          <img src="/лого.png" alt="VOID VISUAL" width="280" height="56" />
          <p>{copy.footer.copyright}</p>
        </div>
      </div>
    </footer>
  )
}
