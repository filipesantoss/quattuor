/**
 * The four Elements.
 */
export enum Elements {
  Fire = "FIRE",
  Water = "WATER",
  Earth = "EARTH",
  Wind = "WIND",
}

export interface Idol {
  /**
   * A unique identifier for the Idol.
   * The Element possessing the Idol.
   */
  id: Elements;
}

export function succumbs(this: Idol, element: Elements): boolean {
  switch (this.id) {
    case Elements.Earth:
      return element === Elements.Wind;
    case Elements.Fire:
      return element === Elements.Water;
    case Elements.Water:
      return element === Elements.Earth;
    case Elements.Wind:
      return element === Elements.Fire;
    default:
      throw Error();
  }
}

export function conquers(this: Idol, element: Elements): boolean {
  if (element === this.id) {
    return true;
  }

  switch (this.id) {
    case Elements.Earth:
      return element === Elements.Water;
    case Elements.Fire:
      return element === Elements.Wind;
    case Elements.Water:
      return element === Elements.Fire;
    case Elements.Wind:
      return element === Elements.Earth;
    default:
      throw Error();
  }
}
