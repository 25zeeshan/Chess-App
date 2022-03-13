import { PieceType, TeamType, Piece, Position, samePosition } from "../Constants";
import { PawnMovement, KnightMovement, BishopMovement, RookMovement, QueenMovement, KingMovement } from './rules';
import { IsTileOccupied } from "./rules/Generalrules";

export default class Refree{

    IsEnPassantMove(initialPosition: Position, desiredPosition: Position, type: PieceType, team: TeamType, boardState: Piece[]) : boolean{
        const pawnDirection = (team === TeamType.OUR)? 1 : -1;

        if(type === PieceType.PAWN){
            if((desiredPosition.x-initialPosition.x === -1 || desiredPosition.x-initialPosition.x === 1) && desiredPosition.y-initialPosition.y === pawnDirection){
                const piece = boardState.find(p => p.position.x === desiredPosition.x && p.position.y === desiredPosition.y-pawnDirection && p.enPassant);   
                if(piece){
                    return true;
                }                           
            }
        }
        
        return false;
    }

    IsCastle(initialPosition : Position, desiredPosition: Position, type: PieceType, team: TeamType, boardState : Piece[]){
        const currentPiece = boardState.find(p => p.position.x === initialPosition.x && p.position.y === initialPosition.y);

        if(type === PieceType.KING && !currentPiece?.hasMoved){
            const cornerPiece = boardState.find(p => p.position.x === desiredPosition.x && p.position.y === desiredPosition.y && p.type === PieceType.ROOK && !p.hasMoved);
            
            if((desiredPosition.x === 0 || desiredPosition.x === 7) && desiredPosition.y === initialPosition.y && cornerPiece){
                const direction = (desiredPosition.x < initialPosition.x) ? -1 : 1;
                const tilesInbetween = (desiredPosition.x < initialPosition.x) ? 3 : 2;
                let emptyTiles = 0;

                for(let i=1; i<=tilesInbetween; i++){
                    let PassedPosition:Position = {x : initialPosition.x + i*direction, y : initialPosition.y};
                    
                    if(IsTileOccupied(PassedPosition,boardState)){
                        break;
                    }
                    emptyTiles++;
                }
                return emptyTiles === tilesInbetween;
            }
        }
        return false;
    }

    IsValidMove(initialPosition: Position, desiredPosition: Position, type : PieceType, team: TeamType, boardState: Piece[]){
        let validMove= false;

        switch(type){
            case PieceType.PAWN:    
                validMove = PawnMovement(initialPosition, desiredPosition,type, team, boardState);
                break;
            case PieceType.KNIGHT:
                validMove = KnightMovement(initialPosition, desiredPosition,type, team, boardState);
                break;
            case PieceType.BISHOP:
                validMove = BishopMovement(initialPosition, desiredPosition,type, team, boardState);
                break;
            case PieceType.ROOK:
                validMove = RookMovement(initialPosition, desiredPosition,type, team, boardState);
                break;     
            case PieceType.QUEEN:
                validMove = QueenMovement(initialPosition, desiredPosition,type, team, boardState);
                break;    
            case PieceType.KING:
                validMove = KingMovement(initialPosition, desiredPosition,type, team, boardState);
                break;        
        }
        return validMove;
    }
}

