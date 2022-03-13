import React from 'react';
import { InitialBoardState, Piece } from '../../Constants';
import Chessboard from '../Chessboard/Chessboard';
import "./Controller.css";

export default function Controller(){

    const CurrentPieces = (updatedPieces : Piece[]) => {
        console.log(updatedPieces);
    }

    return(
        <div id="controller" className='controller'>
            <Chessboard setCurrentPieces={CurrentPieces}/>
        </div>
    )
}