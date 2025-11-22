import { NextRequest, NextResponse } from 'next/server';
import { client } from '@/sanity/lib/client';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query');

    console.log('API: Received special events query:', query);

    if (!query) {
      return NextResponse.json(
        { error: 'Query parameter is required' },
        { status: 400 }
      );
    }

    console.log('API: Executing query:', query);

    const events = await client.fetch(query);

    console.log('API: Events found:', events?.length || 0);
    if (events && events.length > 0) {
      console.log('API: First event:', {
        eventName: events[0].eventName,
        isActive: events[0].isActive,
        startDate: events[0].startDate,
        endDate: events[0].endDate,
        eventType: events[0].eventType
      });
    }

    return NextResponse.json({
      events,
      success: true
    });
  } catch (error) {
    console.error('Error fetching special events:', error);
    return NextResponse.json(
      { error: 'Failed to fetch special events' },
      { status: 500 }
    );
  }
}