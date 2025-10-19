import React from 'react'
import Image from 'next/image'
export default function MyWallets() {
  return (
        <div className='flex justify-center items-center gap-4 w-full h-screen'>
            <Image src="/maglo-logo.svg" alt="Logo" width={52} height={52} />
            <p className='font-bold text-2xl'>Maglo.</p>
          </div>
  )
}
