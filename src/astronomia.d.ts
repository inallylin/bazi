declare module 'astronomia/data/vsop87Bearth' {
  const vsop87Bearth: object
  export default vsop87Bearth
}

declare module 'astronomia/planetposition' {
  export class Planet {
    constructor(planet: object)
    position2000(jde: number): { lon: number; lat: number; range: number }
    position(jde: number): { lon: number; lat: number; range: number }
  }
  export function toFK5(lon: number, lat: number, jde: number): { lon: number; lat: number }
  const _default: { Planet: typeof Planet; toFK5: typeof toFK5 }
  export default _default
}

declare module 'astronomia/solstice' {
  import type { Planet } from 'astronomia/planetposition'
  export function march(y: number): number
  export function june(y: number): number
  export function september(y: number): number
  export function december(y: number): number
  export function march2(year: number, planet: Planet): number
  export function june2(year: number, planet: Planet): number
  export function september2(year: number, planet: Planet): number
  export function december2(year: number, planet: Planet): number
  export function longitude(year: number, planet: Planet, lon: number): number
  const _default: {
    march: typeof march
    june: typeof june
    september: typeof september
    december: typeof december
    march2: typeof march2
    june2: typeof june2
    september2: typeof september2
    december2: typeof december2
    longitude: typeof longitude
  }
  export default _default
}
