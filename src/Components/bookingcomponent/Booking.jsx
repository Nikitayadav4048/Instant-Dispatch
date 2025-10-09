import "./booking.css"

const Booking = () => {
  return (
    <>
      <div className="booking-hero">
        <div className="hero-content">
          <div className="hero-badge">
            <i className="fas fa-shipping-fast"></i>
            <span>Fast & Reliable</span>
          </div>
          <h1 className="hero-title">
            Book Your <span className="highlight">Instant</span> Delivery
          </h1>
          <p className="hero-description">
            Send packages across the city with our smart delivery network. 
            Track in real-time, pay securely, and get delivered fast.
          </p>
          <div className="hero-features">
            <div className="feature-item">
              <i className="fas fa-clock"></i>
              <span>Same Day Delivery</span>
            </div>
            <div className="feature-item">
              <i className="fas fa-shield-alt"></i>
              <span>Secure & Insured</span>
            </div>
            <div className="feature-item">
              <i className="fas fa-map-marked-alt"></i>
              <span>Real-time Tracking</span>
            </div>
          </div>
        </div>
        <div className="hero-visual">
          <div className="delivery-animation">
            <div className="delivery-truck">
              <i className="fas fa-truck"></i>
            </div>
            <div className="delivery-path"></div>
            <div className="delivery-points">
              <div className="point start">A</div>
              <div className="point end">B</div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Booking;
