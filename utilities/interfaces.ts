export interface IPokemonMinimal {
    pokemon_identifier: string,
    gif: string,
    type: Array<string>,
    id: number
}

interface IStat {
    stat_identifier: string,
    base_stat: number,
    stat_id: number
}

interface IAbilitie {
    abilitie_id: number,
    abilitie_identifier: string,
    abilitie_short_effect: string
}

export interface IPokemon {
    id: number
    pokemon_identifier: string,
    image: string,
    gif: string,
    type: Array<string>,
    stats: Array<IStat>,
    abilities: Array<IAbilitie>
}