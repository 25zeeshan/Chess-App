import React, { useState } from 'react';
import { Piece } from '../../Constants';
import Chessboard from '../Chessboard/Chessboard';
import Navigation from "../Navigation/Navigation";
import SetupBoard from '../SetupBoard/SetupBoard';
import "./Setup.css";

export default function Setup(){
    const [boardState, setBoardState] = useState<Piece[]>([]);

    function updateBoardState(updatedPieces : Piece[]){
        setBoardState(updatedPieces);
    }

    return(
        <div id="Setup">

            <Navigation />
            <SetupBoard boardState={boardState} updateBoard={updateBoardState}/>
        </div>
    );
}