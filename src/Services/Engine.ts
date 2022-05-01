import axios from "axios";

export function StockFish(FEN : string, depth: number) : Promise<any>{
    return axios.post("http://127.0.0.1:8000/stockfish/", {
        position: FEN,
        depth: depth
    }).then((res: any) => {
        return res.data;
    }).catch(err => {
        console.log(err);
    })
}