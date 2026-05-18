import { googleBusiness } from './googleData'

function StarRow({ rating = 5, size = 'md' }) {
  return (
    <div className={`google-stars google-stars-${size}`} aria-label={`${rating} stele`}>
      {Array.from({ length: 5 }, (_, index) => (
        <span key={index} className={index < rating ? 'star filled' : 'star'}>
          ★
        </span>
      ))}
    </div>
  )
}

function GoogleReviews({ t }) {
  const copy = t.home.googleReviews
  const { mapsUrl, rating, reviewCount, reviews, name } = googleBusiness
  const score = rating ?? 5
  const count = reviewCount ?? 9
  const hasTextReviews = reviews.length > 0
  const showcaseCount = hasTextReviews ? reviews.length : count

  return (
    <section className="google-reviews-showcase section-dark" id="recenzii-google">
      <div className="google-reviews-hero">
        <p className="eyebrow">{copy.kicker}</p>
        <div className="google-score-block">
          <span className="google-score-number">{score.toFixed(1).replace('.', ',')}</span>
          <StarRow rating={5} size="xl" />
          <p className="google-score-meta">
            <strong>{count}</strong> {copy.fiveStarLabel}
          </p>
          <p className="google-score-brand">{name}</p>
        </div>
        <a
          className="button button-primary google-reviews-cta"
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          {copy.viewOnGoogle}
        </a>
      </div>

      {hasTextReviews ? (
        <div className="reviews-grid reviews-grid-full">
          {reviews.map((review) => (
            <article key={`${review.author}-${review.text.slice(0, 24)}`} className="review-card">
              <StarRow rating={review.rating ?? 5} size="sm" />
              <p className="review-text">“{review.text}”</p>
              <footer>
                <strong>{review.author}</strong>
                {review.date && <span>{review.date}</span>}
              </footer>
            </article>
          ))}
        </div>
      ) : (
        <div className="reviews-five-star-grid" aria-label={copy.gridAria.replace('{count}', String(count))}>
          {Array.from({ length: showcaseCount }, (_, index) => (
            <article key={index} className="review-star-tile">
              <StarRow rating={5} size="md" />
              <span>{copy.verifiedLabel}</span>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}

export default GoogleReviews
