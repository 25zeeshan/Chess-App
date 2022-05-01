import { PieceType, TeamType, Piece, Position, samePosition } from "../Constants";
import { PawnMovement, KnightMovement, BishopMovement, RookMovement, QueenMovement, KingMovement } from './rules';

export default class Refree{

    IsValidMove(initialPosition: Position, desiredPosition: Position, type : PieceType, team: TeamType, boardState: Piece[], currentMove: TeamType){
        if(team !== currentMove){
            return false;
        }
        
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

