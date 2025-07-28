// pages/index.tsx
"use client";

import Head from 'next/head'
import { useEffect } from 'react'

export default function Home() {
  useEffect(() => {
    import('../../components/deck');
  }, [])

  return (
    <>
      <Head>
        <title>StockDecks</title>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <div className="content">
        <h1>Stock Decks</h1>
        <button id="newCardButton">Click to generate new card</button>
        <h2>Your Cards</h2>
        <div id="card-container"></div>
      </div>
    </>
  )
}
