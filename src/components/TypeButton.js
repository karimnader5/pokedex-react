import React from 'react'
import '../css/TypeButton.css'

export default function TypeButton({ type, typeFilter }) {
  return (
    <div className="col-2 typeButton">
        <img src={require(`../img/${type}.png`)} height="50px" width="50x" alt={type} onClick={() => typeFilter(type)}></img>
    </div>
  )
}