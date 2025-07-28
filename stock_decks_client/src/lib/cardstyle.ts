// src/lib/colors.ts

export function getSectorColor(sector: string): [string, string] {
  switch (sector) {
    case 'Basic Materials': return ['rgba(143, 87, 57, 1)', 'rgba(238, 213, 200, 1)'];
    case 'Consumer Discretionary': return ['rgb(255, 111, 0)', 'rgb(255, 235, 205)'];
    case 'Consumer Staples': return ['rgb(156, 204, 101)', 'rgb(234, 247, 220)'];
    case 'Energy': return ['rgb(255, 202, 40)', 'rgb(255, 245, 200)'];
    case 'Finance': return ['rgb(33, 37, 41)', 'rgb(220, 222, 224)'];
    case 'Health Care': return ['rgb(76, 175, 80)', 'rgb(220, 245, 220)'];
    case 'Industrials': return ['rgb(121, 85, 72)', 'rgb(235, 225, 220)'];
    case 'Real Estate': return ['rgb(96, 125, 139)', 'rgb(220, 230, 235)'];
    case 'Technology': return ['rgb(33, 150, 243)', 'rgb(225, 240, 252)'];
    case 'Telecommunications': return ['rgb(156, 39, 176)', 'rgb(240, 215, 245)'];
    case 'Utilities': return ['rgb(63, 81, 181)', 'rgb(225, 230, 250)'];
    default: return ['rgb(158, 158, 158)', 'rgb(240, 240, 240)'];
  }
}
