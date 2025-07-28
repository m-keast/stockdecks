// pages/index.tsx
"use client";

import Head from 'next/head'
import Link from 'next/link'
import { useEffect } from 'react'

export default function Home() {
  useEffect(() => {
    import('../../components/deck').then((module) => {
      // You can invoke exported functions here if needed
    })
  }, [])

  return (
    <>
      <Head>
        <title>StockDecks</title>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <nav className="navbar">
        <ul className="nav-menu">
          <li><Link href="/"><a>Home</a></Link></li>
          <li><Link href="/deck"><a>My Deck</a></Link></li>
          <li><Link href="/buy"><a>Buy Packs</a></Link></li>
        </ul>
        <ul className="nav-menu">
          <li><Link href="/wallet"><a>Wallet</a></Link></li>
          <div className="nav-login">
            <li><Link href="/login"><a className="login-button">Log out</a></Link></li>
          </div>
        </ul>
      </nav>

      <div className="content">
        <h1>Stock Decks</h1>
        <button id="newCardButton">Click to generate new card</button>
        <h2>Your Cards</h2>
        <div id="card-container"></div>
      </div>
    </>
  )
}
