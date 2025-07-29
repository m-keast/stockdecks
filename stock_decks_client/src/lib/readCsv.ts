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
};


// Returns a random stock from the CSV file
export function readRandomStock(): Promise<StockRecord> {
  return new Promise((resolve, reject) => {
    const results: StockRecord[] = [];

    const csvPath = path.join(process.cwd(), 'public', 'data', 'companies.csv');

    fs.createReadStream(csvPath)
      .pipe(csv())
      .on('data', (data) => {
        const keys = Object.keys(data);
        const symbol = data[keys[0]];  //CSV column 0
        const stockname = data[keys[1]]; //CSV column 1
        const sector = data[keys[10]]; //CSV column 10
        const description = data[keys[12]]; //CSV column 12
        const imgurl = data[keys[13]];    //CSV column 13
        if (symbol && stockname && sector && description && imgurl) {
          results.push({ symbol, stockname, sector, description, imgurl });
        }
      })
      .on('end', () => {
        if (results.length === 0) return reject(new Error('No valid stocks found'));
        const random = results[Math.floor(Math.random() * results.length)];
        resolve(random);
      })
      .on('error', reject);
  });
}
