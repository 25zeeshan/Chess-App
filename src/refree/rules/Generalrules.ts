import { Position, Piece, TeamType, samePosition } from "../../Constants";

export const IsTileOccupied = (position: Position, boardState : Piece[] ) : boolean => {
    const piece = boardState.find(p => samePosition(p.position, position))

    if(piece){
        return true;
    }else{
        return false;
    }
}

export const IsTileOccupiedByopponent = (position: Position, boardState: Piece[], team: TeamType) : boolean => {
    const piece = boardState.find(p => samePosition(p.position,position) && p.team !== team);
    if(piece){
        return true;
    }else{
        return false;
    }
}

export const IsTileEmptyOrOccupiedByOpponent = (position:Position, boardState: Piece[], team: TeamType):boolean => {
    return !IsTileOccupied(position,boardState) || IsTileOccupiedByopponent(position,boardState,team);
}