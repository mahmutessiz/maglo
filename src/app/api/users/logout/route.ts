// api/users/logout/route.ts
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

        return NextResponse.json({ message: 'Logout successful' });
    } catch (err) {
        return NextResponse.json({ error: 'An error occurred' + err }, { status: 500 });
    }
}