/**
 * The four Elements.
 */
export enum Elements {
  Fire = "Fire",
  Water = "Water",
  Earth = "Earth",
  Wind = "Wind",
}

export interface Idol {
  /**
   * A unique identifier for the Idol.
   * The Element possessing the Idol.
   */
  id: Elements;
}
