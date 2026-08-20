function Landing({ goToLogin, goToRegister }) {
  return (
    <div className="landing">
      <nav className="landing-nav">
        <span className="brand-logo">
  <span className="brand-icon">🔍</span> FindIt
</span>
        <div className="landing-nav-buttons">
          <button className="btn-outline" onClick={goToLogin}>Sign In</button>
          <button onClick={goToRegister}>Get Started</button>
        </div>
      </nav>

      <div className="hero">
        <div className="hero-text">
          <h1>Lost something on campus?<br />Someone may have already found it.</h1>
          <p>
            FindIt is a simple lost-and-found board for your campus. Post what you've lost or
            found, browse recent items, and message the right person directly.
          </p>
          <div className="hero-buttons">
            <button onClick={goToRegister}>Get Started</button>
            <button className="btn-outline" onClick={goToLogin}>Sign In</button>
          </div>
        </div>
      </div>

      <div className="features">
        <div className="feature-card">
          <h3>Post in seconds</h3>
          <p>Add a title, category, and location — your post is live instantly.</p>
        </div>
        <div className="feature-card">
          <h3>Search & filter</h3>
          <p>Browse by Lost or Found so you only see what's relevant to you.</p>
        </div>
        <div className="feature-card">
          <h3>Message directly</h3>
          <p>Reach out to whoever posted an item, right from the listing.</p>
        </div>
      </div>
    </div>
  );
}

export default Landing;