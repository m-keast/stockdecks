// src/lib/readCsv.ts
//Handles reading the CSV file containing stock data


import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';


//Data structure for a stock record
export type StockRecord = {
  symbol: string;
  stockname: string;
  sector: string;
  description: string;
  imgurl: string;
  tags: string[];
};


// Returns a random stock from the CSV file
export function readRandomStock(special: boolean): Promise<StockRecord> {
  return new Promise((resolve, reject) => {
    const results: StockRecord[] = [];

    const csvPath = path.join(process.cwd(), 'public', 'data', 'companies.csv');

    fs.createReadStream(csvPath)
      .pipe(csv())
      .on('data', (data) => {
        const keys = Object.keys(data);
        const symbol = data['Symbol']; 
        const stockname = data['Trimmed Name'];
        const sector = data['Sector'];
        const description = data['Description'];
        const imgurl = data['Image_URL'];
        const tags = (data['Tags']).split(' ').filter(Boolean);
        if (symbol && stockname && sector && description && imgurl) {
          results.push({ symbol, stockname, sector, description, imgurl, tags });
        }
      })
      .on('end', () => {
        const pool = special
          ? results.filter((r) => r.tags.length > 0)   // tagged pool
          : results.filter((r) => r.tags.length === 0); // untagged pool
        if (pool.length === 0) return reject(new Error('No matching stocks'));
        resolve(pool[Math.floor(Math.random() * pool.length)]);
      })
      .on('error', reject);
  });
}
