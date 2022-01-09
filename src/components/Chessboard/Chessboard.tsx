
import './Chessboard.css';
import Tile from '../Tile/Tile';
import React, { useRef, useState } from 'react';
import Refree from '../../refree/Refree';

const verticalAxis = ["1","2","3","4","5","6","7","8"];
const horizontalAxis = ["a","b","c","d","e","f","g","h"];

export interface Piece {
    image: string,
    x: number,
    y:number,
    type: PieceType,
    team: TeamType
}

export enum TeamType{
    OPPONENT,
    OUR
}

export enum PieceType{
    PAWN,
    BISHOP,
    KNIGHT,
    ROOK,
    QUEEN,
    KING
}

const InitialBoardState : Piece[] = [];

for(let p=0;p<2;p++){
    const teamType = (p===0) ? TeamType.OPPONENT : TeamType.OUR;
    const color = (teamType === TeamType.OPPONENT) ? "d":"l";
    const rank = (teamType === TeamType.OPPONENT) ? 7 : 0;

    InitialBoardState.push({image : `assets/images/Chess_r${color}t60.png`, x: 0, y:rank, type: PieceType.ROOK, team:teamType})
    InitialBoardState.push({image : `assets/images/Chess_r${color}t60.png`, x: 7, y:rank, type: PieceType.ROOK, team:teamType})

    InitialBoardState.push({image : `assets/images/Chess_b${color}t60.png`, x: 2, y:rank, type: PieceType.BISHOP, team:teamType})
    InitialBoardState.push({image : `assets/images/Chess_b${color}t60.png`, x: 5, y:rank, type: PieceType.BISHOP, team:teamType})

    InitialBoardState.push({image : `assets/images/Chess_n${color}t60.png`, x: 1, y:rank, type: PieceType.KNIGHT, team:teamType})
    InitialBoardState.push({image : `assets/images/Chess_n${color}t60.png`, x: 6, y:rank, type: PieceType.KNIGHT, team:teamType})

    InitialBoardState.push({image : `assets/images/Chess_q${color}t60.png`, x: 3, y:rank, type: PieceType.QUEEN, team:teamType})
    InitialBoardState.push({image : `assets/images/Chess_k${color}t60.png`, x: 4, y:rank, type: PieceType.KING, team:teamType})
}

for(let i=0;i<8;i++){
    InitialBoardState.push({image : 'assets/images/Chess_pdt60.png', x: i, y:6, type: PieceType.PAWN, team: TeamType.OPPONENT})
}

for(let i=0;i<8;i++){
    InitialBoardState.push({image : 'assets/images/Chess_plt60.png', x: i, y:1, type: PieceType.PAWN, team: TeamType.OUR})
}

export default function Chessboard(){
    const [activePiece, setActivePiece] = useState<HTMLElement | null>(null);
    const [gridX, setGridX] = useState(0);
    const [gridY, setGridY] = useState(0);
    const [pieces, setPieces] = useState<Piece[]>(InitialBoardState);

    const refree = new Refree();
    const chessboardRef = useRef<HTMLDivElement>(null);

    function grabPiece(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        const element = e.target as HTMLElement;
        const chessboard = chessboardRef.current;
        if(element.classList.contains('chess-piece') && chessboard){

            setGridX(Math.floor((e.clientX - chessboard.offsetLeft) / 50));
            setGridY(Math.abs(Math.ceil((e.clientY - chessboard.offsetTop - 400) / 50)));

            const x = e.clientX - 20;
            const y = e.clientY - 20;
            
            element.style.position = 'absolute';
            element.style.left = `${x}px`;
            element.style.top = `${y}px`;

            setActivePiece(element);
        }
    }

    function movePiece(e: React.MouseEvent){
        const chessboard = chessboardRef.current;
        if(activePiece && chessboard){
            const minX = chessboard.offsetLeft - 5;
            const minY = chessboard.offsetTop - 5;
            const maxX = chessboard.offsetLeft + chessboard.clientWidth - 35;
            const maxY = chessboard.offsetTop + chessboard.clientHeight - 35;
            const x = e.clientX - 20;
            const y = e.clientY - 20;

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
        }
    }

    function dropPiece(e: React.MouseEvent){
        const chessboard = chessboardRef.current;
        if(activePiece && chessboard){
            const x = Math.floor((e.clientX - chessboard.offsetLeft) / 50);
            const y = Math.abs(Math.ceil((e.clientY - chessboard.offsetTop - 400) / 50));
            
            //Updating chess piece position
            setPieces((value) => {
                const pieces=value.map(p => {
                    
                    if(p.x===gridX && p.y===gridY){
                        const validMove = refree.IsValidMove(gridX, gridY, x, y, p.type, p.team, value);
                        if(validMove){
                            p.x=x;
                            p.y=y;
                        }else{
                            activePiece.style.position='relative';
                            activePiece.style.removeProperty('top');
                            activePiece.style.removeProperty('left');
                        }
                        
                    }
                    return p;
                })
                return pieces;
            })
            
            setActivePiece(null);
        }
    }    

    let board=[];
    for(let j=verticalAxis.length - 1;j>=0;j--){
        for(let i=0; i<horizontalAxis.length;i++){
            const num = j+i+2;
            let image = undefined;

            pieces.forEach(p=>{
                if(p.x === i  && p.y === j){
                    image=p.image;
                }
            })

            board.push(<Tile key={`${j},${i}`} number={num} image={image}/>);
        }
    }

    return <div 
    onMouseMove={e=> movePiece(e)} 
    onMouseDown={e=> grabPiece(e)} 
    onMouseUp={e=> dropPiece(e)}
    ref={chessboardRef}
    id="chessboard">{board}</div>
}

