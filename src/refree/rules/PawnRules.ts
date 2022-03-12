import { PieceType, TeamType, Piece, Position } from '../../Constants';
import { IsTileOccupied, IsTileOccupiedByopponent } from './Generalrules';

export const PawnMovement = (initialPosition: Position, desiredPosition: Position, type : PieceType, team: TeamType, boardState: Piece[]):boolean => {
    const pawnRow = (team === TeamType.OUR)? 1 : 6;
    const pawnDirection = (team === TeamType.OUR)? 1 : -1;

    if(initialPosition.x === desiredPosition.x && initialPosition.y === pawnRow && desiredPosition.y-initialPosition.y === 2*pawnDirection){
        if(!IsTileOccupied(desiredPosition,boardState) && !IsTileOccupied({x: desiredPosition.x, y:desiredPosition.y-pawnDirection},boardState)){
            return true;
        }
    }else if(initialPosition.x === desiredPosition.x && desiredPosition.y-initialPosition.y === pawnDirection){
        if(!IsTileOccupied(desiredPosition,boardState)){
            return true;
        }
    }
    //Attack Logic
    else if(desiredPosition.x-initialPosition.x === -1 && desiredPosition.y-initialPosition.y === pawnDirection){
        if(IsTileOccupiedByopponent(desiredPosition,boardState,team)){
            return true;
        }               
    }else if(desiredPosition.x-initialPosition.x === 1 && desiredPosition.y-initialPosition.y === pawnDirection){
        if(IsTileOccupiedByopponent(desiredPosition,boardState,team)){
            return true;
        } 
    }

    return false;
}