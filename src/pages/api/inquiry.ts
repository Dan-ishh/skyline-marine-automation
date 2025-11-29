import type { NextApiRequest, NextApiResponse } from "next";

/**
 * Inquiry API Endpoint
 *
 * NOTE: This endpoint requires the following packages to be installed:
 * npm install formidable nodemailer
 * npm install --save-dev @types/formidable @types/nodemailer
 *
 * Also configure these environment variables in .env.local:
 * SMTP_HOST=smtp.gmail.com
 * SMTP_PORT=587
 * SMTP_USER=your-email@gmail.com
 * SMTP_PASS=your-app-password
 * SMTP_FROM=noreply@skylinemarine.co
 * INQUIRY_EMAIL=sales@skylinemarine.co
 */

interface InquiryData {
  name: string;
  companyName?: string;
  email: string;
  mobile: string;
  subject: string;
  message: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const inquiryData: InquiryData = req.body;

    // Validate required fields
    if (
      !inquiryData.name ||
      !inquiryData.email ||
      !inquiryData.mobile ||
      !inquiryData.message
    ) {
      return res.status(400).json({
        message:
          "Missing required fields: name, email, mobile, and message are required",
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(inquiryData.email)) {
      return res.status(400).json({
        message: "Invalid email format",
      });
    }

    // TODO: Implement email sending with nodemailer
    // Uncomment and configure when nodemailer is installed
    /*
    const transporter = nodemailer.createTransporter({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: parseInt(process.env.SMTP_PORT || "587"),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #003366; color: white; padding: 20px; text-align: center;">
          <h1 style="margin: 0;">New Product Inquiry</h1>
        </div>
        
        <div style="padding: 30px; background: #f9f9f9;">
          <h2 style="color: #003366; border-bottom: 2px solid #ff6b00; padding-bottom: 10px;">
            Customer Information
          </h2>
          
          <table style="width: 100%; margin-top: 20px;">
            <tr>
              <td style="padding: 10px; font-weight: bold; width: 150px;">Name:</td>
              <td style="padding: 10px;">${inquiryData.name}</td>
            </tr>
            ${inquiryData.companyName ? `
            <tr>
              <td style="padding: 10px; font-weight: bold;">Company:</td>
              <td style="padding: 10px;">${inquiryData.companyName}</td>
            </tr>
            ` : ''}
            <tr>
              <td style="padding: 10px; font-weight: bold;">Email:</td>
              <td style="padding: 10px;">${inquiryData.email}</td>
            </tr>
            <tr>
              <td style="padding: 10px; font-weight: bold;">Mobile:</td>
              <td style="padding: 10px;">${inquiryData.mobile}</td>
            </tr>
            <tr>
              <td style="padding: 10px; font-weight: bold;">Subject:</td>
              <td style="padding: 10px;">${inquiryData.subject}</td>
            </tr>
          </table>
          
          <h2 style="color: #003366; border-bottom: 2px solid #ff6b00; padding-bottom: 10px; margin-top: 30px;">
            Message
          </h2>
          <div style="background: white; padding: 20px; margin-top: 20px; border-left: 4px solid #ff6b00;">
            ${inquiryData.message.replace(/\n/g, '<br>')}
          </div>
        </div>
        
        <div style="background: #003366; color: white; padding: 15px; text-align: center; font-size: 12px;">
          <p style="margin: 0;">Skyline Marine Automation</p>
          <p style="margin: 5px 0 0 0;">This is an automated inquiry notification</p>
        </div>
      </div>
    `;

    await transporter.sendMail({
      from: process.env.SMTP_FROM || "noreply@skylinemarine.co",
      to: process.env.INQUIRY_EMAIL || "sales@skylinemarine.co",
      subject: `New Inquiry: ${inquiryData.subject}`,
      html: emailHtml,
      replyTo: inquiryData.email,
    });
    */

    // Log inquiry for now (replace with actual email sending)

    return res.status(200).json({
      message: "Inquiry sent successfully",
      success: true,
    });
  } catch (error) {
    console.error("Error processing inquiry:", error);
    return res.status(500).json({
      message: "Failed to send inquiry. Please try again later.",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
