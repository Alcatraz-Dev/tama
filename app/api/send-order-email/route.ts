import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY!);

export async function POST(req: NextRequest) {
  try {
    const order = await req.json();
    const fromEmail = process.env.NEXT_PUBLIC_EMAIL_FROM!;
    const toEmail = process.env.NEXT_PUBLIC_EMAIL_TO!;

    // Generate HTML rows for each item in the order
    const itemsHtml = (order.items || [order])
      .map(
        (item: any) => `
    <div style="
      border: 1px solid #e2e8f0;
      border-radius: 10px;
      padding: 15px;
      margin-bottom: 10px;
      display: flex;
      align-items: center;
      background-color: #ffffff;
    ">
      <!-- Product Image -->
      <div style="flex-shrink: 0; width: 80px; height: 80px; margin-right: 15px;">
        <img src="${item.product.image?.[0] || ""}" alt="${item.product.title}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 8px;" />
      </div>

      <!-- Product Info -->
      <div style="flex: 1;">
        <strong style="font-size: 16px; color: #111827;">${item.product.title}</strong>
        <p style="margin: 5px 0; color: #6b7280; display: flex; align-items: center; gap: 5px;">
          ${
            item.selectedColor
              ? `
            <span style="
              display: inline-block;
              width: 16px;
              height: 16px;
              border-radius: 50%;
              margin-right: 5px;
              background-color: ${item.selectedColor};
              border: 1px solid #d1d5db;
            "></span>
            Color
          `
              : ""
          }
          ${item.selectedSize ? `| Size: ${item.selectedSize}` : ""}
        </p>
      </div>

      <!-- Price Info -->
      <div style="text-align: right;">
        <p style="margin: 0; font-weight: bold;">${item.quantity} x ${item.product.price} DT</p>
        <p style="margin: 0; font-weight: bold;">Subtotal: ${(item.product.price * item.quantity).toFixed(2)} DT</p>
      </div>
    </div>
  `
      )
      .join("");

    const html = `
  <div style="font-family: Arial, sans-serif; max-width: 700px; margin: auto; padding: 20px; background-color: #f9fafb; border-radius: 10px;">
    <h2 style="color: #111827; margin-bottom: 20px;">🛒 New Order Received</h2>

    <div style="margin-bottom: 20px;">
      <p><strong>Full Name:</strong> ${order.fullName}</p>
      <p><strong>Phone:</strong> ${order.phone}</p>
      <p><strong>Town:</strong> ${order.town}</p>
      <p><strong>Location:</strong> ${order.location}</p>
    </div>

    <div>
      ${itemsHtml}
    </div>

    <div style="margin-top: 20px; text-align: right; font-weight: bold; font-size: 16px;">
      Total: ${order.total?.toFixed(2) || "0"} DT
    </div>

    <p style="margin-top: 20px; font-size: 14px; color: #6b7280;">
      This is an automated notification from your store to let you know that a new order has been placed.
    </p>
  </div>
`;

    await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      subject: `New Order from ${order.fullName}`,
      html, // send full HTML
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Email failed:", err);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
