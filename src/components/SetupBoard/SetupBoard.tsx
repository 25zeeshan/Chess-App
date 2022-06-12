import React, { ReducerAction, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { forEachChild } from "typescript";
import { BOARD_SIZE, GRID_SIZE, HORIZONTAL_AXIS, Piece, PieceType, PIECE_SIZE, Position, samePosition, TeamType, VERTICAL_AXIS } from "../../Constants";
import Tile from "../Tile/Tile";
import './SetupBoard.css';

export default function SetupBoard(props: any){

    const setupboardRef = useRef<HTMLDivElement>(null);
    const pieces : Piece[] = JSON.parse(JSON.stringify(props.boardState));
    const [activePiece, setActivePiece] = useState<HTMLElement | null>(null);
    const [grabPosition, setGrabPosition] = useState<Position>({x: -1, y: -1});
    const [toMove, setToMove] = useState<string>('White');
    const [FEN, setFen] = useState<string>("");

    const [pickup, setPickup] = useState<Piece[]>(
        [
            { image : 'assets/images/Chess_plt60.png', position: {x : 0, y: 0}, type: PieceType.PAWN, team: TeamType.OUR },
            { image : `assets/images/Chess_blt60.png`, position: {x : 0, y: 0}, type: PieceType.BISHOP, team:TeamType.OUR },
            { image : `assets/images/Chess_nlt60.png`, position: {x : 0, y: 0}, type: PieceType.KNIGHT, team:TeamType.OUR },
            { image : `assets/images/Chess_rlt60.png`, position: {x : 0, y: 0}, type: PieceType.ROOK, team:TeamType.OUR, hasMoved : false },
            { image : `assets/images/Chess_qlt60.png`, position: {x : 0, y: 0}, type: PieceType.QUEEN, team:TeamType.OUR },
            { image : `assets/images/Chess_klt60.png`, position: {x : 0, y: 0}, type: PieceType.KING, team:TeamType.OUR, hasMoved : false },

            { image : 'assets/images/Chess_pdt60.png', position: {x : 0, y: 0}, type: PieceType.PAWN, team: TeamType.OPPONENT },
            { image : `assets/images/Chess_bdt60.png`, position: {x : 0, y: 0}, type: PieceType.BISHOP, team:TeamType.OPPONENT },
            { image : `assets/images/Chess_ndt60.png`, position: {x : 0, y: 0}, type: PieceType.KNIGHT, team:TeamType.OPPONENT },
            { image : `assets/images/Chess_rdt60.png`, position: {x : 0, y: 0}, type: PieceType.ROOK, team:TeamType.OPPONENT, hasMoved : false },
            { image : `assets/images/Chess_qdt60.png`, position: {x : 0, y: 0}, type: PieceType.QUEEN, team:TeamType.OPPONENT },
            { image : `assets/images/Chess_kdt60.png`, position: {x : 0, y: 0}, type: PieceType.KING, team:TeamType.OPPONENT, hasMoved : false },

        ]
    )

    function grabPiece(e: React.MouseEvent<HTMLDivElement, MouseEvent>){
        const element = e.target as HTMLElement;
        const setupboard = setupboardRef.current;
        if(element.classList.contains('chess-piece') && setupboard){
            setGrabPosition({
                x: Math.floor((e.clientX - setupboard.offsetLeft) / GRID_SIZE), 
                y: Math.abs(Math.ceil((e.clientY - setupboard.offsetTop - BOARD_SIZE) / GRID_SIZE)) 
            });

            //console.log(grabPosition);

            const x = e.clientX - setupboard.offsetLeft - (PIECE_SIZE/2);
            const y = e.clientY - setupboard.offsetTop - (PIECE_SIZE/2);
            
            element.style.position = 'absolute';
            element.style.left = `${x}px`;
            element.style.top = `${y}px`;

            setActivePiece(element);
        }
    }

    function movePiece(e : React.MouseEvent){
        const setupboard = setupboardRef.current;
        
        if(activePiece && setupboard){
                  
            const minX = 0;
            const minY = 0;
            const maxX = setupboard.clientWidth - PIECE_SIZE;
            const maxY = setupboard.clientHeight - PIECE_SIZE;

            const x = e.clientX - setupboard.offsetLeft - (PIECE_SIZE/2);
            const y = e.clientY - setupboard.offsetTop - (PIECE_SIZE/2);

            activePiece.style.position = 'absolute';

            if(x < minX){
                activePiece.style.left = `${minX}px`;
            }else if(x > maxX){
                activePiece.style.left = `${maxX}px`;
            }else{
                activePiece.style.left = `${x}px`;
            }

            if(y < minY){
                activePiece.style.top = `${minY}px`;
            }else if(y > maxY){
                activePiece.style.top = `${maxY}px`;
            }else{
                activePiece.style.top = `${y}px`;
            }
        };
    }

    function dropPiece(e : React.MouseEvent){
        //console.log(pieces);

        const setupboard = setupboardRef.current;
        if(activePiece && setupboard){
            const x = Math.floor((e.clientX - setupboard.offsetLeft) / GRID_SIZE);
            const y = Math.abs(Math.ceil((e.clientY - setupboard.offsetTop - BOARD_SIZE) / GRID_SIZE));
            const pieceImage = activePiece.style.backgroundImage.substring(5,activePiece.style.backgroundImage.length-2);

            const pieceDetail = activePiece.style.backgroundImage.split('/');
            if(x>=0 && x<=7 && y>=0 && y<=7){
                var newPiece : Piece = {
                    image : pieceImage,
                    position : { x : x, y: y },
                    team :  pieceDetail[2][7] === 'd' ? TeamType.OPPONENT : TeamType.OUR,
                    type : getPieceType(pieceDetail[2])
                }

                

                const updatedPieces = pieces.reduce((result, piece) => {
                    if(samePosition(grabPosition, piece.position)){
                        piece.position.x=x;
                        piece.position.y=y;

                        result.push(piece);
                    }else if(!samePosition(piece.position, newPiece.position)){
                        result.push(piece);
                    }

                    return result;
                }, [] as Piece[]);

                var samePositionIndex=-1;
                updatedPieces.forEach((piece, index) => {
                    if(samePosition(piece.position, newPiece.position)){
                        samePositionIndex = index;
                    }
                })

                if(samePositionIndex !== -1){
                    const newPieces = [...updatedPieces];
                    newPieces[samePositionIndex] = newPiece;

                    props.updateBoard(newPieces);
                }else{
                    const newPieces = [...updatedPieces];
                    newPieces.push(newPiece)
                    props.updateBoard(newPieces);
                }
        
            }

            activePiece.style.position='relative';
            activePiece.style.removeProperty('top');
            activePiece.style.removeProperty('left');

            setActivePiece(null);
        }
    }

    function getPieceType(name : string){
        if(name[6] === 'p'){
            return PieceType.PAWN;
        }if(name[6] === 'b'){
            return PieceType.BISHOP;
        }if(name[6] === 'n'){
            return PieceType.KNIGHT;
        }if(name[6] === 'q'){
            return PieceType.QUEEN;
        }if(name[6] === 'r'){
            return PieceType.ROOK;
        }if(name[6] === 'k'){
            return PieceType.KING;
        }
        return PieceType.PAWN;
    }

    function ToMovehandler(e : any){
        setToMove(e.target.value);
    }

    let board=[];
    for(let j=VERTICAL_AXIS.length - 1;j>=0;j--){
        for(let i=0; i<HORIZONTAL_AXIS.length;i++){
            const num = j+i+2;
            const piece = pieces.find(p => samePosition(p.position, {x: i, y: j}));
            let image = piece ? piece.image : undefined;

            const numericNotation = i===0 ? VERTICAL_AXIS[j] : '';
            const alphabetNotaion = j===0 ? HORIZONTAL_AXIS[i] : '';

            board.push(<Tile key={`${j},${i}`} number={num} image={image} numericNotation={numericNotation} alphabetNotaion={alphabetNotaion} />);
        }
    }

    function changeWKS(e : any){
        console.log(e.target.value);
    }

    return(
        <div id="SetupBoard" ref={setupboardRef} onMouseMove={e=> movePiece(e)} onMouseDown={e=> grabPiece(e)} onMouseUp={e=>dropPiece(e)}>
            <div className="board">
                {board}
            </div>
            
            <div className="pickup">
                
                <div className="heading">Set Up Position</div>

                <div className="piece-row">
                    <PickPiece piece={pickup[0]} />
                    <PickPiece piece={pickup[1]} />
                    <PickPiece piece={pickup[2]} />
                    <PickPiece piece={pickup[3]} />
                    <PickPiece piece={pickup[4]} />
                    <PickPiece piece={pickup[5]} />
                </div>
                <div className="piece-row">
                    <PickPiece piece={pickup[6]} />
                    <PickPiece piece={pickup[7]} />
                    <PickPiece piece={pickup[8]} />
                    <PickPiece piece={pickup[9]} />
                    <PickPiece piece={pickup[10]} />
                    <PickPiece piece={pickup[11]} />
                </div>

                <div className="to-move">
                    <input type="radio" id="whiteToMove" name="toMove" value="White" checked onChange={e => ToMovehandler(e)}/>
                    <label htmlFor="whiteToMove">White To Move</label><br/>
                    <input type="radio" id="blackToMove" name="toMove" value="Black" onChange={e => ToMovehandler(e)}/>
                    <label htmlFor="blackToMove">Black To Move</label>

                    <div className="castle-rights">
                        <div className="white color">
                            White
                            <div>
                                <input type="checkbox" name="o-o" id="o-o-w" onChange={(e) => changeWKS(e)}/>
                                <label htmlFor="o-o">O-O</label>
                            </div>
                            <div>
                                <input type="checkbox" name="o-o-o" id="o-o-o-w" />
                                <label htmlFor="o-o-o">O-O-O</label>
                            </div>
                        </div>
                        <div className="black color">
                            Black
                            <div>
                                <input type="checkbox" name="o-o" id="o-o-b" />
                                <label htmlFor="o-o">O-O</label>
                            </div>
                            <div>
                                <input type="checkbox" name="o-o-o" id="o-o-o-b" />
                                <label htmlFor="o-o-o">O-O-O</label>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="divider"></div>

                <div className='fen'>
                    Paste FEN : 
                    <input type="text" value={FEN} onChange={(e)=> {setFen(e.target.value)}}/>
                </div>

                
                <Link to={{pathname: "/analysis" }} state={{boardState : pieces, currentMove : toMove, FEN: FEN}}><div className="load-btn">Load</div></Link>
                

            </div>

        </div>
    );
}


function PickPiece(props : any){

    return <div className='pick-piece'>
        {props.piece.image && <div className='chess-piece' style={{backgroundImage: `url(${props.piece.image})` }}></div>}
    </div>;
    
}
