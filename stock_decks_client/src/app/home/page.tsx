// app/page.tsx (or any page/component in your Next.js project)
import Link from 'next/link';

export default function HomePage() {
  return (
    <div>
      <nav className="navbar">
        <ul className="nav-menu">
          <li><Link href="/">Home</Link></li>
          <li><Link href="/deck">My Deck</Link></li>
          <li><Link href="/buy">Buy Packs</Link></li>
        </ul>
        <ul className="nav-menu">
          <li><Link href="/wallet">Wallet</Link></li>
          <div className="nav-login">
            <li><Link href="/login" className="login-button">Log out</Link></li>
          </div>
        </ul>
      </nav>

      <div className="content">
        <h1>Stock Decks</h1>

        <button id="GetThreePackButton">Get Three Pack</button>

        <div className="carousel-container">
          <div className="card-list" id="cardList">
            {/* Example cards */}
            <div className="card" id="card1">
              <div className="card-header">
                <span className="abbr" id="abbr1">AAPL</span>
                <span className="top-number">1</span>
              </div>
              <img
                src="https://bpb-us-w2.wpmucdn.com/u.osu.edu/dist/6/44792/files/2017/04/stock-market-3-21gyd1b.jpg"
                alt="Image"
                className="card-image"
              />
              <div className="card-info">
                <span className="sector" id="sector1">Technology</span>
                <span className="info-number" id="price1">$209.56</span>
              </div>
              <span className="title" id="stockname1">Apple</span>
              <p className="description" id="description1">
                Ascentage Pharma Group International, a clinical-stage biotechnology company,
                develops therapies for cancers, chronic hepatitis B virus (HBV), and
                age-related diseases in Mainland China.
              </p>
            </div>

            <div className="card" id="card2">
              <div className="card-header">
                <span className="abbr" id="abbr2">MSFT</span>
                <span className="top-number">1</span>
              </div>
              <img
                src="https://bpb-us-w2.wpmucdn.com/u.osu.edu/dist/6/44792/files/2017/04/stock-market-3-21gyd1b.jpg"
                alt="Image"
                className="card-image"
              />
              <div className="card-info">
                <span className="sector" id="sector2">Technology</span>
                <span className="info-number" id="price2">$495.52</span>
              </div>
              <span className="title" id="stockname2">Microsoft</span>
              <p className="description" id="description2">
                Microsoft Corporation is an American multinational corporation and technology conglomerate.
              </p>
            </div>

            <div className="card" id="card3">
              <div className="card-header">
                <span className="abbr" id="abbr3">MSFT</span>
                <span className="top-number">1</span>
              </div>
              <img
                src="https://bpb-us-w2.wpmucdn.com/u.osu.edu/dist/6/44792/files/2017/04/stock-market-3-21gyd1b.jpg"
                alt="Image"
                className="card-image"
              />
              <div className="card-info">
                <span className="sector" id="sector3">Technology</span>
                <span className="info-number" id="price3">$495.52</span>
              </div>
              <span className="title" id="stockname3">Microsoft</span>
              <p className="description" id="description3">
                Microsoft Corporation is an American multinational corporation and technology conglomerate.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
