import { Piece, Position, PieceType, TeamType, samePosition } from "../../Constants";
import { IsTileEmptyOrOccupiedByOpponent, IsTileOccupied } from "./Generalrules";

export const KingMovement = (initialPosition: Position, desiredPosition: Position, type : PieceType, team: TeamType, boardState: Piece[]) : boolean => {
    for(let i=1;i<2;i++){
    
        let multiplierX = (desiredPosition.x < initialPosition.x) ? -1 : (desiredPosition.x > initialPosition.x) ? 1 : 0;
        let multiplierY = (desiredPosition.y < initialPosition.y) ? -1 : (desiredPosition.y > initialPosition.y) ? 1 : 0;

        let PassedPosition:Position = {x : initialPosition.x + i * multiplierX, y : initialPosition.y + i * multiplierY};

        if(samePosition(PassedPosition, desiredPosition)){
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
    return false;
}