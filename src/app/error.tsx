'use client';

import React, { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Error occurred:', error);
  }, [error]);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '400px',
      textAlign: 'center',
      padding: '20px'
    }}>
      <h2 style={{ 
        color: '#374151', 
        marginBottom: '1rem',
        fontSize: '1.5rem'
      }}>
        Something went wrong!
      </h2>
      {error.message && (
        <p style={{ 
          color: '#6b7280', 
          marginBottom: '1.5rem',
          maxWidth: '600px'
        }}>
          {error.message}
        </p>
      )}
      {error.digest && (
        <p style={{ 
          color: '#6b7280', 
          fontSize: '0.75rem',
          marginBottom: '1.5rem'
        }}>
          Error ID: {error.digest}
        </p>
      )}
      <button
        onClick={() => reset()}
        style={{
          backgroundColor: '#3b82f6',
          color: 'white',
          border: 'none',
          padding: '0.5rem 1rem',
          borderRadius: '0.25rem',
          cursor: 'pointer',
          fontSize: '1rem'
        }}
      >
        Try again
      </button>
    </div>
  );
}