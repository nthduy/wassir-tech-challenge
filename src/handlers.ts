import { FastifyReply, FastifyRequest } from "fastify";
import { getPokemonFullTypes, getPokemonWithStat } from "./services/pokemon.service";

export async function getPokemonByName(
    request: FastifyRequest,
    reply: FastifyReply
) {
    const name: string = request.params["name"];
    const params = {};

    // if (name !== null && name.trim() !== "") {
    //     urlApiPokeman = `${ urlApiPokeman }/${ name }`;
    // } else {
    //     params['offset'] = 20;
    //     params['limit'] = 20;
    // }

    const pokemon = await getPokemonWithStat(name);
    const types = await getPokemonFullTypes(pokemon);

    reply.headers({
        'Content-Type': "application/json"
    });

    reply.send({
        pokemon,
        types
    })
}
