// src/lib/colors.ts
// Handles styling of different types of cards

// Returns a color based on the stock sector
export function getSectorColor(sector: string): [string, string, string] {
  switch (sector) {
    case 'Basic Materials': return ['border-basicMaterials-border', 'bg-basicMaterials-background', 'from-basicMaterials-background via-white/2 to-basicMaterials-background'];
    case 'Consumer Discretionary': return ['border-consumerDiscretionary-border', 'bg-consumerDiscretionary-background', 'from-consumerDiscretionary-sbackground via-white/2 to-consumerDiscretionary-sbackground'];
    case 'Consumer Staples': return ['border-consumerStaples-border', 'bg-consumerStaples-background', 'from-consumerStaples-background via-white/2 to-consumerStaples-background'];
    case 'Energy': return ['border-energy-border', 'bg-energy-background', 'from-energy-background via-white/2 to-energy-background'];
    case 'Finance': return ['border-finance-border', 'bg-finance-background', 'from-finance-background via-white/2 to-finance-background'];
    case 'Health Care': return ['border-healthCare-border', 'bg-healthCare-background', 'from-healthCare-sbackground via-white/2 to-healthCare-sbackground'];
    case 'Industrials': return ['border-industrials-border', 'bg-industrials-background', 'from-industrials-background via-white/2 to-industrials-background'];
    case 'Real Estate': return ['border-realEstate-border', 'bg-realEstate-background', 'from-realEstate-background via-white/2 to-realEstate-background'];
    case 'Technology': return ['border-technology-border', 'bg-technology-background', 'from-technology-background via-white/2 to-technology-background'];
    case 'Telecommunications': return ['border-telecommunication-border', 'bg-telecommunication-background', 'from-telecommunication-background via-white/2 to-telecommunication-background'];
    case 'Utilities': return ['border-utilities-border', 'bg-utilities-background', 'from-utilities-background via-white/2 to-utilities-background'];
    default: return ['border-cardDefault-border', 'bg-cardDefault-background', 'from-cardDefault-background via-white/2 to-cardDefault-background'];
  }
}


export function getTagIcons(tags: string[]): string[] {
  const tagIcons: string[] = [];
  if (tags.includes('sp')) {
    tagIcons.push('/data/sptag.png');
  }

  //add more tags here

  return tagIcons;
}

// Returns the base graphic for a pack, based on the pack type
export function getPackImage(packType: string): string {
  switch (packType) {
    case 'basic': return '/data/basic_pack.png';
    case 'epic': return '/data/epic_pack.png';
    case 'legendary': return '/data/legendary_pack.png';
    default: return '/data/basic_pack.png';
  }
}
