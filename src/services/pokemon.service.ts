import * as http from "http";
import { PokemonWithStats } from "../models/PokemonWithStats";
import axios from "axios";
import { Type } from "../models/Type";
import { PaginatedResult } from "../models/PaginatedResult";
import { PokemonSimple } from "../models/PokemonSimple";

const keepAliveAgent = new http.Agent({ keepAlive: true });
const API_ENDPOINT = 'https://pokeapi.co/api/v2/';

const defaultHeaders = {
    'Accept': 'application/json'
}

const axiosConfig = {
    headers: defaultHeaders,
    httpAgent: keepAliveAgent
}

export const getPokemonWithStat = (name): Promise<PokemonWithStats> => {
    return axios.get<PokemonWithStats>(`${ API_ENDPOINT }/pokemon/${ name }`, axiosConfig).then(response => response.data);
}

export const getListPokemon = (limit: number, offset: number): Promise<PaginatedResult<PokemonSimple>> => {
    return axios.get(`${ API_ENDPOINT }/pokemon`, {
        ...axiosConfig,
        params: {
            limit,
            offset
        }
    }).then(response => response.data)
}

export const getPokemonFullTypes = (pokemon: PokemonWithStats): Promise<Type[]> => {
    return Promise.all(pokemon.types
        .map((type) => type.type)
        .map((type) => {
            return type.url;
        }).map(async (url) => {
            const typeResponse = await axios.get(url, axiosConfig);
            return typeResponse.data
        }));
}
