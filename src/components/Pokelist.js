import React, { useEffect, useState } from 'react';
import Pokecard from './Pokecard';
import Pokesearch from './Pokesearch';
import '../css/Pokelist.css';

export default function Pokelist() {
    const [pokedex, setPokedex] = useState(null);
    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState(null);
    const [pokemonArray, setPokemonArray] = useState([]);
    const [pokemonArray2, setPokemonArray2] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isLoading2, setIsLoading2] = useState(true);
    const [selectedType, setSelectedType] = useState('');
    const [party, setParty] = useState([]);
    const [searchingFor, setSearchingFor] = useState('');
    const [partyFull, setPartyFull] = useState(false);

    const fetchPokedex = () => {
        fetch('https://pokeapi.co/api/v2/pokemon?limit=151&offset=0')
            .then((result) => result.json())
            .then((data) => {
                setPokedex(data.results.slice(0, 151));
                setIsLoading(false);
            });
    };

    // eslint-disable-next-line
    const fetchPokemon = () => {
        // eslint-disable-next-line
        pokedex.map((pokemon) => {
            fetch(pokemon.url)
                .then((response) => response.json())
                .then((data) => {
                    setPokemonArray(() => (pokemonArray[data.id] = data));
                    setIsLoading2(false);
                })
                .catch((error) => {
                    console.log(error);
                    setIsLoading2(false);
                });
        });
    };

    useEffect(() => {
        fetchPokedex();
    }, []);

    useEffect(() => {
        if (isLoading === false && pokemonArray.length === 0) {
            fetchPokemon();
            setSearchResults(pokemonArray);
            setPokemonArray2(pokemonArray);
        }
    }, [isLoading]);

    useEffect(() => {
        if (isLoading2 === false) {
            setSearchResults(
                pokemonArray2.filter((pokemon) => pokemon.name.includes(search))
            );
        }
        setSelectedType('');
    }, [search]);

    function typeFilter(type) {
        clearFilter();
        setSearchResults((pokemonArray2) =>
            pokemonArray2.filter(
                (pokemon) =>
                    pokemon.types[0].type.name === type ||
                    (pokemon.types[1]
                        ? pokemon.types[1].type.name === type
                        : '')
            )
        );
        setSelectedType(type);
    }

    function clearFilter() {
        setSearchResults(pokemonArray2);
        setSelectedType('');
        setSearch('');
    }

    const partyFullAlert = (
        <div className='alert alert-danger party-full'>
            <p>Party Full</p>
        </div>
    );

    useEffect(() => {
        if (partyFull === true) {
            setTimeout(() => setPartyFull(false), 1000);
        }
    }, [partyFull]);

    useEffect(() => {
        if (search !== '') {
            setSearchingFor(`Searching for ${search}...`);
        } else if (selectedType !== '') {
            setSearchingFor(`Displaying ${selectedType} type Pokemon`);
        } else {
            setSearchingFor('');
        }
    }, [search, selectedType]);

    if (searchResults != null && isLoading2 === false) {
        return (
            <div className='pokelist'>
                <div className='search'>
                    <Pokesearch
                        search={search}
                        setSearch={setSearch}
                        typeFilter={typeFilter}
                        clearFilter={clearFilter}
                        selectedType={selectedType}
                    />
                </div>

                <div className='row party'>
                    <h5>Your Party</h5>
                    <div className='row party-members'>
                        {partyFull ? partyFullAlert : ''}
                        {party.length > 0 ? (
                            pokemonArray2
                                .filter((pokemon) =>
                                    party.includes(pokemon.name)
                                )
                                .map((pokemon) => {
                                    return (
                                        <Pokecard
                                            key={pokemon.id}
                                            name={pokemon.name}
                                            types={pokemon.types}
                                            sprites={pokemon.sprites}
                                            search={search}
                                            order={party.indexOf(pokemon.name)}
                                            setPartyFull={setPartyFull}
                                        />
                                    );
                                })
                        ) : (
                            <p>
                                Your party is Empty. <br /> Starting adding
                                party members by clicking the + button on the
                                corresponding Pokemon card.
                            </p>
                        )}
                    </div>
                </div>

                <div className='row cards'>
                    <h5>Pokedex</h5>
                    {searchingFor !== '' ? (
                        <div className='searching'>
                            <h5>{searchingFor}</h5>
                        </div>
                    ) : (
                        ''
                    )}
                    {searchResults.map((pokemon) => {
                        return (
                            <Pokecard
                                key={pokemon.id}
                                name={pokemon.name}
                                types={pokemon.types}
                                sprites={pokemon.sprites}
                                search={search}
                                party={party}
                                setParty={setParty}
                                setPartyFull={setPartyFull}
                            />
                        );
                    })}
                </div>
            </div>
        );
    }
}
