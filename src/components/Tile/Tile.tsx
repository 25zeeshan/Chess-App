import './Tile.css';

interface Props{
    image?: string
    number: number,
    numericNotation? : string
    alphabetNotaion? :string
}

export default function Tile({number, image, numericNotation, alphabetNotaion} : Props){
    if(number%2===0){
        return <div className='tile black-tile'>
            <div className='numeric-notation'>{numericNotation}</div>
            {image && <div className='chess-piece' style={{backgroundImage: `url(${image})` }}></div>}
            <div className='alphabet-notation'>{alphabetNotaion}</div>
        </div>;
    }else{
        return <div className='tile white-tile'>
            <div className='numeric-notation'>{numericNotation}</div>
            {image && <div className='chess-piece' style={{backgroundImage: `url(${image})` }}></div>}
            <div className='alphabet-notation'>{alphabetNotaion}</div>
        </div>;
    }
    
}