import React, { useEffect, useState } from 'react';
import "./evaluation.css"

export default function Evaluation(props : any) {

    useEffect(() => {
        let element = document.getElementById("evaluation-black");
        if(element){
            if(props.Eval.charAt(1) === 'M'){
                element.style.height = props.Eval.charAt(0) === '+'? "0%" : "100%";
            }else{
                var evalValue = parseFloat(props.Eval.substring(1));
                
                evalValue = evalValue > 10 ? 10 * 4.5 : evalValue * 4.5;
                element.style.height = props.Eval.charAt(0) === '+'? `${50 - evalValue}%` : `${50 + evalValue}%`;
            }
        }
    }, [props.Eval])

    let Evalvalue = props.Eval.charAt(1) === 'M' ? props.Eval.substring(1) : parseFloat(props.Eval.substring(1)).toFixed(1);
 
    let evalClasses = props.Eval.charAt(0) === '+' ? "evaluation-value positive" : "evaluation-value negative";

    return(
        <div id="evaluation">
            <div className={evalClasses}>{Evalvalue}</div>
            <div id="evaluation-black" className='black'></div>
        </div>
    )
}