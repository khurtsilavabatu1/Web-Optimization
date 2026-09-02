import { useState } from 'react'

function Newsletter() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (email) {
      setSubmitted(true)
      setTimeout(() => {
        setSubmitted(false)
        setEmail('')
      }, 3000)
    }
  }

  return (
    <section className="newsletter" id="newsletter">
      <div className="newsletter-container">
        <h2 className="newsletter-title">გამოიწერეთ სიახლეები</h2>
        <p className="newsletter-description">
          მიიღეთ უახლესი სტატიები და სიახლეები პირდაპირ თქვენს ელ-ფოსტაზე
        </p>

        {submitted ? (
          <div className="newsletter-success">
            გმადლობთ გამოწერისთვის!
          </div>
        ) : (
          <form className="newsletter-form" onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="თქვენი ელ-ფოსტა"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="newsletter-input"
              required
            />
            <button type="submit" className="btn btn-primary">
              გამოწერა
            </button>
          </form>
        )}
      </div>
    </section>
  )
}

export default Newsletter
