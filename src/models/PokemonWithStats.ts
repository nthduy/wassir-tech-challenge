import { Species } from "./Species";
import { Stat } from "./Stat";
import { Type } from "./Type";

export type PokemonWithStats = {
    name: string;
    height: number;
    base_experience: number;
    averageBaseExperience: number;
    id: number;
    sprite_img: string;
    species: Species;
    url: string;
    stats: Stat[];
    types: Type[];
}
