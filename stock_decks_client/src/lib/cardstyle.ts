// src/lib/colors.ts
// Handles styling of different types of cards

// Returns a color based on the stock sector
export function getSectorColor(sector: string): [string, string, string] {
  switch (sector) {
    case 'Basic Materials': return ['border-basicMaterials-border', 'bg-basicMaterials-background', 'from-basicMaterials-sbackground via-white/2 to-basicMaterials-sbackground'];
    case 'Consumer Discretionary': return ['border-consumerDiscretionary-border', 'bg-consumerDiscretionary-background', 'from-consumerDiscretionary-sbackground via-white/2 to-consumerDiscretionary-sbackground'];
    case 'Consumer Staples': return ['border-consumerStaples-border', 'bg-consumerStaples-background', 'from-consumerStaples-sbackground via-white/2 to-consumerStaples-sbackground'];
    case 'Energy': return ['border-energy-border', 'bg-energy-background', 'from-energy-sbackground via-white/2 to-energy-sbackground'];
    case 'Finance': return ['border-finance-border', 'bg-finance-background', 'from-finance-sbackground via-white/2 to-finance-sbackground'];
    case 'Health Care': return ['border-healthCare-border', 'bg-healthCare-background', 'from-healthCare-sbackground via-white/2 to-healthCare-sbackground'];
    case 'Industrials': return ['border-industrials-border', 'bg-industrials-background', 'from-industrials-sbackground via-white/2 to-industrials-sbackground'];
    case 'Real Estate': return ['border-realEstate-border', 'bg-realEstate-background', 'from-realEstate-sbackground via-white/2 to-realEstate-sbackground'];
    case 'Technology': return ['border-technology-border', 'bg-technology-background', 'from-technology-sbackground via-white/2 to-technology-sbackground'];
    case 'Telecommunications': return ['border-telecommunication-border', 'bg-telecommunication-background', 'from-telecommunication-sbackground via-white/2 to-telecommunication-sbackground'];
    case 'Utilities': return ['border-utilities-border', 'bg-utilities-background', 'from-utilities-sbackground via-white/2 to-utilities-sbackground'];
    default: return ['border-cardDefault-border', 'bg-cardDefault-background', 'from-cardDefault-sbackground via-white/2 to-cardDefault-sbackground'];
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
