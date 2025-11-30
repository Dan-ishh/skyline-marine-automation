# Frontend-Only Inquiry Solutions

Since you don't have a backend set up, here are pure frontend solutions for handling inquiry emails:

---

## Option 1: EmailJS (Recommended - Easiest)

**What it is:** Free service that sends emails directly from the browser without backend code.

### Setup Steps:

1. **Install EmailJS:**

```bash
npm install @emailjs/browser
```

2. **Sign up at EmailJS:**

   - Go to [https://www.emailjs.com/](https://www.emailjs.com/)
   - Create a free account (200 emails/month free)
   - Add an email service (Gmail, Outlook, etc.)
   - Create an email template
   - Get your Public Key, Service ID, and Template ID

3. **Update InquiryPopup.tsx:**

Replace the `handleSubmit` function with:

```tsx
import emailjs from "@emailjs/browser";

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!validateForm()) {
    return;
  }

  setIsSubmitting(true);

  try {
    // EmailJS configuration
    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      company_name: formData.companyName || "N/A",
      mobile: formData.mobile,
      subject: formData.subject,
      message: formData.message,
      to_email: "info@skylinemarine.co", // Your email
    };

    await emailjs.send(
      "YOUR_SERVICE_ID", // Replace with your EmailJS Service ID
      "YOUR_TEMPLATE_ID", // Replace with your EmailJS Template ID
      templateParams,
      "YOUR_PUBLIC_KEY" // Replace with your EmailJS Public Key
    );

    setSubmitSuccess(true);
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
    console.error("Error sending inquiry:", error);
    alert("Failed to send inquiry. Please try again later.");
  } finally {
    setIsSubmitting(false);
  }
};
```

4. **EmailJS Template Example:**

```
New Product Inquiry

From: {{from_name}} ({{from_email}})
Company: {{company_name}}
Mobile: {{mobile}}
Subject: {{subject}}

Message:
{{message}}
```

**Pros:**

- ✅ No backend needed
- ✅ Free tier (200 emails/month)
- ✅ Works directly from browser
- ✅ Easy to set up

**Cons:**

- ❌ Email credentials visible in browser (use EmailJS Public Key only)
- ❌ Limited to 200 emails/month on free plan

---

## Option 2: Formspree

**What it is:** Form backend service that handles submissions and sends emails.

### Setup Steps:

1. **Sign up at Formspree:**

   - Go to [https://formspree.io/](https://formspree.io/)
   - Create account (50 submissions/month free)
   - Create a new form
   - Get your Form ID

2. **Update InquiryPopup.tsx:**

```tsx
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!validateForm()) {
    return;
  }

  setIsSubmitting(true);

  try {
    const response = await fetch("https://formspree.io/f/YOUR_FORM_ID", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        companyName: formData.companyName,
        mobile: formData.mobile,
        subject: formData.subject,
        message: formData.message,
      }),
    });

    if (response.ok) {
      setSubmitSuccess(true);
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
    } else {
      alert("Failed to submit inquiry. Please try again.");
    }
  } catch (error) {
    console.error("Error submitting inquiry:", error);
    alert("An error occurred. Please try again later.");
  } finally {
    setIsSubmitting(false);
  }
};
```

**Pros:**

- ✅ No backend needed
- ✅ Simple setup
- ✅ Handles spam protection

**Cons:**

- ❌ Limited to 50 submissions/month on free plan
- ❌ Less customization

---

## Option 3: Web3Forms

**What it is:** Free form backend with unlimited submissions.

### Setup Steps:

1. **Sign up at Web3Forms:**

   - Go to [https://web3forms.com/](https://web3forms.com/)
   - Get your Access Key (free, unlimited)

2. **Update InquiryPopup.tsx:**

```tsx
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!validateForm()) {
    return;
  }

  setIsSubmitting(true);

  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        access_key: "YOUR_ACCESS_KEY", // Replace with your Web3Forms access key
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: `
Company: ${formData.companyName || "N/A"}
Mobile: ${formData.mobile}

Message:
${formData.message}
        `,
      }),
    });

    if (response.ok) {
      setSubmitSuccess(true);
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
    } else {
      alert("Failed to submit inquiry. Please try again.");
    }
  } catch (error) {
    console.error("Error submitting inquiry:", error);
    alert("An error occurred. Please try again later.");
  } finally {
    setIsSubmitting(false);
  }
};
```

**Pros:**

- ✅ Free unlimited submissions
- ✅ No backend needed
- ✅ Spam protection included

**Cons:**

- ❌ Less known service

---

## Option 4: mailto: Link (Simplest)

**What it is:** Opens user's email client with pre-filled data.

### Update Product Detail Page:

```tsx
const handleRequestQuote = () => {
  if (product) {
    const subject = encodeURIComponent(`Inquiry: ${product.name}`);
    const body = encodeURIComponent(`
Product: ${product.name}
Brand: ${product.brand?.name || "N/A"}

Please provide the following information:
- Your Name:
- Company Name:
- Mobile Number:
- Your Message:
    `);

    window.location.href = `mailto:info@skylinemarine.co?subject=${subject}&body=${body}`;
  }
};
```

**Pros:**

- ✅ Zero setup required
- ✅ Works offline
- ✅ 100% private

**Cons:**

- ❌ User must have email client configured
- ❌ Less professional
- ❌ No form validation

---

## Recommendation

**For your use case, I recommend EmailJS (Option 1) because:**

1. ✅ Professional email delivery
2. ✅ Customizable email templates
3. ✅ Free tier is sufficient (200 emails/month)
4. ✅ Easy to integrate
5. ✅ Works entirely from frontend
6. ✅ You keep your existing form UI

---

## Current Setup (What You Have Now)

Your current setup uses a Next.js API route (`/api/inquiry`), which is technically server-side code but runs on your Next.js server.

**It currently:**

- ✅ Validates the form data
- ⚠️ Only logs to console (no email sent)
- ✅ Returns success response

**To actually send emails with current setup, you'd need to:**

1. Install `nodemailer`: `npm install nodemailer @types/nodemailer`
2. Set up SMTP credentials (Gmail, SendGrid, etc.)
3. Uncomment the email code in `/src/pages/api/inquiry.ts`

But if you prefer pure frontend, go with **EmailJS**! 🚀
