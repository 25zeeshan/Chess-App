import React, { useEffect, useState } from 'react';
import { MoveContinuation, CalculateFEN, TeamType, ProcessEval, ProcessBestMoves } from '../../Constants';
import { StockFish } from '../../Services/Engine';
import "./Engine.css";

export default function Engine(props: any){
    const [engineName, setEngineName] = useState<string>("Stockfish");
    const [depth, setDepth] = useState<number>(15);

    const [FEN, setFEN] = useState<string>("");
    const [Eval, setEval] = useState<string>("");
    const [BestMoves, setBestMoves] = useState<MoveContinuation[]>([]);

    var currentMove = props.boardStateIndex%2 === 0 ? TeamType.OUR : TeamType.OPPONENT;

    useEffect(() => {
        var updatedFEN = CalculateFEN(props.boardState, currentMove);
        setFEN(updatedFEN);

        StockFish(updatedFEN, depth).then(res => {
            var updatedEval = ProcessEval(res);
            var updatedBestMoves = ProcessBestMoves(res, props.boardState);

            props.updateEval(updatedEval);
            setBestMoves(updatedBestMoves);

            console.log("stockfish");
            
            
        });
        
    },[props.boardState, props.boardStateIndex])

    function ExitAnalysis(){
        window.location.reload();
    }

    return(
        <div id="engine">
            <div className="engine-inputs">
                <label htmlFor="EngineName">Engine Name :</label>
                <input type="text" name="EngineName" id="EngineName" value={engineName} onChange={() => {}} />
                <label htmlFor="depth">Depth : </label>
                <input type="number" name="depth" id="depth" value={depth} onChange={() => {}}/>
            </div>

            <div className="divider"></div>
            
            <div className='engine-moves-container'>
            {
                BestMoves.map((Move: MoveContinuation, index: number)=> (
                    <EngineMoves key={index} eval={Move.eval} move={Move.move} moveNumber={Math.ceil((props.boardStateIndex+1)/2)} currentMove={currentMove} />
                ))
            }
            </div>

            <div className='divider'></div>
            
            <div className='move-logs'>
               Move logs will be displayed here......
            </div>

            <div className='divider'></div>

            <div className='close-analysis'>
                <div onClick={ExitAnalysis}><i className="fa-solid fa-right-from-bracket"></i>  Exit Analysis</div>
            </div>

            <div className='fen'>
                <input type="text" value={FEN}/>
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