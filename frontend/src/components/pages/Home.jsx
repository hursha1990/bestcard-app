import { Link } from "react-router-dom";
import Button from "../common/Button";

const Home = () => {
  return (
    <main className="home-hero">
      <div className="hero-inner">
        <div className="hero-col hero-left">
          <blockquote className="message">
            <p>
              "BestCard is a smart credit card comparison tool designed to help
              users find their ideal card based on spending habits, lifestyle,
              and goals."
            </p>
          </blockquote>
        </div>

        <div className="hero-col hero-center">
          <h1>
            <span className="no-wrap">
              Stop guessing. <span className="accent">Start earning.</span>
            </span>
          </h1>

          <p className="lead">
            BestCard recommends the best credit card for your spending and keeps
            your data private.
          </p>

          <Link to="/signup">
            <Button className="btn-primary">Sign Up</Button>
          </Link>

          <img
            src="/images/bestcard.png"
            alt="BestCard"
            className="hero-image"
          />
        </div>

        <div className="hero-col hero-right">
          <blockquote className="message">
            <p>
              "With BestCard, choosing the right card is no longer a guessing
              game—it's data-driven and simple.."
            </p>
          </blockquote>
        </div>
      </div>
    </main>
  );
};

export default Home;
