import { useLanguage } from '../context/LanguageContext'
import BackgroundWordmark from '../components/BackgroundWordmark'

export default function Process() {
  const { copy } = useLanguage()

  return (
    <section className="process-section">
      <BackgroundWordmark word="VOID" className="section-wordmark section-wordmark-primary" />
      <BackgroundWordmark word="METHOD" className="section-wordmark section-wordmark-secondary" />
      <div className="content-container">
        <header className="process-header">
          <span>{copy.process.label}</span>
          <h2>{copy.process.title}</h2>
        </header>

        <ol className="process-list">
          {copy.process.steps.map((step) => (
            <li
              key={step.number}
              className="process-step"
              style={{ '--step-accent': step.color }}
            >
              <span className="process-number">{step.number}</span>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
