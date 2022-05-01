import React, { useEffect, useState } from 'react';
import { InitialBoardState, Piece, TeamType, MoveContinuation, ProcessBestMoves, ProcessEval } from '../../Constants';
import Chessboard from '../Chessboard/Chessboard';
import Evaluation from '../Evaluation/Evaluation';
import Navigation from '../Navigation/Navigation';
import Engine from "../Engine/Engine";
import "./Controller.css";

import { StockFish } from '../../Services/Engine';

export default function Controller(){

    const [Eval, setEval] = useState<string>("+0.00");
    const [boardStates, setBoardStates] = useState<Piece[][]>([InitialBoardState]);
    const [boardStateIndex, setBoardStateIndex] = useState<number>(0);

    useEffect(() => {
        let element = document.getElementById('controller')
        if(element){
            element.addEventListener('keydown', HandleKeyboardNavigation)
        }
    });

    function updateEval(updatedEval : string){
        setEval(updatedEval);
    }

    function BoardController(Pieces : Piece[], currentMove: TeamType){
        
        boardStates[boardStateIndex + 1] = Pieces;


        var updatedBoardState = boardStates.filter(function(value, index, boardStates){
            return index <= boardStateIndex+1;
        });

        setBoardStates(updatedBoardState);
        setBoardStateIndex(boardStateIndex+1);

    }

    function HandleNavigation(action: string){
        if(action === 'first'){
            setBoardStateIndex(0);
        }
        if(action === 'final'){
            console.log(boardStates);
            
            setBoardStateIndex(boardStates.length - 1);
        }
        if(action === 'next'){
            setBoardStateIndex((boardStates.length > boardStateIndex+1)? boardStateIndex + 1 : boardStateIndex);
        }if(action === 'previous'){
            setBoardStateIndex((boardStateIndex >= 1)? boardStateIndex - 1 : boardStateIndex);
        }
    }

    function HandleKeyboardNavigation(e : any){
        if(e.key === 'ArrowLeft'){
            setBoardStateIndex((boardStateIndex >= 1)? boardStateIndex - 1 : boardStateIndex);
        }else if(e.key === 'ArrowRight'){
            setBoardStateIndex((boardStates.length > boardStateIndex+1)? boardStateIndex + 1 : boardStateIndex);
        }
        
    }

    return(
        <div id="controller" className='controller'>
            <Navigation/>
            <Evaluation Eval={Eval}/>
            <Chessboard BoardController={BoardController} boardState={boardStates[boardStateIndex]} boardStateIndex={boardStateIndex}/>

            <Engine boardState={boardStates[boardStateIndex]} boardStateIndex={boardStateIndex} HandleNavigation={HandleNavigation} updateEval={updateEval}/>
              
        </div>
    )
}