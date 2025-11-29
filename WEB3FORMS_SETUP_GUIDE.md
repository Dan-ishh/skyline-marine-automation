# Web3Forms Setup Guide - Skyline Marine Automation

## 🚀 Quick Setup (2 minutes - No account needed!)

Web3Forms is simpler than EmailJS and offers **unlimited free submissions**!

---

## Step 1: Get Your Free Access Key

1. **Go to:** [https://web3forms.com/](https://web3forms.com/)

2. **Scroll down to "Get Started"** section

3. **Enter your email** where you want to receive inquiries:

   ```
   skylinemarine1993@gmail.com
   ```

4. **Click "Get Your Access Key"**

5. **Check your email inbox** - You'll receive an email with your **Access Key**

   - It looks like: `abcd1234-5678-90ef-ghij-klmnopqrstuv`

6. **Click the confirmation link** in the email to activate your key

---

## Step 2: Configure Your App

### Option A: Using Environment Variables (Recommended)

1. Create or update `.env.local` file in your project root:

```env
# Web3Forms Configuration
NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY=your-access-key-here
NEXT_PUBLIC_COMPANY_EMAIL=skylinemarine1993@gmail.com
```

2. Update `InquiryPopup.tsx` to use environment variable:

```tsx
const WEB3FORMS_ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || "";
```

### Option B: Direct Configuration (Quick Testing)

Open `src/Components/InquiryPopup.tsx` and replace:

```tsx
const WEB3FORMS_ACCESS_KEY = "YOUR_ACCESS_KEY_HERE";
```

With your actual access key:

```tsx
const WEB3FORMS_ACCESS_KEY = "abcd1234-5678-90ef-ghij-klmnopqrstuv";
```

---

## Step 3: Test the Form

1. **Start your development server:**

```bash
npm run dev
```

2. **Navigate to any product page**

3. **Click "Request Quote" button**

4. **Fill out the form with test data:**

   - Name: Test Customer
   - Email: test@example.com
   - Mobile: +1234567890
   - Message: Test inquiry

5. **Click "Send"**

6. **Check your email inbox** (skylinemarine1993@gmail.com)
   - You should receive the inquiry within seconds!
   - Check spam folder if not in inbox

---

## 📧 Email Format

You'll receive emails formatted like this:

```
Subject: Inquiry: Wärtsilä 31 Main Engine

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
NEW PRODUCT INQUIRY - Skyline Marine
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

CUSTOMER INFORMATION:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Name:           John Doe
Email:          john@company.com
Company:        Marine Corp
Mobile:         +1234567890

PRODUCT INQUIRY:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Product:        Wärtsilä 31 Main Engine
Subject:        Inquiry: Wärtsilä 31 Main Engine

CUSTOMER MESSAGE:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
I need a quote for this product. Please contact me.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
This inquiry was submitted via Skyline Marine website.
Please respond directly to: john@company.com
```

---

## 🎨 Customization Options

### Change Email Recipient

To receive emails at a different address, get a new access key for that email from web3forms.com

### Customize Email Format

Edit the `message` field in `InquiryPopup.tsx`:

```tsx
message: `
Your custom format here:
Name: ${formData.name}
Email: ${formData.email}
...
`,
```

### Add Auto-Reply to Customer

Add this to `web3FormsData`:

```tsx
const web3FormsData = {
  access_key: WEB3FORMS_ACCESS_KEY,
  // ... other fields
  replyto: formData.email, // Customer will see this as reply-to address
  from_name: "Skyline Marine Automation",
};
```

### Add BCC or CC

```tsx
const web3FormsData = {
  access_key: WEB3FORMS_ACCESS_KEY,
  // ... other fields
  cc: "manager@skylinemarine.co",
  bcc: "archive@skylinemarine.co",
};
```

---

## 🔒 Security & Privacy

### What's Safe:

✅ **Access Key** - Safe to expose in frontend (designed for browser use)
✅ Your access key is tied to YOUR email address
✅ Submissions are rate-limited per IP to prevent spam
✅ Built-in bot protection

### Best Practices:

- Use environment variables for production
- Keep your access key in `.env.local` (not committed to Git)
- Monitor submissions via Web3Forms dashboard

---

## 📊 Monitoring & Management

### Web3Forms Dashboard

Access your dashboard:

1. Go to [https://web3forms.com/](https://web3forms.com/)
2. Click "Login" (use the email you registered with)
3. View all submissions, analytics, and settings

**Dashboard Features:**

- View all form submissions
- See submission statistics
- Download submissions as CSV
- Enable/disable forms
- Set up webhooks
- Configure spam filters

---

## 🚫 Spam Protection

Web3Forms includes built-in spam protection:

### Honeypot Field (Already Configured)

The form automatically includes a hidden honeypot field to catch bots.

### Google reCAPTCHA (Optional)

To add reCAPTCHA:

```tsx
const web3FormsData = {
  access_key: WEB3FORMS_ACCESS_KEY,
  // ... other fields
  "g-recaptcha-response": recaptchaToken, // Add reCAPTCHA token
};
```

---

## 🆘 Troubleshooting

### Email Not Arriving

1. **Check spam/junk folder**
2. **Verify access key** is correct
3. **Check email address** - must match the one you registered with
4. **Look for error messages** in browser console
5. **Check Web3Forms status**: [https://web3forms.com/status](https://web3forms.com/status)

### "Access Key is invalid" Error

- Verify you copied the entire access key
- Make sure you clicked the confirmation link in your email
- Try requesting a new access key

### Form Submits But No Email

- Confirm the access key email matches your inbox
- Check your email provider's spam settings
- Try a different email provider

### Rate Limit Errors

- Web3Forms limits submissions per IP address
- Normal usage shouldn't hit limits
- Contact Web3Forms support if you need higher limits

---

## 💰 Pricing

**Free Forever:**

- ✅ Unlimited submissions
- ✅ Unlimited forms
- ✅ No credit card required
- ✅ Spam protection included
- ✅ File uploads (up to 5MB)
- ✅ Custom email templates

**Pro Features** (Optional - $8/month):

- Priority support
- Custom branding
- Webhooks
- Advanced analytics
- API access
- No Web3Forms branding

For your needs, the **free plan is more than sufficient**! 🎉

---

## 📝 API Reference

### Required Fields

```tsx
{
  access_key: "your-access-key", // Required
  name: "Customer Name",          // Optional but recommended
  email: "customer@email.com",    // Optional but recommended
  subject: "Inquiry Subject",     // Optional
  message: "Inquiry message"      // Optional
}
```

### All Available Fields

```tsx
{
  access_key: "required",
  name: "string",
  email: "string",
  subject: "string",
  message: "string",
  phone: "string",
  company: "string",
  from_name: "string",
  replyto: "string",
  cc: "string",
  bcc: "string",
  redirect: "url or false",
  webhook: "url",
  attachment: "base64 encoded file"
}
```

---

## 🔄 Comparison: EmailJS vs Web3Forms

| Feature              | EmailJS               | Web3Forms           |
| -------------------- | --------------------- | ------------------- |
| **Free Submissions** | 200/month             | **Unlimited** ✅    |
| **Setup Complexity** | Medium (3 IDs needed) | **Easy (1 key)** ✅ |
| **Email Templates**  | Visual editor         | Plain text/HTML     |
| **File Uploads**     | Yes (with config)     | Yes (up to 5MB)     |
| **Spam Protection**  | Manual setup          | **Built-in** ✅     |
| **Rate Limits**      | 200/month             | **None** ✅         |
| **Account Required** | Yes                   | **No** ✅           |
| **Setup Time**       | 5 minutes             | **2 minutes** ✅    |

**Winner for your use case: Web3Forms** 🏆

---

## ✅ Final Checklist

- [ ] Got Access Key from Web3Forms
- [ ] Clicked confirmation link in email
- [ ] Updated `InquiryPopup.tsx` with access key
- [ ] Tested the form with real data
- [ ] Received test email successfully
- [ ] (Optional) Created `.env.local` file
- [ ] (Optional) Set up auto-reply configuration
- [ ] (Optional) Added to Web3Forms dashboard

---

## 🎉 You're Done!

Your inquiry form now uses Web3Forms with:

- ✅ **Unlimited free submissions**
- ✅ **2-minute setup**
- ✅ **No backend required**
- ✅ **Built-in spam protection**
- ✅ **Professional email delivery**

**Benefits over EmailJS:**

- No monthly submission limits
- Simpler configuration (1 key vs 3 IDs)
- No template setup needed
- Completely free forever

**Next Steps:**

1. Monitor your submissions via Web3Forms dashboard
2. Set up auto-replies if needed
3. Customize email format to your preference

Need help? Check Web3Forms documentation: https://docs.web3forms.com/ 📚
