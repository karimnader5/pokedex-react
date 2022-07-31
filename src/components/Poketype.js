import React from 'react';
import '../css/Poketype.css';

export default function Poketype({ type }) {
    return <p className={`t-type type-${type}`}>{type}</p>;
}
