// src/lib/colors.ts
// Handles styling of different types of cards

// Returns a color based on the stock sector
export function getSectorColor(sector: string): [string, string] {
  switch (sector) {
    case 'Basic Materials': return ['border-basicMaterials-border', 'bg-basicMaterials-background'];
    case 'Consumer Discretionary': return ['border-consumerDiscretionary-border', 'bg-consumerDiscretionary-background'];
    case 'Consumer Staples': return ['border-consumerStaples-border', 'bg-consumerStaples-background'];
    case 'Energy': return ['border-energy-border', 'bg-energy-background'];
    case 'Finance': return ['border-finance-border', 'bg-finance-background'];
    case 'Health Care': return ['border-healthCare-border', 'bg-healthCare-background'];
    case 'Industrials': return ['border-industrials-border', 'bg-industrials-background'];
    case 'Real Estate': return ['border-realEstate-border', 'bg-realEstate-background'];
    case 'Technology': return ['border-technology-border', 'bg-technology-background'];
    case 'Telecommunications': return ['border-telecommunication-border', 'bg-telecommunication-background'];
    case 'Utilities': return ['border-utilities-border', 'bg-utilities-background'];
    default: return ['border-cardDefault-border', 'bg-cardDefault-background'];
  }
}
