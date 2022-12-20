import { Injectable } from '@nestjs/common';
import whichPolygon from 'which-polygon';
import { readFileSync } from 'fs';

console.time('load countries JSON');
const countryFile = readFileSync('./src/countries.geojson', 'utf-8');
const countryJSON = JSON.parse(countryFile);
const queryCountry = whichPolygon(countryJSON);
console.timeEnd('load countries JSON');

console.time('load pcz KML to JSON');
const pczFile = readFileSync('./src/pcz.geojson', 'utf-8');
const pczJson = JSON.parse(pczFile);
const queryPCZ = whichPolygon(pczJson);

console.log(pczJson.features[0]);
console.log(countryJSON.features[0]);

console.timeEnd('load pcz KML to JSON');

@Injectable()
export class AppService {
  lookup(coordinates: string): string {
    const [long, lat] = coordinates.split(',');

    const country = queryCountry([lat, long]);
    const pcz = queryPCZ([lat, long]);

    return { ...country, ...pcz };
  }
}
