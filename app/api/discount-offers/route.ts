import { client } from "@/sanity/lib/client";
import { NextResponse } from "next/server";


// -----------------------------
// GET — get discount offers
// -----------------------------
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("query");

    if (!query)
      return NextResponse.json(
        { success: false, message: "Missing query" },
        { status: 400 }
      );

    const offers = await client.fetch(query);

    return NextResponse.json({ success: true, offers });
  } catch (error) {
    console.error("GET discount-offers error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch discount offers" },
      { status: 500 }
    );
  }
}

// -----------------------------
// POST — update isActive status
// -----------------------------
export async function POST(req: Request) {
  try {
    const { offerId, isActive } = await req.json();

    if (!offerId)
      return NextResponse.json(
        { success: false, message: "Missing offerId" },
        { status: 400 }
      );

    // Convert boolean into string as stored in Sanity
    const newStatus = isActive ? "active" : "inactive";

    const result = await client
      .patch(offerId)
      .set({ isActive: newStatus })
      .commit();

    return NextResponse.json({
      success: true,
      message: "Offer updated successfully",
      result,
    });
  } catch (error) {
    console.error("POST discount-offers error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update discount offer" },
      { status: 500 }
    );
  }
}