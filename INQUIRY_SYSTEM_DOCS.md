# Product Inquiry System

This document explains how to use and configure the product inquiry system for Skyline Marine Automation.

## Overview

The inquiry system allows customers to request quotes for products through two methods:

1. **Email Inquiry Form** - A detailed form with file upload capability
2. **WhatsApp Quick Quote** - Direct WhatsApp message with product information

## Components

### 1. InquiryPopup Component (`src/Components/InquiryPopup.tsx`)

A modal form that collects customer information and sends inquiries via email.

**Features:**

- Form fields: Name, Company Name, Email, Mobile, Subject, Message
- File upload support (currently disabled, see setup below)
- Form validation (email format, required fields, mobile number)
- Success state with auto-close
- Body scroll prevention when open
- Responsive design

**Usage:**

```tsx
import { useUIStore } from "@/src/store";

const { openInquiryModal } = useUIStore();

// Open inquiry modal with pre-filled data
openInquiryModal({
  productName: "Wärtsilä 31 Main Engine",
  productId: "prod-001",
});
```

### 2. Product Detail Page (`src/pages/products/[productSlug].tsx`)

Individual product page with two inquiry buttons:

- **Request Quote** - Opens the InquiryPopup modal
- **WhatsApp Quote** - Redirects to WhatsApp with pre-filled message

**WhatsApp Message Format:**

```
I'd like to know more about [PRODUCT NAME]. Please contact me.
```

### 3. API Endpoint (`src/pages/api/inquiry.ts`)

Backend endpoint for processing inquiry submissions.

**Current Status:** Basic validation only (logs to console)

**To Enable Email Sending:**

1. Install required packages:

```bash
npm install formidable nodemailer
npm install --save-dev @types/formidable @types/nodemailer
```

2. Create `.env.local` file in the root directory:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM=noreply@skylinemarine.co
INQUIRY_EMAIL=info@skylinemarine.co
```

3. For Gmail, create an App Password:

   - Go to Google Account → Security → 2-Step Verification → App passwords
   - Generate a new app password for "Mail"
   - Use this password in `SMTP_PASS`

4. Uncomment the nodemailer code in `/src/pages/api/inquiry.ts`

5. For file upload support:
   - Uncomment the file handling code
   - Update InquiryPopup to use FormData instead of JSON

## Configuration

### WhatsApp Number

Update the WhatsApp number in product detail page:

```tsx
// src/pages/products/[productSlug].tsx
const WHATSAPP_NUMBER = "917016439122"; // Update this number
```

### Email Recipients

Update inquiry recipient email:

```env
# .env.local
INQUIRY_EMAIL=info@skylinemarine.co
```

### Email Template

Customize the HTML email template in `/src/pages/api/inquiry.ts`:

- Update colors to match brand (currently #003366 navy, #ff6b00 orange)
- Modify layout and content structure
- Add company logo

## Styling

All inquiry system styles are in:

- `/public/Assets/scss/components/_inquiry-popup.scss` - Modal form styles
- `/public/Assets/scss/pages/_product-detail-page.scss` - Product page styles

### Color Variables

```scss
$primary-color: #003366; // Navy blue
$orange-color: #ff6b00; // Orange accent
$white: #ffffff;
$gray-50: #fafafa;
// ... see _variables.scss for complete list
```

## State Management

The inquiry modal state is managed by Zustand store (`src/store/useUIStore.ts`):

```tsx
interface UIStore {
  isInquiryModalOpen: boolean;
  prefilledData: InquiryPrefillData | null;
  openInquiryModal: (data?: InquiryPrefillData) => void;
  closeInquiryModal: () => void;
}
```

## File Upload

File upload is currently disabled but can be enabled:

1. Install formidable: `npm install formidable @types/formidable`
2. Update API endpoint to use FormData parser
3. Update InquiryPopup submit handler to use FormData
4. Supported file types: `.pdf`, `.doc`, `.docx`, `.jpg`, `.jpeg`, `.png`
5. Max file size: 10MB

## reCAPTCHA Integration

To add spam protection:

1. Get reCAPTCHA keys from Google: https://www.google.com/recaptcha
2. Install package: `npm install react-google-recaptcha @types/react-google-recaptcha`
3. Add site key to environment: `NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your-key`
4. Update InquiryPopup component to use actual reCAPTCHA
5. Verify token on backend in API endpoint

## Testing

### Test Inquiry Form

1. Navigate to any product detail page (e.g., `/products/wartsila-31-main-engine`)
2. Click "Request Quote" button
3. Fill out the form with test data
4. Submit and check console logs (email sending disabled by default)

### Test WhatsApp Integration

1. Navigate to a product detail page
2. Click "WhatsApp Quote" button
3. Verify WhatsApp opens with correct pre-filled message
4. Update phone number if needed

## Troubleshooting

**Modal doesn't open:**

- Check that InquiryPopup is added to `_app.tsx`
- Verify Zustand store is properly configured
- Check browser console for errors

**Form validation errors:**

- Email must be valid format: `user@domain.com`
- Mobile must be 10+ digits with optional formatting
- All required fields must be filled

**Email not sending:**

- Verify nodemailer is installed
- Check SMTP credentials in `.env.local`
- Test SMTP connection separately
- Check firewall/security settings

**Styling issues:**

- Ensure SCSS files are imported in `globals.scss`
- Clear Next.js cache: `rm -rf .next`
- Check responsive breakpoints in SCSS files

## Future Enhancements

- [ ] Add file upload support with formidable
- [ ] Implement reCAPTCHA spam protection
- [ ] Add inquiry tracking dashboard
- [ ] Send confirmation email to customer
- [ ] Add inquiry history to admin panel
- [ ] Support multiple file attachments
- [ ] Add inquiry status tracking
- [ ] Email template variations for different products
- [ ] SMS notifications for urgent inquiries
- [ ] CRM integration (Salesforce, HubSpot, etc.)

## Support

For issues or questions about the inquiry system, contact the development team or refer to:

- Next.js API Routes: https://nextjs.org/docs/api-routes/introduction
- Nodemailer Documentation: https://nodemailer.com/
- Formidable Documentation: https://github.com/node-formidable/formidable
