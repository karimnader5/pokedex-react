import React, { useEffect, useState } from 'react';
import Pokecard from './Pokecard'; 
import Pokesearch from './Pokesearch';
import '../css/Pokelist.css'

export default function Pokelist() { 

    const [pokedex, setPokedex] = useState(null); 
    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState(null);
    const [pokemonArray, setPokemonArray] = useState([]);
    const [pokemonArray2, setPokemonArray2] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const [isLoading2, setIsLoading2] = useState(true);

    useEffect(() => {
        fetch("https://pokeapi.co/api/v2/pokemon?limit=151&offset=0")
        .then(result => result.json())
        .then(data => {
            setPokedex(data.results.slice(0, 151));
            setIsLoading(false);
            })
        }, [])

    useEffect(() => {
        if(isLoading === false) {
            pokedex.map(pokemon => {
                fetch(pokemon.url)
                .then(response => response.json())
                .then(data => {
                    setPokemonArray(pokemonArray.push(data));
                    setSearchResults(pokemonArray);
                    setPokemonArray2(pokemonArray);
                    setIsLoading2(false);
                })});
        }
    }, [isLoading])

    useEffect(() => {
        if(isLoading2 == false) {
            setSearchResults(pokemonArray2.filter(pokemon => pokemon.name.includes(search)))
            }
    }, [search])

    function typeFilter(type) {
        console.log(pokemonArray2[0].types)
        setSearchResults(pokemonArray2)
        setSearchResults(pokemonArray2 => pokemonArray2.filter(pokemon => pokemon.types[0].type.name == type || (pokemon.types[1] ? pokemon.types[1].type.name == type : "")));
    }

    if(searchResults != null && isLoading2 == false) {
        return (
        <div className="pokelist">
            <div className="row">
                <Pokesearch search={search} setSearch={setSearch} typeFilter={typeFilter}/>
                {search !== '' ? (<p>Searching for {search}...</p>) : ""}
            </div>
            <div className="row pokecards">
            {searchResults.map(pokemon => {
                    return (
                        <Pokecard key={pokemon.name} name={pokemon.name} types={pokemon.types} sprites={pokemon.sprites} search={search}/>
                    )
                })}
            </div>
        </div>
        );
    }
    }