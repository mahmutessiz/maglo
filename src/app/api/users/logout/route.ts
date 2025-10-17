import { NextResponse } from 'next/server';

export async function POST() {
    try {
        const response = await fetch('https://case.nodelabs.dev/api/users/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            return NextResponse.json(
                errorData,
                { status: response.status }
            );
        }

        const responseData = NextResponse.json({ message: 'Logout successful' });

        // Clear the accessToken cookie
        responseData.cookies.set('accessToken', '', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 0,
        });

        return responseData;
    } catch (err) {
        return NextResponse.json(
            { error: 'An error occurred: ' + (err instanceof Error ? err.message : String(err)) },
            { status: 500 }
        );
    }
}