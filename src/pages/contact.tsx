/**
 * Contact Us Page
 * Route: /contact
 * Displays contact information and inquiry form
 */

import Head from "next/head";
import { useState } from "react";
import PhoneInput, { parsePhoneNumber } from "react-phone-number-input";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    companyName: "",
    email: "",
    mobile: "",
    subject: "",
    message: "",
  });
  const [phoneValue, setPhoneValue] = useState<string>("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error">(
    "success"
  );

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    // Email validation - enhanced
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else {
      // More strict email validation
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = "Please enter a valid email address";
      } else {
        // Check for common typos
        const domain = formData.email.split("@")[1];
        if (domain && domain.includes("..")) {
          newErrors.email = "Email contains invalid characters";
        }
      }
    }

    // Phone validation - Country Code + valid phone number
    if (!phoneValue || phoneValue.trim() === "") {
      newErrors.mobile = "Phone number is required";
    } else {
      try {
        // Use the library's parse function to properly extract country code and national number
        const parsedPhone = parsePhoneNumber(phoneValue);

        if (!parsedPhone) {
          newErrors.mobile = "Please enter a valid phone number";
        } else if (!parsedPhone.isValid()) {
          // Check if the phone number is valid according to the selected country's format
          newErrors.mobile =
            "Please enter a valid phone number for the selected country";
        }
      } catch (error) {
        newErrors.mobile = "Please enter a valid phone number";
      }
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage("");

    try {
      // Web3Forms Configuration
      const WEB3FORMS_ACCESS_KEY = "f58fa71f-75a6-496f-9e10-24983fdc93a3";

      // Prepare form data for Web3Forms
      // Prepare form data for Web3Forms
      const web3FormsData = {
        access_key: WEB3FORMS_ACCESS_KEY,
        name: formData.name,
        email: formData.email,
        phone: phoneValue, // Use the international phone format
        subject: `${formData.subject} - Skyline Marine Inquiry`,
        message: `
Company: ${formData.companyName || "Not provided"}
Phone: ${phoneValue}
Product: "General Inquiry"

Message:
${formData.message}

---
Submitted via Skyline Marine website
        `.trim(),
        from_name: formData.name,
        replyto: formData.email,
        // Disable redirect
        redirect: "false",
        // Add botcheck field (honeypot) - keep it empty
        botcheck: "",
      };

      // Send to Web3Forms API
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(web3FormsData),
      });

      const result = await response.json();

      if (result.success) {
        setMessageType("success");
        setSubmitMessage(
          "Message sent successfully! We'll get back to you soon."
        );

        // Reset form after successful submission
        setFormData({
          name: "",
          companyName: "",
          email: "",
          mobile: "",
          subject: "",
          message: "",
        });
        setPhoneValue("");
        setErrors({});

        // Clear success message after 5 seconds
        setTimeout(() => {
          setSubmitMessage("");
        }, 5000);
      } else {
        // Handle specific error messages
        const errorMessage = result.message || "Submission failed";
        console.error("Web3Forms Error:", errorMessage);
        setMessageType("error");
        setSubmitMessage(
          `Unable to send message: ${errorMessage}. Please try again or contact us directly at skylinemarine1993@gmail.com`
        );
      }
    } catch (error) {
      console.error("Error sending inquiry via Web3Forms:", error);
      setMessageType("error");
      setSubmitMessage(
        "Failed to send message. Please try again or contact us directly at skylinemarine1993@gmail.com"
      );
    } finally {
      setIsSubmitting(false);
    }
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
          {/* Page Header */}
          <div className="contact-page__header">
            <h1 className="contact-page__title">
              Get In Touch{" "}
              <span className="contact-page__title--highlight">With Us</span>
            </h1>
            <p className="contact-page__subtitle">
              Want to know more about Product? give us call email or just fill
              the Form
            </p>
          </div>

          {/* Main Content Grid */}
          <div className="contact-page__content">
            {/* Left Side - Contact Info */}
            <div className="contact-page__info">
              {/* Office */}
              <div className="contact-page__info-item">
                <div className="contact-page__info-icon contact-page__info-icon--office">
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <line x1="9" y1="3" x2="9" y2="21" />
                  </svg>
                </div>
                <h3 className="contact-page__info-title">Office</h3>
                <p className="contact-page__info-text">
                  VIP (Vibrant Industrial Park), Bhavnagar, Gujarat, India,
                  364001.
                </p>
              </div>

              {/* Open Hours */}
              <div className="contact-page__info-item">
                <div className="contact-page__info-icon contact-page__info-icon--hours">
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                </div>
                <h3 className="contact-page__info-title">Open Hours</h3>
                <p className="contact-page__info-text">
                  Everyday:
                  <br />
                  10 am to 9 pm IST
                </p>
              </div>

              {/* Call Us */}
              <div className="contact-page__info-item">
                <div className="contact-page__info-icon contact-page__info-icon--phone">
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
                <h3 className="contact-page__info-title">Call Us</h3>
                <p className="contact-page__info-text">
                  Call Us Now
                  <br />
                  <a href="tel:+917016439122">+91 70164 39122</a>
                </p>
              </div>

              {/* Email Us */}
              <div className="contact-page__info-item">
                <div className="contact-page__info-icon contact-page__info-icon--email">
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </div>
                <h3 className="contact-page__info-title">Email Us</h3>
                <p className="contact-page__info-text">
                  Need Help?
                  <br />
                  <a href="mailto:info@skylinemarine.co">
                    info@skylinemarine.co
                  </a>
                </p>
              </div>
            </div>

            {/* Right Side - Contact Form */}
            <div className="contact-page__form-wrapper">
              <form className="contact-page__form" onSubmit={handleSubmit}>
                {/* Name */}
                <div className="contact-page__form-group">
                  <label htmlFor="name" className="contact-page__form-label">
                    Name <span className="inquiry-popup__required">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Your Name"
                    className={`contact-page__form-input ${
                      errors.name ? "contact-page__form-input--error" : ""
                    }`}
                  />
                  {errors.name && (
                    <span className="contact-page__form-error">
                      {errors.name}
                    </span>
                  )}
                </div>

                {/* Company Name */}
                <div className="contact-page__form-group">
                  <label
                    htmlFor="companyName"
                    className="contact-page__form-label"
                  >
                    Company Name
                  </label>
                  <input
                    type="text"
                    id="companyName"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    placeholder="PVT. LTD."
                    className="contact-page__form-input"
                  />
                </div>

                {/* Email and Mobile Row */}
                <div className="contact-page__form-row">
                  <div className="contact-page__form-group">
                    <label htmlFor="email" className="contact-page__form-label">
                      Email <span className="inquiry-popup__required">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Email"
                      className={`contact-page__form-input ${
                        errors.email ? "contact-page__form-input--error" : ""
                      }`}
                    />
                    {errors.email && (
                      <span className="contact-page__form-error">
                        {errors.email}
                      </span>
                    )}
                  </div>

                  <div className="contact-page__form-group">
                    <label
                      htmlFor="mobile"
                      className="contact-page__form-label"
                    >
                      Mobile <span className="inquiry-popup__required">*</span>
                    </label>
                    <PhoneInput
                      international
                      defaultCountry="IN"
                      value={phoneValue}
                      onChange={(value: string | undefined) => {
                        // Always update the value - let validation handle correctness
                        setPhoneValue(value || "");
                        // Clear error when user starts typing
                        if (errors.mobile) {
                          setErrors((prev) => ({ ...prev, mobile: "" }));
                        }
                      }}
                      placeholder="Enter phone number"
                      className={`contact-page__form-phone-input ${
                        errors.mobile ? "contact-page__form-input--error" : ""
                      }`}
                    />
                    {errors.mobile && (
                      <span className="contact-page__form-error">
                        {errors.mobile}
                      </span>
                    )}
                  </div>
                </div>

                {/* Subject */}
                <div className="contact-page__form-group">
                  <label htmlFor="subject" className="contact-page__form-label">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder=""
                    className="contact-page__form-input"
                  />
                </div>

                {/* Message */}
                <div className="contact-page__form-group">
                  <label htmlFor="message" className="contact-page__form-label">
                    Message <span className="inquiry-popup__required">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Message"
                    rows={5}
                    className={`contact-page__form-textarea ${
                      errors.message ? "contact-page__form-input--error" : ""
                    }`}
                  />
                  {errors.message && (
                    <span className="contact-page__form-error">
                      {errors.message}
                    </span>
                  )}
                </div>

                {/* Honeypot field - hidden from users, helps prevent spam */}
                <input
                  type="checkbox"
                  name="botcheck"
                  style={{ display: "none" }}
                  tabIndex={-1}
                  autoComplete="off"
                />

                {/* Submit Button */}
                <button
                  type="submit"
                  className="contact-page__form-submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "SENDING..." : "SEND"}
                </button>

                {/* Submit Message */}
                {submitMessage && (
                  <p className={`contact-page__form-message ${messageType}`}>
                    {submitMessage}
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
