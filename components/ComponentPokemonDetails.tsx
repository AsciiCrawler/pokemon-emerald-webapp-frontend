'use client';
import { getPokemonById } from '@/utilities/api';
import { IPokemon, IPokemonMinimal } from '@/utilities/interfaces';
import { Dispatch, Fragment, SetStateAction, useEffect, useState } from 'react';
import { ComponentType } from './ComponentPokemon';
const ComponentPokemonDetails = ({ id, setId }: { id: number, setId: Dispatch<SetStateAction<number>> }) => {
    const [data, setData] = useState<IPokemon | null>(null)

    useEffect(() => {
        if (id > 0) {
            getPokemonById(id).then(data => {
                setData(data);
            }).catch(err => {
                console.error(err);
                setData(null);
            })
        }
    }, [id]);

    if (id < 0 || data == null)
        return null;

    return (
        <div onClick={() => {
            setId(-1);
            setData(null);
        }} className='top-0 left-0 w-full h-full fixed bg-black bg-opacity-40 flex justify-center items-center backdrop-blur-sm'>
            <div onClick={(event) => {
                event.stopPropagation();
            }} className='bg-white flex flex-col p-6 rounded-xl drop-shadow-xl'>
                <span className='flex font-bold text-xl mb-4'>
                    {data.pokemon_identifier}
                </span>
                <div className='flex'>
                    <div className='w-32 h-32 flex drop-shadow-sm bg-gray-200 rounded-xl'>
                        <img className='w-full h-full object-contain' src={data.gif} alt="" />
                    </div>
                    <div className='flex flex-col mx-8'>
                        <div className='flex mb-4'>
                            <span className='w-20'>Type: </span>
                            <div className='flex w-36'>
                                {data.type.map(type => {
                                    return <ComponentType type={type} />
                                })}
                            </div>
                        </div>

                        <div className='flex items-center'>
                            <span className='w-20'>Abilities: </span>
                            <div className='flex flex-col'>
                                {data.abilities.map(abilitie => {
                                    return <div>{abilitie.abilitie_identifier}</div>
                                })}
                            </div>
                        </div>
                    </div>

                    <div className='flex flex-col mx-8'>
                        <div className='flex items-center'>
                            <div className='flex flex-col'>
                                {
                                    data.stats.sort((a, b) => a.stat_id - b.stat_id).map(stat => {
                                        return (
                                            <div className='flex'>
                                                <span className='w-36'>{stat.stat_identifier}: </span>
                                                <div>{stat.base_stat}</div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        </div>
    )
}

export default ComponentPokemonDetails;