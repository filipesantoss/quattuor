import type { Idol } from "&/entity/idol";

export interface Card {
  id: Beasts;
  idol: Idol["id"] | null;
  moves: Move[];
}

export enum Beasts {
  Tiger = "TIGER",
  Dragon = "DRAGON",
  Frog = "FROG",
  Rabbit = "RABBIT",
  Crab = "CRAB",
  Elephant = "ELEPHANT",
  Goose = "GOOSE",
  Rooster = "ROOSTER",
  Monkey = "MONKEY",
  Mantis = "MANTIS",
  Horse = "HORSE",
  Ox = "OX",
  Crane = "CRANE",
  Boar = "BOAR",
  Eel = "EEL",
  Cobra = "COBRA",
}

export interface Move {
  dy: number;
  dx: number;
}
