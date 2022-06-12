import React, { useEffect, useState } from 'react';
import { InitialBoardState, Piece, TeamType, MoveContinuation, ProcessBestMoves, ProcessEval, CalculatePositionFromFEN, PieceType } from '../../Constants';
import Chessboard from '../Chessboard/Chessboard';
import Evaluation from '../Evaluation/Evaluation';
import Navigation from '../Navigation/Navigation';
import Engine from "../Engine/Engine";
import "./Controller.css";
import { BrowserRouter as Router,Routes,Route, useLocation } from 'react-router-dom';

export default function Controller(props : any){

    const [Eval, setEval] = useState<string>("+0.00");
    const [boardStates, setBoardStates] = useState<Piece[][]>([InitialBoardState]);
    const [boardStateIndex, setBoardStateIndex] = useState<number>(0);
    const location : any = useLocation();

    useEffect(() => {
        if(location.state?.boardState){
            let SetupFEN = location.state?.FEN
            if(SetupFEN && SetupFEN !== ""){
                const boardFromFEN = CalculatePositionFromFEN(SetupFEN);
                const currentMoveFromFEN = SetupFEN.split(" ")[1] === 'w' ? TeamType.OUR : TeamType.OPPONENT;
                
                setupBoardController(boardFromFEN, currentMoveFromFEN);
            }else{
                const boardFromSetup = location.state?.boardState;
                const currentMove = location.state?.currentMove === 'White' ? TeamType.OUR : TeamType.OPPONENT;
                setupBoardController(boardFromSetup, currentMove);
            }
        }else{
            setupBoardController(InitialBoardState, TeamType.OUR);
        }
        
    }, []);

    function setupBoardController(Pieces : Piece[], currentMove : TeamType){
        if(currentMove === TeamType.OUR){
            boardStates[0] = Pieces;
            var updatedBoardState = boardStates.filter(function(value, index, boardStates){
                return index <= 0;
            });
    
            setBoardStates(updatedBoardState);
            setBoardStateIndex(0);
        }else{
            boardStates[0] = Pieces;
            boardStates[1] = Pieces;

            var updatedBoardState = boardStates.filter(function(value, index, boardStates){
                return index <= 1;
            });
            
            setBoardStates(updatedBoardState);
            setBoardStateIndex(1);
        }
    }

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
            //console.log(boardStates);
            
            setBoardStateIndex(boardStates.length - 1);
        }
        if(action === 'next'){
            setBoardStateIndex((boardStates.length > boardStateIndex+1)? boardStateIndex + 1 : boardStateIndex);
        }if(action === 'previous'){
            setBoardStateIndex((boardStateIndex >= 1)? boardStateIndex - 1 : boardStateIndex);
        }
    }

    function resetAnalysis(){
        boardStates[0] = InitialBoardState;
        var updatedBoardState = boardStates.filter(function(value, index, boardStates){
            return index <= 0;
        });

        setBoardStates(updatedBoardState);
        setBoardStateIndex(0);
    }

    return(
        <div id="controller" className='controller'>
            <Navigation/>

            <Evaluation Eval={Eval}/>
            <Chessboard BoardController={BoardController} boardState={boardStates[boardStateIndex]} boardStateIndex={boardStateIndex}/>
            <Engine boardState={boardStates[boardStateIndex]} boardStateIndex={boardStateIndex} HandleNavigation={HandleNavigation} updateEval={updateEval} resetAnalysis={resetAnalysis} />

        </div>
    )
}