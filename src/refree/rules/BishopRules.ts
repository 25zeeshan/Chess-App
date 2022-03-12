import { Piece, Position, PieceType, TeamType, samePosition } from "../../Constants";
import { IsTileEmptyOrOccupiedByOpponent, IsTileOccupied } from "./Generalrules";

export const BishopMovement = (initialPosition: Position, desiredPosition: Position, type : PieceType, team: TeamType, boardState: Piece[]) => {
    for(let i=1;i<8;i++){

        //up right
        if(desiredPosition.x > initialPosition.x && desiredPosition.y > initialPosition.y){
            let PassedPosition:Position = {x : initialPosition.x + i, y : initialPosition.y + i};

            if(samePosition(desiredPosition,PassedPosition)){
                //Check if tile is destination tile
                if(IsTileEmptyOrOccupiedByOpponent(PassedPosition,boardState,team)){
                    return true;
                }
            }else{
                //Dealing with passing tile
                if(IsTileOccupied(PassedPosition, boardState)){
                    break;
                }
            }
        }
        //bottom right
        if(desiredPosition.x > initialPosition.x && desiredPosition.y < initialPosition.y){
            let PassedPosition:Position = {x : initialPosition.x + i, y : initialPosition.y - i};
            
            if(samePosition(PassedPosition,desiredPosition)){
                //Check if tile is destination tile
                if(IsTileEmptyOrOccupiedByOpponent(PassedPosition,boardState,team)){
                    return true;
                }
            }else{
                //Dealing with passing tile
                if(IsTileOccupied(PassedPosition, boardState)){
                    break;
                }
            }
        }
        //bottom left
        if(desiredPosition.x < initialPosition.x && desiredPosition.y < initialPosition.y){
            let PassedPosition:Position = {x : initialPosition.x - i, y : initialPosition.y - i};
            
            if(samePosition(PassedPosition,desiredPosition)){
                //Check if tile is destination tile
                if(IsTileEmptyOrOccupiedByOpponent(PassedPosition,boardState,team)){
                    return true;
                }
            }else{
                //Dealing with passing tile
                if(IsTileOccupied(PassedPosition, boardState)){
                    break;
                }
            }
        }
        //up left
        if(desiredPosition.x < initialPosition.x && desiredPosition.y > initialPosition.y){
            let PassedPosition:Position = {x : initialPosition.x - i, y : initialPosition.y + i};
            
            if(samePosition(PassedPosition,desiredPosition)){
                //Check if tile is destination tile
                if(IsTileEmptyOrOccupiedByOpponent(PassedPosition,boardState,team)){
                    return true;
                }
            }else{
                //Dealing with passing tile
                if(IsTileOccupied(PassedPosition, boardState)){
                    break;
                }
            }
        }
    }
    return false;
}