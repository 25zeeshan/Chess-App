import React, { useEffect, useState } from 'react';
import { MoveContinuation, CalculateFEN, TeamType, ProcessEval, ProcessBestMoves, getBoardArray, ConvertMoveToPGN } from '../../Constants';
import { StockFish, CustomEngine } from '../../Services/Engine';
import "./Engine.css";

import { usePromiseTracker, trackPromise } from "react-promise-tracker";
import Loader from '../Loader/Loader';

const LoadingIndicator = () => {
    const { promiseInProgress } = usePromiseTracker();

    return (
        promiseInProgress? 
        <div
            style={{
            width: "100%",
            height: "100",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: "30px 0"
        }}
        >
        <Loader css='' loading={true}/>
        </div>
        : <></>
    );  
}


export default function Engine(props: any){
    const [engineName, setEngineName] = useState<string>("Stockfish");
    const [depth, setDepth] = useState<number>(12);

    const [FEN, setFEN] = useState<string>("");
    const [Eval, setEval] = useState<string>("");
    const [BestMoves, setBestMoves] = useState<MoveContinuation[]>([]);

    var currentMove = props.boardStateIndex%2 === 0 ? TeamType.OUR : TeamType.OPPONENT;

    useEffect(() => {
        
        var updatedFEN = CalculateFEN(props.boardState, currentMove);
        setFEN(updatedFEN);
        setBestMoves([]);

        if(engineName === 'Stockfish'){
            getStockfishMoves(updatedFEN);
        }else{
            getCustomEngineMoves(updatedFEN);
        }
        
    },[props.boardState, props.boardStateIndex])


    function getStockfishMoves(updatedFEN : string){
        trackPromise(
            StockFish(updatedFEN, depth).then(res => {
                var updatedEval = ProcessEval(res, currentMove);
                var updatedBestMoves = ProcessBestMoves(res, props.boardState, currentMove);
                console.log(updatedBestMoves);
                props.updateEval(updatedEval);
                setBestMoves(updatedBestMoves);
            }).catch(err => { console.log(err) })
        );
    }

    function ExitAnalysis(){
        props.resetAnalysis();
    }

    function SelectStockfish(){
        const elements = document.querySelectorAll('.radio-inputs .radio');
        setEngineName('Stockfish');
        elements.forEach(ele => {
            
            if(ele.innerHTML === 'Stockfish'){
                ele.classList.add('selected');
            }else{
                ele.classList.remove('selected');
            }
        })
        setBestMoves([]);
        setDepth(15);
        getStockfishMoves(FEN);
    }

    function getCustomEngineMoves(updatedFEN: string){
        const castleRights = updatedFEN.split(" ")[2];
        let castleRightsArray = [0,0,0,0]
        if(castleRights.includes('K')){
            castleRightsArray[0]=1;
        }if(castleRights.includes('k')){
            castleRightsArray[1]=1;
        }if(castleRights.includes('Q')){
            castleRightsArray[2]=1;
        }if(castleRights.includes('q')){
            castleRightsArray[3]=1;
        }
        
        let boardArray = getBoardArray(props.boardState);
        trackPromise(
            CustomEngine(boardArray, currentMove === TeamType.OUR? 'white' : 'black', updatedFEN, castleRightsArray).then(res => {
                var move = ConvertMoveToPGN(res, props.boardState);
                
                setBestMoves([{move : move, eval: "0.00"}]);
            }).catch(err => console.log(err))
        );
    }

    function SelectCustom(){
        const elements = document.querySelectorAll('.radio-inputs .radio');
        setEngineName('Custom');
        elements.forEach(ele => {
            
            if(ele.innerHTML === 'Custom'){
                ele.classList.add('selected');
            }else{
                ele.classList.remove('selected');
            }
        })
        props.updateEval("0.00");
        setBestMoves([]);
        setDepth(3);
        getCustomEngineMoves(FEN);
    }

    return(
        <div id="engine">
        
            <div className="heading">Engine: {engineName} | depth: {depth}</div>

            <div className='divider'></div>

            
            <div className='engine-moves-container'>
            <LoadingIndicator />
            {
                BestMoves.map((Move: MoveContinuation, index: number)=> (
                    <EngineMoves key={index} eval={Move.eval} move={Move.move} moveNumber={Math.ceil((props.boardStateIndex+1)/2)} currentMove={currentMove} />
                ))
            }
            </div>

            <div className='divider'></div>
            
            <div className='engine-inputs'>
                <div className='radio-inputs'>
                    <div className='radio selected' onClick={SelectStockfish}>Stockfish</div>
                    <div className='radio' onClick={SelectCustom}>Custom</div>
                </div>
                <div className='depth-input'>
                    <label htmlFor="depth">Engine Depth </label>
                    <input type="number" min="1" max="25" name="depth" value={depth} onChange={(e) => { setDepth(parseInt(e.target.value)) }}/>
                </div>
            </div>

            <div className='divider'></div>

            <div className='close-analysis'>
                <div onClick={ExitAnalysis}><i className="fa-solid fa-right-from-bracket"></i>  Exit Analysis</div>
            </div>

            <div className='fen'>
                <input type="text" value={FEN} onChange={()=> {}}/>
            </div>

            <div className='navigate-moves'>
                <div className='first-move' onClick={() => props.HandleNavigation('first')}>
                    <i className="fa fa-fast-backward" aria-hidden="true"></i>
                </div>
                <div className='previous-move' onClick={() => props.HandleNavigation('previous')}>
                    <i className="fa fa-step-backward" aria-hidden="true"></i>
                </div>
                <div className='next-move' onClick={() => props.HandleNavigation('next')}>
                    <i className="fa fa-step-forward" aria-hidden="true"></i>
                </div>
                <div className='final-move' onClick={() => props.HandleNavigation('final')}>
                    <i className="fa fa-fast-forward" aria-hidden="true"></i>
                </div>
            </div>
        </div>
    )
}


function EngineMoves(props: any){

    let EvalClass = (props.eval.charAt(0) === '+')? 'eval white' : 'eval black';

    return(
        <div className='engine-moves'>
            <div className={EvalClass}>{props.eval}</div>
            <div className='move'>
                {props.moveNumber}.
                {props.currentMove === TeamType.OPPONENT? " ...": ""}
                {" "+props.move}
            </div>            
        </div>
    );
}