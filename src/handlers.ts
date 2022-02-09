import { FastifyReply, FastifyRequest } from "fastify";
import { getListPokemon, getPokemonFullTypes, getPokemonWithStat } from "./services/pokemon.service";
import { PokemonWithStats } from "./models/PokemonWithStats";
import { Type } from "./models/Type";
import * as createError from "http-errors";

const formatPokemon = (pokemon: PokemonWithStats, types: Type[]) => {
    return {
        ...pokemon,
        types,
    }
}

const getPokemonInformation = async (name) => {
    const pokemon = await getPokemonWithStat(name).catch(err => {
        if (err.response.status === 404) {
            throw createError(404, `Pokémon ${ name } is not found !`)
        } else {
            throw createError(500, err.response.data)
        }
    });

    const types = await getPokemonFullTypes(pokemon);

    return formatPokemon(pokemon, types);
}

export async function getPokemonByName(
    request: FastifyRequest,
    reply: FastifyReply
) {
    const name: string = request.params["name"];
    reply.headers({
        'Content-Type': "application/json"
    });

    if (name) {
        const information = await getPokemonInformation(name);
        reply.send(information);
        return;
    }

    const limit: number = Number.parseInt(request.params['limit']) || 10;
    const offset: number = Number.parseInt(request.params['offset']) || 0;

    const paginatedResults = await getListPokemon(limit, offset);
    const results = await Promise.all(paginatedResults.results.map(simplePokemon => getPokemonInformation(simplePokemon.name)));

    reply.send({
        ...paginatedResults,
        results
    });
}
