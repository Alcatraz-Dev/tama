import { NextRequest, NextResponse } from 'next/server';
import { getProducts } from '@/lib/useQuery';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '20');

    const products = await getProducts();

    // Limit the results if specified
    const limitedProducts = limit > 0 ? products.slice(0, limit) : products;

    return NextResponse.json({
      products: limitedProducts,
      total: products.length
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}