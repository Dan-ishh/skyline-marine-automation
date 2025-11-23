/**
 * InquiryPopup Component
 * Modal form for product inquiries
 */

import { useState, useEffect } from "react";
import PhoneInput, { parsePhoneNumber } from "react-phone-number-input";
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
  const [phoneValue, setPhoneValue] = useState<string>("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Reset form when popup opens
  useEffect(() => {
    if (isInquiryModalOpen) {
      // Generate pre-filled message based on product
      const prefilledMessage =
        productName || prefilledData?.productName
          ? `I'd like to know more about ${
              productName || prefilledData?.productName
            }. Please contact me.`
          : "I'd like to know more about.";

      // Reset all form fields
      setFormData({
        name: "",
        companyName: "",
        email: "",
        mobile: "",
        subject: productName || prefilledData?.productName || "",
        message: prefilledMessage,
      });

      // Reset phone value
      setPhoneValue("");

      // Reset errors
      setErrors({});

      // Reset submit states
      setIsSubmitting(false);
      setSubmitSuccess(false);
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

    // Phone validation - Country Code + exactly 10 digits
    if (!phoneValue || phoneValue.trim() === "") {
      newErrors.mobile = "Phone number is required";
    } else {
      try {
        // Use the library's parse function to properly extract country code and national number
        const parsedPhone = parsePhoneNumber(phoneValue);

        if (!parsedPhone) {
          newErrors.mobile = "Please enter a valid phone number";
        } else {
          // Get the national number (phone number without country code)
          const nationalNumber = parsedPhone.nationalNumber;

          // Must be exactly 10 digits
          if (nationalNumber.length !== 10) {
            newErrors.mobile = "Phone number must be exactly 10 digits";
          }
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

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Web3Forms Configuration
      const WEB3FORMS_ACCESS_KEY = "f58fa71f-75a6-496f-9e10-24983fdc93a3";

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
Product: ${prefilledData?.productName || "General Inquiry"}

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
          setPhoneValue("");
        }, 2000);
      } else {
        // Handle specific error messages
        const errorMessage = result.message || "Submission failed";
        console.error("Web3Forms Error:", errorMessage);

        // Show user-friendly error
        alert(
          `Unable to send inquiry: ${errorMessage}\n\nPlease try again or contact us directly at skylinemarine1993@gmail.com`
        );
      }
    } catch (error) {
      console.error("Error sending inquiry via Web3Forms:", error);
      alert(
        "Failed to send inquiry. Please try again or contact us directly at skylinemarine1993@gmail.com"
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
                Phone Number <span className="inquiry-popup__required">*</span>
              </label>
              <PhoneInput
                international
                defaultCountry="IN"
                value={phoneValue}
                onChange={(value: string | undefined) => {
                  // Clear error when user starts typing
                  if (errors.mobile) {
                    setErrors((prev) => ({ ...prev, mobile: "" }));
                  }

                  if (!value) {
                    setPhoneValue("");
                    return;
                  }

                  // Extract all digits from the new value
                  const allDigits = value.replace(/\D/g, "");

                  // Get country code (e.g., "91" for India from "+91")
                  const countryCodeMatch = value.match(/^\+(\d+)/);
                  const countryCode = countryCodeMatch
                    ? countryCodeMatch[1]
                    : "";

                  // Get the phone number digits (without country code)
                  const phoneDigits = countryCode
                    ? allDigits.slice(countryCode.length)
                    : allDigits;

                  // Only allow update if 10 digits or less for the phone number part
                  // This prevents typing more than 10 digits
                  if (phoneDigits.length <= 10) {
                    setPhoneValue(value);
                  }
                  // If more than 10 digits, don't update (effectively blocking the input)
                }}
                placeholder="Enter phone number"
                className={`inquiry-popup__phone-input ${
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
