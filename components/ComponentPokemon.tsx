'use client';
import { IPokemonMinimal } from '@/utilities/interfaces';
import { Paper } from '@mui/material';
import { Dispatch, SetStateAction } from 'react';

const getTypeColor = (type: string) => {
    switch (type) {
        case 'grass': return '#9bcc50';
        case 'poison': return '#b97fc9';
        case 'fire': return '#fd7d24';
        case 'flying': return '#3dc7ef';
        case 'water': return '#4592c4';
        case 'bug': return '#729f3f';
        case 'normal': return '#a4acaf';
        case 'electric': return '#eed535';
        case 'ground': return '#ab9842';
        case 'fighting': return '#d56723';
        case 'psychic': return '#f366b9';
        case 'rock': return '#a38c21';
        case 'steel': return '#9eb7b8';
        case 'ice': return '#51c4e7';
        case 'ghost': return '#7b62a3';
        case 'dragon': return '#f16e57';
        case 'dark': return '#707070';
        default: return 'black';
    }
}

export const ComponentType = ({ type }: { type: string }) => {
    return (
        <div style={{ backgroundColor: getTypeColor(type) }} className='w-[50%] first:mr-[3px] last:ml-[3px] second text-center justify-center items-center py-[2px] rounded-md'>
            <span className='font-bold text-white'>{type}</span>
        </div>
    )
}

const ComponentPokemon = ({ pokemon, setId }: { pokemon: IPokemonMinimal, setId: Dispatch<SetStateAction<number>> }) => {
    return (
        <Paper onClick={() => { setId(pokemon.id); }} className='flex flex-col justify-center items-center w-[calc(25%-16px)] mx-2 my-4 px-2 py-2 transition-all hover:-translate-y-3 hover:brightness-90'>
            <div className='aspect-square w-full rounded-xl'>
                <img className='w-full h-full object-contain' loading='lazy' src={pokemon.gif} alt={pokemon.gif} />
            </div>

            <span className='px-[12px] text-left w-full text-gray-500 font-bold text-sm'>#{pokemon.id}</span>
            <span className='px-[12px] text-left w-full font-bold text-xl mb-2'>{pokemon.pokemon_identifier}</span>
            <div className='px-[12px] flex w-full'>
                {pokemon.type.map((type: string) => <ComponentType key={pokemon.id + "-" + type} type={type} />)}
            </div>
        </Paper>
    )
}

export default ComponentPokemon;