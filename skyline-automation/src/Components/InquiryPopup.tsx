/**
 * InquiryPopup Component
 * Modal form for product inquiries
 */

import { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import { useUIStore } from "@/src/store";

interface InquiryPopupProps {
  productName?: string;
  productBrand?: string;
}

export default function InquiryPopup({
  productName,
  productBrand,
}: InquiryPopupProps) {
  const { isInquiryModalOpen, closeInquiryModal, prefilledData } = useUIStore();
  const [formData, setFormData] = useState({
    name: "",
    companyName: "",
    email: "",
    mobile: "",
    subject: productName || "",
    message: "",
  });
  const [file, setFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Reset form when popup opens
  useEffect(() => {
    if (isInquiryModalOpen && (productName || prefilledData)) {
      setFormData((prev) => ({
        ...prev,
        subject: productName || prefilledData?.productName || "",
      }));
    }
  }, [isInquiryModalOpen, productName, prefilledData]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isInquiryModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isInquiryModalOpen]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.mobile.trim()) {
      newErrors.mobile = "Mobile number is required";
    } else if (!/^[0-9+\-\s()]{10,}$/.test(formData.mobile)) {
      newErrors.mobile = "Please enter a valid mobile number";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // EmailJS Configuration
      // IMPORTANT: Replace these values with your EmailJS credentials
      // 1. Sign up at https://www.emailjs.com/
      // 2. Add an email service (Gmail, Outlook, etc.)
      // 3. Create an email template
      // 4. Get your Public Key, Service ID, and Template ID

      const EMAILJS_SERVICE_ID = "YOUR_SERVICE_ID"; // Replace with your EmailJS Service ID
      const EMAILJS_TEMPLATE_ID = "YOUR_TEMPLATE_ID"; // Replace with your EmailJS Template ID
      const EMAILJS_PUBLIC_KEY = "YOUR_PUBLIC_KEY"; // Replace with your EmailJS Public Key

      // Prepare template parameters
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        company_name: formData.companyName || "N/A",
        mobile: formData.mobile,
        subject: formData.subject,
        message: formData.message,
        to_email: "sales@skylinemarine.co", // Your company email
        product_name: prefilledData?.productName || "General Inquiry",
      };

      // Send email via EmailJS
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      );

      // Show success message
      setSubmitSuccess(true);

      // Reset form and close modal after 2 seconds
      setTimeout(() => {
        closeInquiryModal();
        setSubmitSuccess(false);
        setFormData({
          name: "",
          companyName: "",
          email: "",
          mobile: "",
          subject: "",
          message: "",
        });
        setFile(null);
      }, 2000);
    } catch (error) {
      console.error("Error sending inquiry via EmailJS:", error);
      alert(
        "Failed to send inquiry. Please try again or contact us directly at sales@skylinemarine.co"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isInquiryModalOpen) return null;

  return (
    <div className="inquiry-popup">
      <div className="inquiry-popup__overlay" onClick={closeInquiryModal} />
      <div className="inquiry-popup__modal">
        {/* Close Button */}
        <button
          className="inquiry-popup__close"
          onClick={closeInquiryModal}
          aria-label="Close inquiry form"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* Header */}
        <div className="inquiry-popup__header">
          {productBrand && (
            <div className="inquiry-popup__product-name">{productBrand}</div>
          )}
          <h2 className="inquiry-popup__title">Inquiry</h2>
          <p className="inquiry-popup__subtitle">
            Fill the form below, and We will get back to you ASAP
          </p>
        </div>

        {/* Form */}
        <form className="inquiry-popup__form" onSubmit={handleSubmit}>
          {/* Name */}
          <div className="inquiry-popup__field">
            <label htmlFor="name" className="inquiry-popup__label">
              Name <span className="inquiry-popup__required">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Your Name"
              className={`inquiry-popup__input ${
                errors.name ? "inquiry-popup__input--error" : ""
              }`}
            />
            {errors.name && (
              <span className="inquiry-popup__error">{errors.name}</span>
            )}
          </div>

          {/* Company Name */}
          <div className="inquiry-popup__field">
            <label htmlFor="companyName" className="inquiry-popup__label">
              Company Name
            </label>
            <input
              type="text"
              id="companyName"
              name="companyName"
              value={formData.companyName}
              onChange={handleInputChange}
              placeholder="PVT. LTD."
              className="inquiry-popup__input"
            />
          </div>

          {/* Email and Mobile */}
          <div className="inquiry-popup__row">
            <div className="inquiry-popup__field">
              <label htmlFor="email" className="inquiry-popup__label">
                Email <span className="inquiry-popup__required">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email"
                className={`inquiry-popup__input ${
                  errors.email ? "inquiry-popup__input--error" : ""
                }`}
              />
              {errors.email && (
                <span className="inquiry-popup__error">{errors.email}</span>
              )}
            </div>

            <div className="inquiry-popup__field">
              <label htmlFor="mobile" className="inquiry-popup__label">
                Mobile <span className="inquiry-popup__required">*</span>
              </label>
              <input
                type="tel"
                id="mobile"
                name="mobile"
                value={formData.mobile}
                onChange={handleInputChange}
                placeholder="Mobile Number"
                className={`inquiry-popup__input ${
                  errors.mobile ? "inquiry-popup__input--error" : ""
                }`}
              />
              {errors.mobile && (
                <span className="inquiry-popup__error">{errors.mobile}</span>
              )}
            </div>
          </div>

          {/* Subject */}
          <div className="inquiry-popup__field">
            <label htmlFor="subject" className="inquiry-popup__label">
              Subject
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleInputChange}
              placeholder="Subject"
              className="inquiry-popup__input"
            />
          </div>

          {/* File Upload */}
          <div className="inquiry-popup__field">
            <label htmlFor="file" className="inquiry-popup__label">
              File Upload
            </label>
            <input
              type="file"
              id="file"
              onChange={handleFileChange}
              className="inquiry-popup__file"
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
            />
          </div>

          {/* Message */}
          <div className="inquiry-popup__field">
            <label htmlFor="message" className="inquiry-popup__label">
              Message <span className="inquiry-popup__required">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              placeholder="Message"
              rows={5}
              className={`inquiry-popup__textarea ${
                errors.message ? "inquiry-popup__input--error" : ""
              }`}
            />
            {errors.message && (
              <span className="inquiry-popup__error">{errors.message}</span>
            )}
          </div>

          {/* reCAPTCHA Placeholder */}
          <div className="inquiry-popup__recaptcha">
            <div className="inquiry-popup__recaptcha-box">
              <input type="checkbox" id="recaptcha" required />
              <label htmlFor="recaptcha">I'm not a robot</label>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="inquiry-popup__submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "SENDING..." : submitSuccess ? "SENT!" : "SEND"}
          </button>
        </form>
      </div>
    </div>
  );
}
