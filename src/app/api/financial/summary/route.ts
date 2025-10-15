import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    
    let accessToken = null;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      accessToken = authHeader.substring(7);
    }
    
    if (!accessToken) {
      return NextResponse.json(
        { message: 'Access token not found in Authorization header' },
        { status: 401 }
      );
    }

    const response = await fetch('https://case.nodelabs.dev/api/financial/summary', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        errorData,
        { status: response.status }
      );
    }

    const summaryData = await response.json();
    return NextResponse.json(summaryData);

  } catch (error) {
    console.error('Financial Summary API error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}