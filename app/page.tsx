'use client';
import ComponentPokemon from '@/components/ComponentPokemon';
import ComponentPokemonDetails from '@/components/ComponentPokemonDetails';
import { getAllPokemonsMinimal } from '@/utilities/api'
import { IPokemonMinimal } from '@/utilities/interfaces';
import { Input, MenuItem, Paper, Select, TextField } from '@mui/material';
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
        <main className="flex flex-col items-center justify-center w-full">
            <div className='z-10 max-w-[320px] w-[40%] flex my-12'>
                <img className='w-full object-contain' src="/pokemon.webp" alt="" />
            </div>

            <Paper className='flex w-full max-w-5xl pl-4 z-10 py-2'>
                <TextField className='mx-4' variant='outlined' placeholder='Search by name' onChange={event => { setRegex(event.target.value); }} type="text" name="regex" id="regex" />
                
                <Select className='mx-4' variant='outlined' value={sort} onChange={event => {
                    if (event.target.value === "SORT_A_Z" || event.target.value === "SORT_Z_A" || event.target.value === "SORT_NUMBER")
                        setSort(event.target.value);
                }} name="" id="">
                    <MenuItem value="SORT_NUMBER">{`By Number`}</MenuItem>
                    <MenuItem value="SORT_A_Z">{`A -> Z`}</MenuItem>
                    <MenuItem value="SORT_Z_A">{`Z -> A`}</MenuItem>
                </Select>

                <Select className='mx-4' variant='outlined' value={filter} onChange={event => {
                    if (event.target.value === "all" || event.target.value === "normal" || event.target.value === "fighting" || event.target.value === "flying" || event.target.value === "poison" || event.target.value === "ground" || event.target.value === "rock" || event.target.value === "bug" || event.target.value === "ghost" || event.target.value === "steel" || event.target.value === "fire" || event.target.value === "water" || event.target.value === "grass" || event.target.value === "electric" || event.target.value === "psychic" || event.target.value === "ice" || event.target.value === "dragon" || event.target.value === "dark")
                        setFilter(event.target.value);
                }} name="" id="">
                    <MenuItem value={"all"}></MenuItem>
                    <MenuItem value="all">{`all`}</MenuItem>
                    <MenuItem value="normal">{`normal`}</MenuItem>
                    <MenuItem value="fighting">{`fighting`}</MenuItem>
                    <MenuItem value="flying">{`flying`}</MenuItem>
                    <MenuItem value="poison">{`poison`}</MenuItem>
                    <MenuItem value="ground">{`ground`}</MenuItem>
                    <MenuItem value="rock">{`rock`}</MenuItem>
                    <MenuItem value="bug">{`bug`}</MenuItem>
                    <MenuItem value="ghost">{`ghost`}</MenuItem>
                    <MenuItem value="steel">{`steel`}</MenuItem>
                    <MenuItem value="fire">{`fire`}</MenuItem>
                    <MenuItem value="water">{`water`}</MenuItem>
                    <MenuItem value="grass">{`grass`}</MenuItem>
                    <MenuItem value="electric">{`electric`}</MenuItem>
                    <MenuItem value="psychic">{`psychic`}</MenuItem>
                    <MenuItem value="ice">{`ice`}</MenuItem>
                    <MenuItem value="dragon">{`dragon`}</MenuItem>
                    <MenuItem value="dark">{`dark`}</MenuItem>
                </Select>
            </Paper>
            <div className='flex w-full max-w-5xl flex-wrap z-10'>
                {pokmeonElements}
            </div>
            {typeof window !== 'undefined' && createPortal(<ComponentPokemonDetails setId={setId} id={id} />, document.body)}
            {typeof window !== 'undefined' && createPortal(<div className='background-emerald fixed top-0 left-0 w-full h-full'></div>, document.body)}
            
        </main>
    )
}