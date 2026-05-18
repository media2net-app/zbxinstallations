import { Link } from 'react-router-dom'
import GoogleRatingBadge from './GoogleRatingBadge'
import GoogleReviews from './GoogleReviews'
import { siteImages } from './googleData'

function HomePage({ t }) {
  const home = t.home

  return (
    <main>
      <section className="hero hero-handyman">
        <img
          className="hero-bg"
          src={siteImages.hero}
          alt={home.heroAlt}
          loading="eager"
        />
        <div className="hero-overlay"></div>
        <div className="hero-inner">
          <div className="hero-panel">
            <p className="hero-kicker">{home.heroKicker}</p>
            <GoogleRatingBadge t={t} variant="hero" />
            <h1>{home.heroTitle}</h1>
            <p className="hero-copy">{home.heroCopy}</p>
            <div className="hero-actions">
              <a className="button button-primary" href="tel:+40741064138">
                {home.heroCtaPrimary}
              </a>
              <Link className="button button-ghost" to="/servicii">
                {home.heroCtaSecondary}
              </Link>
            </div>
            <div className="hero-badges">
              {home.badges.map((badge) => (
                <span key={badge}>{badge}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <GoogleReviews t={t} />

      <section className="section-slab section-dark">
        <p className="eyebrow">{home.introKicker}</p>
        <h2>{home.introTitle}</h2>
        <p className="section-intro">{home.introText}</p>
      </section>

      <section className="services-grid-visual">
        {home.serviceCards.map((card, index) => (
          <article key={card.title} className="visual-card">
            <img src={siteImages.serviceCards[index]} alt={card.title} loading="lazy" />
            <div className="visual-card-body">
              <h3>{card.title}</h3>
              <p>{card.text}</p>
              <Link to="/servicii">{home.servicesReadMore}</Link>
            </div>
          </article>
        ))}
      </section>

      <section className="trust-split">
        <div className="trust-copy">
          <p className="eyebrow">{home.trustKicker}</p>
          <h2>{home.trustTitle}</h2>
          <p>{home.trustText}</p>
          <ul>
            {home.trustPoints.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
          <Link className="button button-primary" to="/despre-noi">
            {home.trustCta}
          </Link>
        </div>
        <img src={siteImages.trust} alt={home.trustImageAlt} loading="lazy" />
      </section>

      <section className="skills-strip section-dark">
        {home.skills.map((skill) => (
          <article key={skill.title}>
            <h3>{skill.title}</h3>
            <p>{skill.text}</p>
          </article>
        ))}
      </section>
    </main>
  )
}

export default HomePage
