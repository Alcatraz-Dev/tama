import { NextRequest, NextResponse } from 'next/server';
import { client } from '@/sanity/lib/client';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query');

    console.log('API: Received query:', query);

    if (!query) {
      return NextResponse.json(
        { error: 'Query parameter is required' },
        { status: 400 }
      );
    }

    // Update query to use new status field and simple ordering
    const updatedQuery = query
      .replace('isActive == true', 'isActive == "active"')
      .replace('order(displayOrder asc, _createdAt desc)', 'order(_createdAt desc)');

    console.log('API: Updated query:', updatedQuery);

    const offers = await client.fetch(updatedQuery);

    console.log('API: Offers found:', offers?.length || 0);
    console.log('API: Raw offers data:', JSON.stringify(offers, null, 2));
    if (offers && offers.length > 0) {
      console.log('API: First offer:', {
        title: offers[0].title,
        isActive: offers[0].isActive,
        startDate: offers[0].startDate,
        endDate: offers[0].endDate,
        featuredProductsCount: offers[0].featuredProducts?.length || 0
      });
    }

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