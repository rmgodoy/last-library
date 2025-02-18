export enum EDeedType {
  light = "LIGHT",
  heavy = "HEAVY",
  mighty = "MIGHTY",
  special = "SPECIAL",
}

export type TDeed = {
  id: string;
  name: string;
  type: EDeedType;
  targetAndRange: string;
  description?: string;
  start?: string;
  base?: string;
  hit?: string;
  spark?: string;
};

export enum Stores {
  Deeds = "Deeds",
  Effects = "Effects",
  Creatures = "Creatures",
}

export enum DBS {
  Deeds = "Deeds",
  Effects = "Effects",
  Creatures = "Creatures",
}
