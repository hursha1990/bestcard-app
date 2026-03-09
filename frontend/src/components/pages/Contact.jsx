import React, { useState, useRef } from "react";
import Button from "../common/Button";

const Contact = () => {
  const [sent, setSent] = useState(false);
  const formRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // show confirmation message and reset form fields
    setSent(true);
    formRef.current?.reset();
    // hide message after a short delay
    setTimeout(() => setSent(false), 3500);
  };

  return (
    <main>
      <h2>Contact Us</h2>
      <p>
        We'd love to hear from you! Whether you have questions, feedback, or
        partnership inquiries, reach out anytime.
      </p>

      <form ref={formRef} onSubmit={handleSubmit}>
        <label>Your Name:</label>
        <input type="text" name="name" placeholder="Enter your name" />

        <label>Your Email:</label>
        <input type="email" name="email" placeholder="Enter your email" />

        <label>Message:</label>
        <textarea name="message" placeholder="Type your message here..."></textarea>
        <Button className="btn-primary" type="submit">Send Message</Button>
      </form>

      {/* Live region for screen readers and visual confirmation */}
      {sent && (
        <div className="success-text" role="status" aria-live="polite">
          Your response has been sent
        </div>
      )}

      <section>
        <p>
          <strong>Email:</strong> support@bestcard.com
        </p>
        <p>
          <strong>Phone:</strong> (636) 515-4567
        </p>
        <p>
          <strong>FaceBook:</strong> Facebook/bestcard.com
        </p>
        <p>
          <strong>Instagram:</strong> Bestcard$
        </p>
      </section>
    </main>
  );
};

export default Contact;
