import { PieceType, TeamType, Piece, Position, samePosition } from "../Constants";
import { PawnMovement, KnightMovement, BishopMovement, RookMovement, QueenMovement, KingMovement } from './rules';

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

