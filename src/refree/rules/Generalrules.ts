import { Position, Piece, TeamType, samePosition, PieceType } from "../../Constants";

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

export const IsEnPassant = (initialPosition: Position, desiredPosition: Position, type: PieceType, team: TeamType, boardState: Piece[], currentMove: TeamType) : boolean => {
    if(team !== currentMove){
        return false;
    }

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

export const IsCastles = (initialPosition : Position, desiredPosition: Position, type: PieceType, team: TeamType, boardState : Piece[], currentMove: TeamType) => {
    if(team !== currentMove){
        return false;
    }
    
    const currentPiece = boardState.find(p => p.position.x === initialPosition.x && p.position.y === initialPosition.y);
    
    if(type === PieceType.KING && !currentPiece?.hasMoved){
        const cornerPiece = boardState.find(p => p.position.x === desiredPosition.x && p.position.y === desiredPosition.y && p.type === PieceType.ROOK && !p.hasMoved);
        
        if((desiredPosition.x === 0 || desiredPosition.x === 7) && desiredPosition.y === initialPosition.y && cornerPiece){
            const direction = (desiredPosition.x < initialPosition.x) ? -1 : 1;
            const tilesInbetween = (desiredPosition.x < initialPosition.x) ? 3 : 2;

            for(let i=1; i<=tilesInbetween; i++){
                let PassedPosition:Position = {x : initialPosition.x + i*direction, y : initialPosition.y};
                
                if(IsTileOccupied(PassedPosition,boardState)){
                    return false;
                }
            }
            return true;
        }
    }
    return false;
}