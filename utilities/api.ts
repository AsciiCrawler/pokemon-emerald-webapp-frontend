import axios from "axios";
import { IPokemon, IPokemonMinimal } from "./interfaces";
export const getAllPokemonsMinimal = async (): Promise<Array<IPokemonMinimal>> => {
    return await axios.get(`${process.env.NEXT_PUBLIC_API}/pokemon/get-all`).then(({ data }) => {
        let arr: Array<IPokemonMinimal> = [];

        for (const key in data) {
            let element: IPokemonMinimal = data[key];
            element.pokemon_identifier = element.pokemon_identifier.replace("-", " ");
            arr.push(element);
        }

        arr = arr.sort((a, b) => a.id - b.id);
        return arr;
    }).catch(err => {
        return err;
    })
}

export const getPokemonById = async (id: number): Promise<IPokemon> => {
    return await axios.get(`${process.env.NEXT_PUBLIC_API}/pokemon/get/${id}`).then(({ data }: { data: IPokemon }) => {
        return data;
    }).catch(err => {
        return err;
    })
}