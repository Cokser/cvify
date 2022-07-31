import React from 'react'

import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { Button } from 'ui'

const Home: NextPage = () => {
  return (
    <div className="flex flex-col items-center justify-center py-2">
      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        <h1 className="text-6xl font-bold">
          Welcome to{' '}
          <a className="text-blue-600" href="https://nextjs.org">
            Next.js!
          </a>
        </h1>

        <Button />
        <p className="mt-3 text-2xl">
          Get started by editing{' '}
          <code className="rounded-md bg-gray-100 p-3 font-mono text-lg">
            pages/index.tsx
          </code>
        </p>
      </main>
    </div>
  )
}

export default Home
