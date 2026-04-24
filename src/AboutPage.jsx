import { Link } from 'react-router-dom'

function AboutPage({ t }) {
  const about = t.aboutPage

  return (
    <main>
      <section className="about about-page">
        <div>
          <p className="eyebrow">{about.kicker}</p>
          <h2>{about.title}</h2>
          <p>{about.copy}</p>
        </div>
        <ul>
          {about.bullets.map((bullet) => (
            <li key={bullet}>{bullet}</li>
          ))}
        </ul>
      </section>
      <section className="services">
        <div className="section-head">
          <p className="eyebrow">{about.processKicker}</p>
          <h2>{about.processTitle}</h2>
        </div>
        <div className="service-grid">
          {about.steps.map((step) => (
            <article key={step.title} className="service-card">
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </article>
          ))}
        </div>
        <div className="page-actions">
          <Link className="button button-ghost" to="/contact">
            {about.cta}
          </Link>
        </div>
      </section>
    </main>
  )
}

export default AboutPage
