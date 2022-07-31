import React from 'react';
import '../css/Pokesearch.css';
import types from './Types.js';
import TypeButton from './TypeButton.js';

const Pokesearch = ({
    search,
    setSearch,
    typeFilter,
    clearFilter,
    selectedType,
}) => {
    return (
        <div id='pokesearch'>
            <div className='nameSearch'>
                <h5>Search by Name</h5>
                <input
                    className='form-control'
                    aria-label='Large'
                    aria-describedby='inputGroup-sizing-sm'
                    value={search}
                    onChange={(e) =>
                        setSearch(e.target.value.toLowerCase())
                    }></input>
            </div>

            <div className='typeSearch'>
                <h5>Search by Type</h5>
                <div className='row typeIcons'>
                    {types.map((type) => {
                        return (
                            <TypeButton
                                type={type}
                                key={type}
                                typeFilter={typeFilter}
                            />
                        );
                    })}
                    <div className='col-2 typeButton'>
                        <span onClick={() => clearFilter()}>Clear</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Pokesearch;
