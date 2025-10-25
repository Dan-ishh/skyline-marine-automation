/**
 * Contact Us Page
 * Route: /contact
 * Displays contact information and inquiry form
 */

import Head from "next/head";
import { useUIStore } from "@/src/store";

export default function ContactPage() {
  const { openInquiryModal } = useUIStore();

  const handleInquireClick = () => {
    openInquiryModal();
  };

  return (
    <>
      <Head>
        <title>Contact Us - Skyline Marine Automation</title>
        <meta
          name="description"
          content="Get in touch with Skyline Marine Automation. Contact us for inquiries about marine equipment and products."
        />
      </Head>

      <div className="contact-page">
        <div className="container">
          <h1>Contact Us</h1>

          <div className="contact-content">
            <div className="contact-info">
              <h2>Get In Touch</h2>
              <p>Have questions about our products? We're here to help!</p>

              <div className="contact-details">
                <div className="contact-item">
                  <h3>Email</h3>
                  <p>
                    <a href="mailto:info@skylinemarine.com">
                      info@skylinemarine.com
                    </a>
                  </p>
                </div>

                <div className="contact-item">
                  <h3>Phone</h3>
                  <p>
                    <a href="tel:+1234567890">+1 (234) 567-890</a>
                  </p>
                </div>

                <div className="contact-item">
                  <h3>Address</h3>
                  <p>
                    123 Marine Drive
                    <br />
                    Harbor City, HC 12345
                    <br />
                    United States
                  </p>
                </div>

                <div className="contact-item">
                  <h3>Business Hours</h3>
                  <p>
                    Monday - Friday: 9:00 AM - 6:00 PM
                    <br />
                    Saturday: 10:00 AM - 4:00 PM
                    <br />
                    Sunday: Closed
                  </p>
                </div>
              </div>
            </div>

            <div className="inquiry-section">
              <h2>Send Us an Inquiry</h2>
              <p>
                Interested in a specific product? Fill out our inquiry form and
                we'll get back to you shortly.
              </p>

              <button className="inquire-button" onClick={handleInquireClick}>
                Inquire Now
              </button>
            </div>
          </div>

          {/* Optional: Google Maps embed */}
          {/* <div className="map-container">
            <iframe
              src="https://www.google.com/maps/embed?pb=..."
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div> */}
        </div>
      </div>
    </>
  );
}
