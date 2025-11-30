# EmailJS Setup Guide for Skyline Marine Automation

## 🚀 Quick Setup (5 minutes)

### Step 1: Create EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Click **"Sign Up"** (free account - 200 emails/month)
3. Verify your email address

---

### Step 2: Add Email Service

1. In EmailJS dashboard, go to **"Email Services"**
2. Click **"Add New Service"**
3. Choose your email provider:
   - **Gmail** (Recommended for testing)
   - Outlook
   - Yahoo
   - Custom SMTP
4. Follow the connection steps (you may need to create an app password)
5. **Copy your Service ID** (e.g., `service_abc123`)

#### Gmail App Password Setup:

- Go to Google Account → Security → 2-Step Verification
- Scroll to "App passwords"
- Generate new password for "Mail"
- Use this password in EmailJS (NOT your regular Gmail password)

---

### Step 3: Create Email Template

1. In EmailJS dashboard, go to **"Email Templates"**
2. Click **"Create New Template"**
3. **Copy this template:**

```
Subject: New Product Inquiry from {{from_name}}

---

NEW PRODUCT INQUIRY

Customer Information:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Name:           {{from_name}}
Email:          {{from_email}}
Company:        {{company_name}}
Mobile:         {{mobile}}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Product Inquiry:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Product:        {{product_name}}
Subject:        {{subject}}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Message:
{{message}}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

This is an automated inquiry from Skyline Marine website.
Please respond to: {{from_email}}
```

4. In **"To Email"** field, enter: `{{to_email}}`
5. Click **"Save"**
6. **Copy your Template ID** (e.g., `template_xyz789`)

---

### Step 4: Get Your Public Key

1. In EmailJS dashboard, go to **"Account"**
2. Find **"API Keys"** section
3. **Copy your Public Key** (e.g., `abcXYZ123-defABC`)

---

### Step 5: Configure Your App

#### Option A: Environment Variables (Recommended)

1. Create `.env.local` file in your project root:

```env
# EmailJS Configuration
NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_abc123
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_xyz789
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=abcXYZ123-defABC
NEXT_PUBLIC_COMPANY_EMAIL=info@skylinemarine.co
```

2. Update `InquiryPopup.tsx` to use environment variables:

```tsx
const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "";
const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "";
const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "";
```

#### Option B: Direct Configuration (Quick Testing)

Replace the placeholder values in `InquiryPopup.tsx`:

```tsx
const EMAILJS_SERVICE_ID = "service_abc123"; // Your Service ID
const EMAILJS_TEMPLATE_ID = "template_xyz789"; // Your Template ID
const EMAILJS_PUBLIC_KEY = "abcXYZ123-defABC"; // Your Public Key
```

---

### Step 6: Test the Form

1. Start your development server:

```bash
npm run dev
```

2. Navigate to any product page
3. Click **"Request Quote"** button
4. Fill out the form with test data
5. Click **"Send"**
6. Check your email inbox (the one configured in EmailJS)

---

## 📧 Email Template Variables

The form sends these variables to your email template:

| Variable           | Description            | Example                            |
| ------------------ | ---------------------- | ---------------------------------- |
| `{{from_name}}`    | Customer name          | "John Doe"                         |
| `{{from_email}}`   | Customer email         | "john@company.com"                 |
| `{{company_name}}` | Customer company       | "Marine Corp" or "N/A"             |
| `{{mobile}}`       | Customer mobile        | "+1234567890"                      |
| `{{subject}}`      | Inquiry subject        | "Inquiry: Wärtsilä 31 Main Engine" |
| `{{message}}`      | Customer message       | "I need a quote..."                |
| `{{to_email}}`     | Your company email     | "info@skylinemarine.co"            |
| `{{product_name}}` | Product being inquired | "Wärtsilä 31 Main Engine"          |

---

## 🔒 Security Notes

### What's Safe:

✅ **Public Key** - Safe to expose in frontend (designed for browser use)
✅ **Service ID** - Safe to expose
✅ **Template ID** - Safe to expose

### What's NOT Safe:

❌ Never expose your EmailJS account password
❌ Never expose your actual email password (use app passwords only)

EmailJS is designed for frontend use, so all these IDs are safe to include in your code!

---

## 🎨 Customizing the Email Template

You can customize the email template in EmailJS dashboard:

### HTML Email (Advanced):

```html
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
  <div
    style="background: #003366; color: white; padding: 20px; text-align: center;"
  >
    <h1>New Product Inquiry</h1>
  </div>

  <div style="padding: 30px; background: #f9f9f9;">
    <h2 style="color: #003366;">Customer Information</h2>
    <table style="width: 100%; margin-top: 20px;">
      <tr>
        <td style="padding: 10px; font-weight: bold;">Name:</td>
        <td style="padding: 10px;">{{from_name}}</td>
      </tr>
      <tr>
        <td style="padding: 10px; font-weight: bold;">Email:</td>
        <td style="padding: 10px;">{{from_email}}</td>
      </tr>
      <tr>
        <td style="padding: 10px; font-weight: bold;">Company:</td>
        <td style="padding: 10px;">{{company_name}}</td>
      </tr>
      <tr>
        <td style="padding: 10px; font-weight: bold;">Mobile:</td>
        <td style="padding: 10px;">{{mobile}}</td>
      </tr>
    </table>

    <h2 style="color: #003366; margin-top: 30px;">Product Inquiry</h2>
    <div
      style="background: white; padding: 20px; margin-top: 20px; border-left: 4px solid #ff6b00;"
    >
      <p><strong>Product:</strong> {{product_name}}</p>
      <p><strong>Subject:</strong> {{subject}}</p>
      <p><strong>Message:</strong></p>
      <p>{{message}}</p>
    </div>
  </div>

  <div
    style="background: #003366; color: white; padding: 15px; text-align: center; font-size: 12px;"
  >
    <p>Skyline Marine Automation</p>
    <p>Automated inquiry from website</p>
  </div>
</div>
```

---

## 🧪 Testing Tips

### Test Email:

1. Use your personal email as customer
2. Check spam folder if email doesn't arrive
3. EmailJS dashboard shows delivery status

### Debug Mode:

Add this to see what's being sent:

```tsx
console.log("Sending email with params:", templateParams);
```

---

## 📊 EmailJS Dashboard

Monitor your emails:

- **Email Services** - View connection status
- **Email Templates** - Edit template design
- **Logs** - See all sent emails and errors
- **Stats** - Track monthly usage (200 free emails)

---

## 🆘 Troubleshooting

### Email Not Arriving:

1. Check spam/junk folder
2. Verify Service ID, Template ID, and Public Key
3. Check EmailJS dashboard logs for errors
4. Ensure email service is connected properly

### "Service is unavailable" error:

- Double-check your Service ID
- Ensure email service is active in EmailJS dashboard

### "Template not found" error:

- Verify Template ID
- Ensure template is saved (not in draft)

### Gmail blocks login:

- Use App Password, not regular password
- Enable "Less secure app access" (if using regular password - not recommended)

---

## 💰 Pricing

**Free Tier:**

- 200 emails/month
- Perfect for small businesses
- No credit card required

**Paid Plans** (if you need more):

- Personal: $10/month (1,000 emails)
- Business: $20/month (5,000 emails)
- Enterprise: Custom pricing

---

## 📞 Support

- **EmailJS Documentation:** https://www.emailjs.com/docs/
- **EmailJS Support:** support@emailjs.com
- **Status Page:** https://status.emailjs.com/

---

## ✅ Final Checklist

- [ ] Created EmailJS account
- [ ] Connected email service (Gmail, Outlook, etc.)
- [ ] Created email template with all variables
- [ ] Copied Service ID, Template ID, and Public Key
- [ ] Updated `InquiryPopup.tsx` with your credentials
- [ ] Created `.env.local` with environment variables (optional)
- [ ] Tested the form with real data
- [ ] Received test email successfully
- [ ] Checked email template formatting

---

## 🎉 You're Done!

Your inquiry form now sends emails directly from the frontend without any backend setup!

**Next Steps:**

1. Customize the email template design
2. Set up auto-reply to customers (available in EmailJS)
3. Monitor your monthly usage in dashboard

Need help? Check the troubleshooting section or EmailJS documentation!
