import { Link } from 'react-router-dom'

function ServicesPage({ t }) {
  return (
    <main>
      <section className="services">
        <div className="section-head">
          <p className="eyebrow">{t.servicesPage.kicker}</p>
          <h2>{t.servicesPage.title}</h2>
        </div>
        <div className="service-grid">
          {t.servicesData.map((service) => (
            <article key={service.title} className="service-card">
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </article>
          ))}
        </div>
        <div className="page-actions">
          <a className="button button-primary" href="tel:+40741064138">
            {t.servicesPage.cta}
          </a>
        </div>
      </section>
    </main>
  )
}

export default ServicesPage
