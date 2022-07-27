import React from 'react';
import '../css/Pokesearch.css'
import types from './Types.js'
import TypeButton from './TypeButton.js'

const Pokesearch = ({ search, setSearch, typeFilter }) => {

  return (
    <div id="pokesearch">
        <div className="input-group input-group-lg">
          <span className="input-group-text" id="inputGroup-sizing-lg">Search by Name</span>
          <input
              className="form-control"
              aria-label="Large"
              aria-describedby="inputGroup-sizing-sm"
              value={search}
              onChange={(e) => setSearch(e.target.value.toLowerCase())}>
          </input>
        </div>
        <div className="row typeSearch">
          {types.map(type => {
            return (
            <TypeButton type={type} key={type} typeFilter={typeFilter}/>
            )
          })}
        </div>
    </div>
  )
}

export default Pokesearch