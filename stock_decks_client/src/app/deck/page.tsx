// pages/index.tsx
"use client";

import Head from 'next/head'
import Deck from '../../components/deck';

export default function Home() {
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
        <div id="card-container"></div>
        <Deck /> {/* This now handles rendering and refreshing */}
      </div>
    </>
  )
}
