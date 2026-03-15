const About = () => {
  return (
    <div className="auth-page">
      <div className="auth-card auth-card--wide">
        <main>
          <h2>About</h2>

          <p>
            <strong>BestCard</strong> is a modern web application designed to help users make smarter credit card choices.
            We use intelligent algorithms and clean data design to simplify the complex process of finding, comparing,
            and managing credit cards that fit your unique lifestyle and goals.
          </p>

          <h3>Story Behind BestCard</h3>
          <p>
            The idea for BestCard started with a simple question: <em>"Why is finding the right credit card so complicated?"</em>
            We noticed that most comparison sites overwhelm users with jargon, unclear benefits, and ads that prioritize profits over people.
            We decided to change that by building a transparent platform focused on clarity, trust, and personalization.
          </p>

          <h3>Our Mission</h3>
          <p>
            Our mission is to make financial decision-making easy, honest, and personalized.
            BestCard helps users find the card that truly works for them - whether that means earning more rewards,
            improving credit, or unlocking better offers - all in one secure, easy-to-use app.
          </p>

          <h3>Our Vision</h3>
          <p>
            To become the most trusted digital companion for credit card management and rewards optimization -
            empowering users everywhere to make confident financial choices through data-driven insights.
          </p>

          <h3>Core Features</h3>
          <ul>
            <li>Personalized credit card recommendations based on your spending style</li>
            <li>Reward and cashback tracking in one simple dashboard</li>
            <li>Secure card linking with privacy-focused design</li>
            <li>Insights that help you maximize benefits and minimize fees</li>
          </ul>

          <h3>Why BestCard?</h3>
          <p>
            Unlike other financial platforms, BestCard doesn't just compare - it learns.
            Our recommendation system grows smarter over time, analyzing user behavior to provide tailored results that evolve with your lifestyle.
            With transparency, usability, and trust at its core, BestCard helps you <strong>swipe smarter</strong> every time.
          </p>

          <p style={{ marginTop: "2rem", fontStyle: "italic", color: "#555" }}>
            "Smart credit starts with smart choices - and BestCard helps you make them."
          </p>
        </main>
      </div>
    </div>
  );
};

export default About;

