import { googleBusiness } from './googleData'

function StarRow({ size = 'md' }) {
  return (
    <div className={`google-stars google-stars-${size}`} aria-hidden="true">
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} className="star filled">
          ★
        </span>
      ))}
    </div>
  )
}

function GoogleRatingBadge({ t, variant = 'hero' }) {
  const copy = t.home.googleRating
  const { rating, reviewCount, mapsUrl } = googleBusiness
  const score = rating ?? 5
  const count = reviewCount ?? 9

  return (
    <a
      className={`google-rating-badge google-rating-badge-${variant}`}
      href={mapsUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${score} ${copy.starsLabel}, ${count} ${copy.reviewsLabel}`}
    >
      <span className="google-rating-source">{copy.source}</span>
      <span className="google-rating-score">{score.toFixed(1).replace('.', ',')}</span>
      <StarRow size={variant === 'hero' ? 'lg' : 'md'} />
      <span className="google-rating-count">
        ({count}) {copy.reviewsLabel}
      </span>
    </a>
  )
}

export default GoogleRatingBadge
