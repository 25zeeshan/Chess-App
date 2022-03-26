import React from 'react';
import { InitialBoardState, Piece } from '../../Constants';
import Chessboard from '../Chessboard/Chessboard';
import Evaluation from '../Evaluation/Evaluation';
import "./Controller.css";

export default function Controller(){

    const CurrentPieces = (updatedPieces : Piece[]) => {
        console.log(updatedPieces);
    }

    return(
        <div id="controller" className='controller'>
            <Evaluation value="+0.00"/>
            <Chessboard setCurrentPieces={CurrentPieces}/>
        </div>
    )
}