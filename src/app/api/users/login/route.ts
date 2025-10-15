import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const response = await fetch('https://case.nodelabs.dev/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(data, { status: response.status });
    }

    // Get ALL Set-Cookie headers from backend
    const setCookieHeaders = response.headers.getSetCookie();
    
    // Create response with data
    const nextResponse = NextResponse.json(data);
    
    // Forward ALL cookies to browser
    if (setCookieHeaders && setCookieHeaders.length > 0) {
      setCookieHeaders.forEach((cookie) => {
        // Modify the cookie to work with localhost
        const modifiedCookie = cookie
          .replace(/Domain=[^;]+;?\s*/gi, '') // Remove Domain
          .replace(/Secure;?\s*/gi, '') // Remove Secure flag for localhost
          .replace(/SameSite=Strict/gi, 'SameSite=Lax') // Change to Lax
          .replace(/SameSite=None/gi, 'SameSite=Lax'); // Change to Lax
        
        nextResponse.headers.append('Set-Cookie', modifiedCookie);
      });
    }

    return nextResponse;

  } catch (error) {
    console.error('Login API error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}