import { NextRequest, NextResponse } from 'next/server';
import { client } from '@/sanity/lib/client';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, eventId } = body;

    console.log('API: POST request received:', { action, eventId });

    if (action === 'expire' && eventId) {
      console.log('API: Expiring event:', eventId);
      try {
        // Update the event status to expired
        const result = await client
          .patch(eventId)
          .set({ isActive: 'expired' })
          .commit();

        console.log('API: Sanity patch result:', result);

        return NextResponse.json({
          success: true,
          message: 'Event expired successfully',
          result
        });
      } catch (sanityError) {
        console.error('API: Sanity patch error:', sanityError);
        return NextResponse.json(
          { error: 'Failed to update event in Sanity', details: sanityError },
          { status: 500 }
        );
      }
    }

    return NextResponse.json(
      { error: 'Invalid action or missing eventId' },
      { status: 400 }
    );
  } catch (error) {
    console.error('Error updating special event:', error);
    return NextResponse.json(
      { error: 'Failed to update special event' },
      { status: 500 }
    );
  }
}

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