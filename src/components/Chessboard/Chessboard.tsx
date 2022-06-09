
import './Chessboard.css';
import Tile from '../Tile/Tile';
import React, { useRef, useState } from 'react';
import Refree from '../../refree/Refree';

import { IsEnPassant, IsCastles } from '../../refree/rules';

import { InitialBoardState, Piece, PieceType, Position, samePosition, TeamType } from '../../Constants';

import { VERTICAL_AXIS, HORIZONTAL_AXIS, BOARD_SIZE, GRID_SIZE, PIECE_SIZE }  from '../../Constants';

export default function Chessboard(props: any){
    const [activePiece, setActivePiece] = useState<HTMLElement | null>(null);
    const [grabPosition, setGrabPosition] = useState<Position>({x: -1, y: -1});
    const pieces : Piece[] = JSON.parse(JSON.stringify(props.boardState));
    var currentMove = props.boardStateIndex%2 === 0 ? TeamType.OUR : TeamType.OPPONENT;

    const [promotionPawn, setPromotionPawn] = useState<Piece>();

    

    const [HalfMoves,setHalfMoves] = useState<Number>(0);
    const [FullMoves, setFullMoves] = useState<Number>(1);

    const refree = new Refree();
    const chessboardRef = useRef<HTMLDivElement>(null);
    const modalRef = useRef<HTMLDivElement>(null);

    //console.log(props.boardState);
    //console.log(props.boardStateIndex);
    
    

    function grabPiece(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        const element = e.target as HTMLElement;
        const chessboard = chessboardRef.current;
        if(element.classList.contains('chess-piece') && chessboard){
            setGrabPosition({
                x: Math.floor((e.clientX - chessboard.offsetLeft) / GRID_SIZE), 
                y: Math.abs(Math.ceil((e.clientY - chessboard.offsetTop - BOARD_SIZE) / GRID_SIZE)) 
            });

            const x = e.clientX - chessboard.offsetLeft - (PIECE_SIZE/2);
            const y = e.clientY - chessboard.offsetTop - (PIECE_SIZE/2);
            
            element.style.position = 'absolute';
            element.style.left = `${x}px`;
            element.style.top = `${y}px`;

            setActivePiece(element);
        }
    }

    function movePiece(e: React.MouseEvent){
        const chessboard = chessboardRef.current;
        
        
        if(activePiece && chessboard){
                  
            const minX = 0;
            const minY = 0;
            const maxX = chessboard.clientHeight - PIECE_SIZE;
            const maxY = chessboard.clientHeight - PIECE_SIZE;

            const x = e.clientX - chessboard.offsetLeft - (PIECE_SIZE/2);
            const y = e.clientY - chessboard.offsetTop - (PIECE_SIZE/2);

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
            const x = Math.floor((e.clientX - chessboard.offsetLeft) / GRID_SIZE);
            const y = Math.abs(Math.ceil((e.clientY - chessboard.offsetTop - BOARD_SIZE) / GRID_SIZE));
            
            const currentPiece = pieces.find(p => samePosition(p.position, grabPosition));

            if(currentPiece){

                const validMove = refree.IsValidMove(grabPosition,{x,y}, currentPiece.type, currentPiece.team, pieces, currentMove);
                const IsEnPassantMove:boolean = IsEnPassant(grabPosition,{x,y},currentPiece.type,currentPiece.team,pieces, currentMove);
                const IsCastle = IsCastles(grabPosition, {x,y}, currentPiece.type, currentPiece.team, pieces, currentMove);

                const pawnDirection = (currentPiece.team === TeamType.OUR)? 1 : -1;

                if(IsCastle){
                    const updatedCurrentMove = currentMove === TeamType.OUR? TeamType.OPPONENT : TeamType.OUR;
                    const updatedPieces = pieces.reduce((results,piece) => {

                        if(samePosition(piece.position, grabPosition)){
                            piece.position.x = (x < currentPiece.position.x) ? x + 2 : x - 1;
                            results.push(piece);
                        }else if(samePosition(piece.position, {x,y})){
                            piece.position.x = (x < currentPiece.position.x) ? x + 3 : x-2;
                            results.push(piece);
                        }else if(!samePosition(piece.position, {x,y})){
                            if(piece.type === PieceType.PAWN){
                                piece.enPassant=false;
                            }
                            results.push(piece);
                        }

                        return results;
                    },[] as Piece[]);

                    //setPieces(updatedPieces);
                    //setCurrentMove(updatedCurrentMove);
                    props.BoardController(updatedPieces, updatedCurrentMove);
                }else if(IsEnPassantMove){
                    const updatedCurrentMove = currentMove === TeamType.OUR? TeamType.OPPONENT : TeamType.OUR;
                    const updatedPieces = pieces.reduce((results, piece) => {
                        if(samePosition(piece.position,grabPosition)){
                            piece.position.x=x;
                            piece.position.y=y;
                            results.push(piece);
                        }else if(!(samePosition(piece.position, { x , y: y-pawnDirection}))){
                            if(piece.type === PieceType.PAWN){
                                piece.enPassant=false;
                            }
                            results.push(piece);
                        }
                        
                        return results;
                    }, [] as Piece[]);

                    //setPieces(updatedPieces);
                    //setCurrentMove(updatedCurrentMove); //current color
                    props.BoardController(updatedPieces, updatedCurrentMove);
                }else if(validMove){
                    const updatedCurrentMove = currentMove === TeamType.OUR? TeamType.OPPONENT : TeamType.OUR;
                    const updatedPieces = pieces.reduce((results, piece) => {

                        if(samePosition(piece.position, grabPosition)){
                            piece.enPassant = Math.abs(grabPosition.y - y) === 2 && piece.type === PieceType.PAWN;

                            piece.position.x=x;
                            piece.position.y=y;

                            
                            let promotionRow = (piece.team === TeamType.OUR)? 7:0;
                            if(y === promotionRow && piece.type === PieceType.PAWN){
                                modalRef.current?.classList.remove("hidden");
                                setPromotionPawn(piece);
                            }

                            if(piece.type === PieceType.KING || piece.type === PieceType.ROOK){
                                piece.hasMoved=true;
                            }
                            
                            results.push(piece);
                        }else if(!(samePosition(piece.position, {x,y}))){
                            
                            if(piece.type === PieceType.PAWN){
                                piece.enPassant=false;
                            }
                            results.push(piece);
                        }
                        return results;
                    }, [] as Piece[]);
                    
                    //setPieces(updatedPieces);
                    //setCurrentMove(updatedCurrentMove);
                    props.BoardController(updatedPieces, updatedCurrentMove);
                }else{
                    activePiece.style.position='relative';
                    activePiece.style.removeProperty('top');
                    activePiece.style.removeProperty('left');
                }
            }
            
            setActivePiece(null);
        }
    }    

    
    function promotePawn(piecetype: PieceType){
        if(promotionPawn === undefined){
            return;
        }

        const updatedPieces = pieces.reduce((results, piece) => {
            if(samePosition(piece.position, promotionPawn.position)){
                piece.type = piecetype;
                const teamType = (piece.team === TeamType.OUR) ? "l" : "d";
                let image = "";
                switch(piecetype){
                    case PieceType.ROOK:
                        image = "r";break;
                    case PieceType.BISHOP:
                        image = "b";break;
                    case PieceType.QUEEN:
                        image = "q";break;
                    case PieceType.KNIGHT:
                        image = "n";break;
                }
                piece.image=`/assets/images/Chess_${image}${teamType}t60.png`;  
                //console.log(piece);
            }

            results.push(piece);

            return results;
        }, [] as Piece[]);

        //setPieces(updatedPieces);
        props.BoardController(updatedPieces, currentMove);

        modalRef.current?.classList.add("hidden");
    }

    function promotionTeamtype(){
        return promotionPawn?.team === TeamType.OUR ? "l" : "d";
    }

    let board=[];
    for(let j=VERTICAL_AXIS.length - 1;j>=0;j--){
        for(let i=0; i<HORIZONTAL_AXIS.length;i++){
            const num = j+i+2;
            const piece = pieces.find(p => samePosition(p.position, {x: i, y: j}));
            let image = piece ? piece.image : undefined;

            const numericNotation = i==0 ? VERTICAL_AXIS[j] : '';
            const alphabetNotaion = j==0 ? HORIZONTAL_AXIS[i] : '';

            board.push(<Tile key={`${j},${i}`} number={num} image={image} numericNotation={numericNotation} alphabetNotaion={alphabetNotaion} />);
        }
    }

    
    return (
    <>    
    <div onMouseMove={e=> movePiece(e)} onMouseDown={e=> grabPiece(e)} onMouseUp={e=>dropPiece(e)} ref={chessboardRef} id="chessboard">
        {board}
        <div id="pawn-promotion-modal" className="hidden" ref={modalRef}>
            <div className="modal-body">
                <img onClick={() => promotePawn(PieceType.QUEEN)} src={`/assets/images/Chess_q${promotionTeamtype()}t60.png`} />
                <img onClick={() => promotePawn(PieceType.ROOK)} src={`/assets/images/Chess_r${promotionTeamtype()}t60.png`} />
                <img onClick={() => promotePawn(PieceType.BISHOP)} src={`/assets/images/Chess_b${promotionTeamtype()}t60.png`} />
                <img onClick={() => promotePawn(PieceType.KNIGHT)} src={`/assets/images/Chess_n${promotionTeamtype()}t60.png`} />
            </div>
        </div>
    </div>
    </>
    )
}

