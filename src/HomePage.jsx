import { useState } from 'react'
import { Link } from 'react-router-dom'
import heroElectrician from './assets/hero-electrician.png'

const serviceImages = [
  heroElectrician,
  heroElectrician,
  heroElectrician,
  heroElectrician,
]

const newsImages = [
  'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=1000&q=80',
  'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&w=1000&q=80',
  'https://images.unsplash.com/photo-1581094288338-2314dddb7ece?auto=format&fit=crop&w=1000&q=80',
]

function HomePage({ t }) {
  const home = t.home
  const [quoteForm, setQuoteForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
  })

  const onQuoteFieldChange = (event) => {
    const { name, value } = event.target
    setQuoteForm((current) => ({ ...current, [name]: value }))
  }

  const onQuoteSubmit = (event) => {
    event.preventDefault()

    const fullName = `${quoteForm.firstName} ${quoteForm.lastName}`.trim()
    const subject = home.quoteMailSubject
    const body = [
      `${home.form.firstName}: ${quoteForm.firstName}`,
      `${home.form.lastName}: ${quoteForm.lastName}`,
      `${home.form.email}: ${quoteForm.email}`,
      `${home.form.phone}: ${quoteForm.phone}`,
      '',
      `${home.form.message}:`,
      quoteForm.message,
      '',
      'Source: Website quote form',
      `Name: ${fullName}`,
    ].join('\n')

    window.location.href = `mailto:contact@zbxinstallations.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }

  return (
    <main>
      <section className="hero hero-handyman">
        <img
          className="hero-bg"
          src={heroElectrician}
          alt={home.heroAlt}
          loading="eager"
        />
        <div className="hero-overlay"></div>
        <div className="hero-inner">
          <div className="hero-panel">
            <p className="hero-kicker">{home.heroKicker}</p>
            <h1>{home.heroTitle}</h1>
            <p className="hero-copy">{home.heroCopy}</p>
            <div className="hero-actions">
              <Link className="button button-primary" to="/contact">
                {home.heroCtaPrimary}
              </Link>
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

      <section className="section-slab section-dark">
        <p className="eyebrow">{home.introKicker}</p>
        <h2>{home.introTitle}</h2>
        <p className="section-intro">{home.introText}</p>
      </section>

      <section className="services-grid-visual">
        {home.serviceCards.map((card, index) => (
          <article key={card.title} className="visual-card">
            <img src={serviceImages[index]} alt={card.title} loading="lazy" />
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
        <img
          src="https://images.unsplash.com/photo-1542013936693-884638332954?auto=format&fit=crop&w=1200&q=80"
          alt={home.trustImageAlt}
          loading="lazy"
        />
      </section>

      <section className="skills-strip section-dark">
        {home.skills.map((skill) => (
          <article key={skill.title}>
            <h3>{skill.title}</h3>
            <p>{skill.text}</p>
          </article>
        ))}
      </section>

      <section className="testimonial-block">
        <p className="eyebrow">{home.testimonialKicker}</p>
        <h2>{home.testimonialTitle}</h2>
        <p>{home.testimonialText}</p>
        <strong>{home.testimonialAuthor}</strong>
      </section>

      <section className="news-section section-dark">
        <div className="section-head-row">
          <div>
            <p className="eyebrow">{home.newsKicker}</p>
            <h2>{home.newsTitle}</h2>
          </div>
          <Link className="button button-ghost" to="/despre-noi">
            {home.newsCta}
          </Link>
        </div>
        <div className="news-grid">
          {home.newsItems.map((item, index) => (
            <article key={item.title} className="news-card">
              <img src={newsImages[index]} alt={item.title} loading="lazy" />
              <div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="quote-section">
        <div>
          <p className="eyebrow">{home.quoteKicker}</p>
          <h2>{home.quoteTitle}</h2>
          <p>{home.quoteText}</p>
        </div>
        <form className="quote-form" onSubmit={onQuoteSubmit}>
          <input
            type="text"
            name="firstName"
            value={quoteForm.firstName}
            onChange={onQuoteFieldChange}
            placeholder={home.form.firstName}
            required
          />
          <input
            type="text"
            name="lastName"
            value={quoteForm.lastName}
            onChange={onQuoteFieldChange}
            placeholder={home.form.lastName}
            required
          />
          <input
            type="email"
            name="email"
            value={quoteForm.email}
            onChange={onQuoteFieldChange}
            placeholder={home.form.email}
            required
          />
          <input
            type="tel"
            name="phone"
            value={quoteForm.phone}
            onChange={onQuoteFieldChange}
            placeholder={home.form.phone}
            required
          />
          <textarea
            name="message"
            value={quoteForm.message}
            onChange={onQuoteFieldChange}
            placeholder={home.form.message}
            rows="4"
            required
          ></textarea>
          <button type="submit" className="button button-primary">
            {home.quoteButton}
          </button>
        </form>
      </section>
    </main>
  )
}

export default HomePage
