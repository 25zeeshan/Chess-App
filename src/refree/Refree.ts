import { PieceType, TeamType, Piece } from "../components/Chessboard/Chessboard";

export default class Refree{

    IsTileOccupied(x: number, y:number, boardState : Piece[] ) : boolean{
        const piece = boardState.find(p => p.x === x && p.y === y)

        if(piece){
            return true;
        }else{
            return false;
        }
    }


    IsValidMove(px : number, py : number, x: number, y: number, type : PieceType, team: TeamType, boardState: Piece[]){
        console.log("refree checking the move");
        console.log("prev loc : "+px+py);
        console.log("new loc : "+x+y);
        console.log("type :"+type);
        console.log("team : "+team);

        if(type === PieceType.PAWN){
            const pawnRow = (team === TeamType.OUR)? 1 : 6;
            const pawnDirection = (team === TeamType.OUR)? 1 : -1;

            if(px === x && py === pawnRow && y-py === 2*pawnDirection){
                if(!this.IsTileOccupied(x,y,boardState) && !this.IsTileOccupied(x,y-pawnDirection,boardState)){
                    return true;
                }
            }else if(px === x && y-py === pawnDirection){
                if(!this.IsTileOccupied(x,y,boardState)){
                    return true;
                }
            }
        }

        
        return false;
    }
}

