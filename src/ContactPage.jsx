import { useState } from 'react'

function ContactPage({ t }) {
  const contact = t.contactPage
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
    const body = [
      `${home.form.firstName}: ${quoteForm.firstName}`,
      `${home.form.lastName}: ${quoteForm.lastName}`,
      `${home.form.email}: ${quoteForm.email}`,
      `${home.form.phone}: ${quoteForm.phone}`,
      '',
      `${home.form.message}:`,
      quoteForm.message,
      '',
      'Source: Contact page quote form',
      `Name: ${fullName}`,
    ].join('\n')

    window.location.href = `mailto:contact@zbxinstallations.com?subject=${encodeURIComponent(home.quoteMailSubject)}&body=${encodeURIComponent(body)}`
  }

  return (
    <main>
      <section className="contact contact-page">
        <div>
          <p className="eyebrow">{contact.kicker}</p>
          <h2>{contact.title}</h2>
          <p>{contact.copy}</p>
          <p className="contact-note">{contact.note}</p>
        </div>
        <div className="contact-card">
          <p>
            <strong>{contact.labels.phone}</strong>{' '}
            <a className="phone-link" href="tel:+40741064138">
              +40 741 064 138
            </a>
          </p>
          <p>
            <strong>{contact.labels.email}</strong> contact@zbxinstallations.com
          </p>
          <p>
            <strong>{contact.labels.address}</strong> B-dul Tudor Vladimirescu Nr. 41,
            Bucuresti
          </p>
          <a className="button button-primary" href="mailto:contact@zbxinstallations.com">
            {contact.button}
          </a>
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

export default ContactPage
