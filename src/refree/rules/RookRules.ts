import { Piece, Position, PieceType, TeamType, samePosition } from "../../Constants";
import { IsTileEmptyOrOccupiedByOpponent, IsTileOccupied } from "./Generalrules";

export const RookMovement = (initialPosition: Position, desiredPosition: Position, type : PieceType, team: TeamType, boardState: Piece[]):boolean => {
    if(initialPosition.x === desiredPosition.x){
            
        for(let i=1;i<8;i++){
            let multiplier = (initialPosition.y > desiredPosition.y) ? -1 : 1;

            let passedPosition : Position = {x: initialPosition.x, y: initialPosition.y + i * multiplier}
            if(samePosition(passedPosition, desiredPosition)){
                if(IsTileEmptyOrOccupiedByOpponent(passedPosition, boardState, team)){
                    return true;
                }
            }else{
                if(IsTileOccupied(passedPosition, boardState)){
                    break;
                }
            }
        }
    }
    if(initialPosition.y === desiredPosition.y){

        for(let i=1;i<8;i++){
            let multiplier = (initialPosition.x > desiredPosition.x) ? -1 : 1;

            let passedPosition : Position = {x: initialPosition.x + i * multiplier, y: initialPosition.y}
            if(samePosition(passedPosition, desiredPosition)){
                if(IsTileEmptyOrOccupiedByOpponent(passedPosition, boardState, team)){
                    return true;
                }
            }else{
                if(IsTileOccupied(passedPosition, boardState)){
                    break;
                }
            }
        }
    }

    return false;
}
