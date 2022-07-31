import React from 'react';
import '../css/Pokecard.css';
import Poketype from './Poketype.js';

export default function Pokecard(props) {
    function fullPartyAlert() {
        props.setPartyFull(true);
    }
    function addToParty() {
        if (props.party.length < 6) {
            if (props.party.indexOf(props.name) === -1) {
                props.setParty((oldParty) => [...oldParty, props.name]);
            }
        } else {
            fullPartyAlert();
        }
    }
    return (
        <div className={`card col-md-3 col-sm-6 order-${props.order}`}>
            <img
                className='card-img-top pokeimg'
                src={props.sprites.front_default}
                alt='sprite'></img>
            <div className='card-body'>
                <h5 className='card-title text-center'>
                    {props.name.charAt(0).toUpperCase() + props.name.slice(1)}
                </h5>
                <div className='text-center'>
                    {props.types.map((index) => {
                        return (
                            <Poketype key={index.slot} type={index.type.name} />
                        );
                    })}
                </div>
            </div>
            {props.party ? (
                <button onClick={() => addToParty()}>
                    <span>+</span>
                </button>
            ) : null}
        </div>
    );
}
