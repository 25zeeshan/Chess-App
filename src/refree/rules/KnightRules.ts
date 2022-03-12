import { Piece, Position, PieceType, TeamType } from "../../Constants";
import { IsTileEmptyOrOccupiedByOpponent } from "./Generalrules";

export const KnightMovement = (initialPosition: Position, desiredPosition: Position, type : PieceType, team: TeamType, boardState: Piece[]): boolean =>{
    for(let i=-1;i<2;i+=2){
        for(let j=-1;j<2;j+=2){
            //top or bottom
            if(desiredPosition.y - initialPosition.y === 2*i){
                if(desiredPosition.x - initialPosition.x === j){
                    if(IsTileEmptyOrOccupiedByOpponent(desiredPosition, boardState, team)){
                        return true;
                    }
                }
            }
            //right or left
            if(desiredPosition.x - initialPosition.x === 2*i){
                if(desiredPosition.y - initialPosition.y === j){
                    if(IsTileEmptyOrOccupiedByOpponent(desiredPosition, boardState, team)){
                        return true;
                    }
                }
            }
        }
    }

    return false;
}