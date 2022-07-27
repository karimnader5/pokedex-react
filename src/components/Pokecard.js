import React, { useEffect, useState } from 'react';
import '../css/Pokecard.css'
import Poketype from './Poketype.js'

export default function Pokecard (props) { 
        return (
            <div className="card col-md-3 col-sm-6">
                <img className="card-img-top pokeimg" src={props.sprites.front_default} alt="sprite"></img>
                <div className="card-body">
                    <h5 className="card-title text-center">{props.name.charAt(0).toUpperCase() + props.name.slice(1)}</h5>
                    <div className="text-center">{props.types.map(index => {
                        return(
                            <Poketype key={index.slot} type={index.type.name} />
                        )
                        })
                    }</div>
                </div>
            </div>
        );
    }

    /**/