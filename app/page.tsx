'use client';
import ComponentPokemon from '@/components/ComponentPokemon';
import ComponentPokemonDetails from '@/components/ComponentPokemonDetails';
import { getAllPokemonsMinimal } from '@/utilities/api'
import { IPokemonMinimal } from '@/utilities/interfaces';
import { useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';

export default function Home() {
    const [pokemons, setPokemons] = useState<Array<IPokemonMinimal>>([]);

    const [filter, setFilter] = useState<"all" | "normal" | "fighting" | "flying" | "poison" | "ground" | "rock" | "bug" | "ghost" | "steel" | "fire" | "water" | "grass" | "electric" | "psychic" | "ice" | "dragon" | "dark">("all");
    const [sort, setSort] = useState<"SORT_A_Z" | "SORT_Z_A" | "SORT_NUMBER">("SORT_NUMBER");
    const [regex, setRegex] = useState<string>("");

    const [id, setId] = useState<number>(-1);

    useEffect(() => {
        (async () => {
            try { setPokemons(await getAllPokemonsMinimal()); } catch (error) { console.error(error); }
        })();
    }, [])

    const pokmeonElements = useMemo(() => {
        return pokemons.filter((pokemon: IPokemonMinimal) => {
            if (regex === "")
                return true;
            return pokemon.pokemon_identifier.toLowerCase().includes(regex.toLowerCase());
        }).filter((pokemon: IPokemonMinimal) => {
            if (filter === "all")
                return true;

            for (let i = 0; i < pokemon.type.length; i++)
                if (pokemon.type[i].toLowerCase().includes(filter.toLowerCase()))
                    return true;

            return false;
        }).sort((a: IPokemonMinimal, b: IPokemonMinimal) => {
            if (sort === "SORT_A_Z") {
                if (a.pokemon_identifier < b.pokemon_identifier) return -1;
                if (a.pokemon_identifier > b.pokemon_identifier) return 1;
                return 0;
            }

            if (sort === "SORT_Z_A") {
                if (a.pokemon_identifier < b.pokemon_identifier) return 1;
                if (a.pokemon_identifier > b.pokemon_identifier) return -1;
                return 0;
            }

            if (sort === "SORT_NUMBER")
                return a.id - b.id;

            return 0;
        }).map((pokemon: IPokemonMinimal) => {
            return <ComponentPokemon setId={setId} key={"pokemon_" + pokemon.pokemon_identifier} pokemon={pokemon} />
        })
    }, [pokemons, regex, sort, filter]);

    return (
        <main className="flex flex-col items-center justify-center w-full bg-white">
            <div className='flex w-full mas-w-5xl'>
                <input onChange={event => { setRegex(event.target.value); }} type="text" name="regex" id="regex" className='bg-red-400' />

                <select value={sort} onChange={event => {
                    if (event.target.value === "SORT_A_Z" || event.target.value === "SORT_Z_A" || event.target.value === "SORT_NUMBER")
                        setSort(event.target.value);
                }} name="" id="">
                    <option value="SORT_NUMBER">{`By Number`}</option>
                    <option value="SORT_A_Z">{`A -> Z`}</option>
                    <option value="SORT_Z_A">{`Z -> A`}</option>
                </select>

                <select value={filter} onChange={event => {
                    if (event.target.value === "all" || event.target.value === "normal" || event.target.value === "fighting" || event.target.value === "flying" || event.target.value === "poison" || event.target.value === "ground" || event.target.value === "rock" || event.target.value === "bug" || event.target.value === "ghost" || event.target.value === "steel" || event.target.value === "fire" || event.target.value === "water" || event.target.value === "grass" || event.target.value === "electric" || event.target.value === "psychic" || event.target.value === "ice" || event.target.value === "dragon" || event.target.value === "dark")
                        setFilter(event.target.value);
                }} name="" id="">
                    <option value="all">{`all`}</option>
                    <option value="normal">{`normal`}</option>
                    <option value="fighting">{`fighting`}</option>
                    <option value="flying">{`flying`}</option>
                    <option value="poison">{`poison`}</option>
                    <option value="ground">{`ground`}</option>
                    <option value="rock">{`rock`}</option>
                    <option value="bug">{`bug`}</option>
                    <option value="ghost">{`ghost`}</option>
                    <option value="steel">{`steel`}</option>
                    <option value="fire">{`fire`}</option>
                    <option value="water">{`water`}</option>
                    <option value="grass">{`grass`}</option>
                    <option value="electric">{`electric`}</option>
                    <option value="psychic">{`psychic`}</option>
                    <option value="ice">{`ice`}</option>
                    <option value="dragon">{`dragon`}</option>
                    <option value="dark">{`dark`}</option>
                </select>
            </div>

            {/* "normal" | "fighting" | "flying" | "poison" | "ground" | "rock" | "bug" | "ghost" | "steel" | "fire" | "water" | "grass" | "electric" | "psychic" | "ice" | "dragon" | "dark" */}

            <div className='flex w-full max-w-5xl flex-wrap'>
                {pokmeonElements}
            </div>
            {createPortal(<ComponentPokemonDetails setId={setId} id={id} />, document.body)}
        </main>
    )
}
