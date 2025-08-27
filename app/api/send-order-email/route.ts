import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY!);

export async function POST(req: NextRequest) {
  try {
    const order = await req.json();
    const fromEmail = process.env.NEXT_PUBLIC_EMAIL_FROM!;
    const toEmail = process.env.NEXT_PUBLIC_EMAIL_TO!;
    await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      subject: `New Order from ${order.fullName}`,
      html: `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 10px; background-color: #f9fafb;">
    <h2 style="color: #111827; margin-bottom: 20px;">🛒 New Order Received</h2>
    <table style="width: 100%; border-collapse: collapse;">
      <tr>
        <td style="padding: 8px; font-weight: bold; color: #374151;">Full Name:</td>
        <td style="padding: 8px;">${order.fullName}</td>
      </tr>
      <tr style="background-color: #f3f4f6;">
        <td style="padding: 8px; font-weight: bold; color: #374151;">Phone:</td>
        <td style="padding: 8px;">${order.phone}</td>
      </tr>
      <tr>
        <td style="padding: 8px; font-weight: bold; color: #374151;">Town:</td>
        <td style="padding: 8px;">${order.town}</td>
      </tr>
      <tr style="background-color: #f3f4f6;">
        <td style="padding: 8px; font-weight: bold; color: #374151;">Location:</td>
        <td style="padding: 8px;">${order.location}</td>
      </tr>
      <tr>
        <td style="padding: 8px; font-weight: bold; color: #374151;">Product:</td>
        <td style="padding: 8px;">${order.product.title}</td>
      </tr>
      <tr style="background-color: #f3f4f6;">
        <td style="padding: 8px; font-weight: bold; color: #374151;">Color:</td>
        <td style="padding: 8px;">${order.selectedColor || "N/A"}</td>
      </tr>
      <tr>
        <td style="padding: 8px; font-weight: bold; color: #374151;">Size:</td>
        <td style="padding: 8px;">${order.selectedSize || "N/A"}</td>
      </tr>
      <tr style="background-color: #f3f4f6;">
        <td style="padding: 8px; font-weight: bold; color: #374151;">Status:</td>
        <td style="padding: 8px;">${order.status}</td>
      </tr>
    </table>
    <p style="margin-top: 20px; font-size: 14px; color: #6b7280;">This is an automated notification from your store to let you know that a new order has been placed.</p>
  </div>
`,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Email failed:", err);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
