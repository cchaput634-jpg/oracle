export type PenduleKey = "cristal" | "mermet" | "egyptien";

export interface Pendule {
  key: PenduleKey;
  name: string;
  materiau: string;
  forme: string;
  usage: string;
}

export type PenduleResult = "oui" | "non" | "neutre";
