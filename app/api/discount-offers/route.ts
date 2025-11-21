import { NextRequest, NextResponse } from 'next/server';
import { client } from '@/sanity/lib/client';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query');

    if (!query) {
      return NextResponse.json(
        { error: 'Query parameter is required' },
        { status: 400 }
      );
    }

    // Update query to use new status field and priority ordering
    const updatedQuery = query
      .replace('isActive == true', 'isActive == "active"')
      .replace('order(displayOrder asc, _createdAt desc)', 'order(priority == "high" desc, priority == "normal" desc, priority == "low" desc, _createdAt desc)');
    const offers = await client.fetch(updatedQuery);

    return NextResponse.json({
      offers,
      success: true
    });
  } catch (error) {
    console.error('Error fetching discount offers:', error);
    return NextResponse.json(
      { error: 'Failed to fetch discount offers' },
      { status: 500 }
    );
  }
}