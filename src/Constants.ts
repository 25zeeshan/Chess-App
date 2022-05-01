import Decimal from "decimal.js";
import { IsCastles, IsEnPassant } from "./refree/rules";


export const VERTICAL_AXIS = ["1","2","3","4","5","6","7","8"];
export const HORIZONTAL_AXIS = ["a","b","c","d","e","f","g","h"];

export const BOARD_SIZE = document.documentElement.clientHeight * 0.8;
export const GRID_SIZE = BOARD_SIZE/8;
export const PIECE_SIZE = GRID_SIZE - 0.2 * GRID_SIZE;


export function samePosition(p1 : Position, p2: Position){
    return p1.x === p2.x && p1.y === p2.y;
}

export interface Position {
    x: number;
    y: number;
}


export enum TeamType{
    OPPONENT,
    OUR
}

export enum PieceType{
    PAWN,
    BISHOP,
    KNIGHT,
    ROOK,
    QUEEN,
    KING
}

export interface Piece {
    image: string,
    position: Position
    type: PieceType,
    team: TeamType,
    enPassant? : boolean,
    hasMoved? : boolean
}

export interface MoveContinuation{
    eval : string,
    move : string
}


export const InitialBoardState : Piece[] = [
    { image : `assets/images/Chess_rdt60.png`, position: { x: 0, y:7 } , type: PieceType.ROOK, team:TeamType.OPPONENT, hasMoved : false },
    { image : `assets/images/Chess_rdt60.png`, position: { x: 7, y:7 }, type: PieceType.ROOK, team:TeamType.OPPONENT, hasMoved : false },
    { image : `assets/images/Chess_bdt60.png`, position: { x: 2, y:7 }, type: PieceType.BISHOP, team:TeamType.OPPONENT },
    { image : `assets/images/Chess_bdt60.png`, position: { x: 5, y:7 }, type: PieceType.BISHOP, team:TeamType.OPPONENT },
    { image : `assets/images/Chess_ndt60.png`, position: { x: 1, y:7 }, type: PieceType.KNIGHT, team:TeamType.OPPONENT },
    { image : `assets/images/Chess_ndt60.png`, position: { x: 6, y:7 }, type: PieceType.KNIGHT, team:TeamType.OPPONENT },
    { image : `assets/images/Chess_qdt60.png`, position: { x: 3, y:7 }, type: PieceType.QUEEN, team:TeamType.OPPONENT },
    { image : `assets/images/Chess_kdt60.png`, position: { x: 4, y:7 }, type: PieceType.KING, team:TeamType.OPPONENT, hasMoved : false },

    { image : `assets/images/Chess_rlt60.png`, position: { x: 0, y:0 }, type: PieceType.ROOK, team:TeamType.OUR, hasMoved : false },
    { image : `assets/images/Chess_rlt60.png`, position: { x: 7, y:0 }, type: PieceType.ROOK, team:TeamType.OUR, hasMoved : false },
    { image : `assets/images/Chess_blt60.png`, position: { x: 2, y:0 }, type: PieceType.BISHOP, team:TeamType.OUR },
    { image : `assets/images/Chess_blt60.png`, position: { x: 5, y:0 }, type: PieceType.BISHOP, team:TeamType.OUR },
    { image : `assets/images/Chess_nlt60.png`, position: { x: 1, y:0 }, type: PieceType.KNIGHT, team:TeamType.OUR },
    { image : `assets/images/Chess_nlt60.png`, position: { x: 6, y:0 }, type: PieceType.KNIGHT, team:TeamType.OUR },
    { image : `assets/images/Chess_qlt60.png`, position: { x: 3, y:0 }, type: PieceType.QUEEN, team:TeamType.OUR },
    { image : `assets/images/Chess_klt60.png`, position: { x: 4, y:0 }, type: PieceType.KING, team:TeamType.OUR, hasMoved : false },

    { image : 'assets/images/Chess_pdt60.png', position: { x: 0, y:6 }, type: PieceType.PAWN, team: TeamType.OPPONENT },
    { image : 'assets/images/Chess_pdt60.png', position: { x: 1, y:6 }, type: PieceType.PAWN, team: TeamType.OPPONENT },
    { image : 'assets/images/Chess_pdt60.png', position: { x: 2, y:6 }, type: PieceType.PAWN, team: TeamType.OPPONENT },
    { image : 'assets/images/Chess_pdt60.png', position: { x: 3, y:6 }, type: PieceType.PAWN, team: TeamType.OPPONENT },
    { image : 'assets/images/Chess_pdt60.png', position: { x: 4, y:6 }, type: PieceType.PAWN, team: TeamType.OPPONENT },
    { image : 'assets/images/Chess_pdt60.png', position: { x: 5, y:6 }, type: PieceType.PAWN, team: TeamType.OPPONENT },
    { image : 'assets/images/Chess_pdt60.png', position: { x: 6, y:6 }, type: PieceType.PAWN, team: TeamType.OPPONENT },
    { image : 'assets/images/Chess_pdt60.png', position: { x: 7, y:6 }, type: PieceType.PAWN, team: TeamType.OPPONENT },

    { image : 'assets/images/Chess_plt60.png', position: { x: 0, y:1 }, type: PieceType.PAWN, team: TeamType.OUR },
    { image : 'assets/images/Chess_plt60.png', position: { x: 1, y:1 }, type: PieceType.PAWN, team: TeamType.OUR },
    { image : 'assets/images/Chess_plt60.png', position: { x: 2, y:1 }, type: PieceType.PAWN, team: TeamType.OUR },
    { image : 'assets/images/Chess_plt60.png', position: { x: 3, y:1 }, type: PieceType.PAWN, team: TeamType.OUR },
    { image : 'assets/images/Chess_plt60.png', position: { x: 4, y:1 }, type: PieceType.PAWN, team: TeamType.OUR },
    { image : 'assets/images/Chess_plt60.png', position: { x: 5, y:1 }, type: PieceType.PAWN, team: TeamType.OUR },
    { image : 'assets/images/Chess_plt60.png', position: { x: 6, y:1 }, type: PieceType.PAWN, team: TeamType.OUR },
    { image : 'assets/images/Chess_plt60.png', position: { x: 7, y:1 }, type: PieceType.PAWN, team: TeamType.OUR }
];

export function ProcessBestMoves(res : any, Pieces : Piece[]){

    console.log(res);
    
    var BestMoves = [{eval: "", move:""}, {eval: "", move:""}, {eval: "", move:""}];

    BestMoves[0].eval = FindEvalForMoves(res[0][0]);
    BestMoves[0].move = ConvertMoveToPGN(res[0][0].Move, Pieces);
    BestMoves[1].eval = FindEvalForMoves(res[0][1]);
    BestMoves[1].move = ConvertMoveToPGN(res[0][1].Move, Pieces);
    BestMoves[2].eval = FindEvalForMoves(res[0][2]);
    BestMoves[2].move = ConvertMoveToPGN(res[0][2].Move, Pieces);

    return BestMoves;
    
}

function ConvertMoveToPGN(move : string, Pieces : Piece[]){
    var moveInPGN = "";

    let startPosition : Position = {
        x : move.charCodeAt(0) - 97,
        y : parseInt(move.charAt(1)) - 1
    };

    let finalPosition : Position = {
        x : move.charCodeAt(2) - 97,
        y : parseInt(move.charAt(3)) - 1
    }

    var initialPiece = Pieces.find(p => p.position.x === startPosition.x && p.position.y === startPosition.y);

    var finalPiece = Pieces.find(p => p.position.x === finalPosition.x && p.position.y === finalPosition.y);

    if(initialPiece 
        && ( IsCastles(startPosition,{x:finalPosition.x + 1, y:finalPosition.y},initialPiece.type,initialPiece.team,Pieces,initialPiece.team)
        || IsCastles(startPosition, {x:finalPosition.x - 1, y:finalPosition.y}, initialPiece.type, initialPiece.team, Pieces, initialPiece.team) )){
        return (finalPosition.x > startPosition.x)? "O-O" : "O-O-O";
    }

    if(initialPiece?.type === PieceType.BISHOP){
        moveInPGN = "b";
    }else if(initialPiece?.type === PieceType.KING){
        moveInPGN = "k";
    }else if(initialPiece?.type === PieceType.KNIGHT){
        moveInPGN = "n";
    }else if(initialPiece?.type === PieceType.QUEEN){
        moveInPGN = "q";
    }else if(initialPiece?.type === PieceType.ROOK){
        moveInPGN = "r";
    }    

    if(finalPiece || (initialPiece && IsEnPassant(startPosition, finalPosition, initialPiece.type, initialPiece.team, Pieces, initialPiece.team))){
        if(initialPiece?.type === PieceType.PAWN){
            moveInPGN += move.charAt(0);
        }
        moveInPGN += "x";
    }

    moveInPGN += move.substring(2);

    return moveInPGN;
}

function FindEvalForMoves(move : any){
    var newEval="";
    if(move.Mate){
        newEval = (move.Mate >= 0 )? "+" : "-";
        newEval += "M" + Math.abs(move.Mate).toString();
    }if(move.Centipawn != null){
        newEval = (move.Centipawn >= 0 )? "+" : "-";
        newEval += Math.abs(move.Centipawn/100).toFixed(2);
    }
    return newEval;
}

export function ProcessEval(res: any){
    
    var newEval="";
    if(res[1].type === 'cp'){
        newEval = (res[1].value >= 0)? "+" : "";
        newEval += (res[1].value/100).toFixed(2);
    }else if(res[1].type === 'mate'){
        newEval = (res[1].value >= 0)? "+" : "-";
        newEval += "M" + Math.abs(res[1].value).toString();
    }

    return newEval;
}

export function CalculateFEN(Pieces: Piece[], currentMove: TeamType){
    var ptype={
        "0":"P",
        "1":"B",
        "2":"N",
        "3":"R",
        "4":"Q",
        "5":"K"
    }

    var mat=[
        ["0","0","0","0","0","0","0","0"],
        ["0","0","0","0","0","0","0","0"],
        ["0","0","0","0","0","0","0","0"],
        ["0","0","0","0","0","0","0","0"],
        ["0","0","0","0","0","0","0","0"],
        ["0","0","0","0","0","0","0","0"],
        ["0","0","0","0","0","0","0","0"],
        ["0","0","0","0","0","0","0","0"],
    ]

    for(let i of Pieces)
    {
        mat[7-i.position.y][i.position.x]=(i.team===0)?ptype[i.type].toLowerCase():ptype[i.type];
    }

    var space=0
    var res="";
    for(let i=0;i<8;i++)
    {
        for(let j=0;j<8;j++)
        {
            if(mat[i][j]!=="0")
            {
                if(space!==0)
                {
                    res+=space+mat[i][j];
                }
                else{
                    res+=mat[i][j];
                }
                space=0;
            }
            else
            {
                space+=1;
            }
            
        }
        if(space>0)
        {
            res+=space;
            space=0;
        }
        res+="/"
    }

    res = res.substring(0,res.length-1) + " ";
    
    res+= (currentMove === TeamType.OUR)? "w" : "b";
    res+= " " + getCastlingRights(Pieces);
    res+= " " + getEnPassantTargets(Pieces);
    //console.log(mat);
    return res;
}


function getCastlingRights(Pieces : Piece[]){
    var castle="";
    const whiteKing  = Pieces.find(p => p.position.x === 4 && p.position.y === 0);
    const whiteRookLeft = Pieces.find(p => p.position.x === 0 && p.position.y === 0);
    const whiteRookRight = Pieces.find(p => p.position.x === 7 && p.position.y === 0);

    if(whiteKing && whiteRookLeft && !whiteKing.hasMoved && !whiteRookLeft.hasMoved){
        castle+="Q";
    }if(whiteKing && whiteRookRight && !whiteKing.hasMoved && !whiteRookRight.hasMoved){
        castle+="K";
    }

    const blackKing  = Pieces.find(p => p.position.x === 4 && p.position.y === 7);
    const blackRookLeft = Pieces.find(p => p.position.x === 0 && p.position.y === 7);
    const blackRookRight = Pieces.find(p => p.position.x === 7 && p.position.y === 7);

    if(blackKing && blackRookLeft && !blackKing.hasMoved && !blackRookLeft.hasMoved){
        castle+="q";
    }if(blackKing && blackRookRight && !blackKing.hasMoved && !blackRookRight.hasMoved){
        castle+="k";
    }

    return castle === "" ? "-" : castle;
}

function getEnPassantTargets(Pieces : Piece[]){
    var target="";

    const targetPiece = Pieces.find(p => p.enPassant);

    if(targetPiece){
        const direction = targetPiece.team === TeamType.OUR ? -1 : 1;
        target = HORIZONTAL_AXIS[targetPiece.position.x] + VERTICAL_AXIS[targetPiece.position.y + direction];
    }

    return target === ""? "-" : target;
}

export function CalculatePositionFromFEN(fen : string){
    var inp=fen.split(" ");
    var inps=inp[0].split("/");
    var mat=[
        ["0","0","0","0","0","0","0","0"],
        ["0","0","0","0","0","0","0","0"],
        ["0","0","0","0","0","0","0","0"],
        ["0","0","0","0","0","0","0","0"],
        ["0","0","0","0","0","0","0","0"],
        ["0","0","0","0","0","0","0","0"],
        ["0","0","0","0","0","0","0","0"],
        ["0","0","0","0","0","0","0","0"],
    ]

    var y=0;
    for(var x=0;x<8;x++)
    {
        y=0;
        for(let j of inps[x])
        {
            if(j=="1" || j=="2" ||  j=="3" || j=="4" || j=="5" || j=="6" || j=="7" || j=="8")
            {
                y+=parseInt(j);
            }
            else
            {
                //console.log("x: "+x+ " y :"+y)
                mat[y][7-x]=j
                y+=1;
            }
        }
    }
    console.log(mat);

    let boardState:Piece[] = [];

    
}
