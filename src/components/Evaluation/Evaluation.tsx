import React, { useState } from 'react';
import "./evaluation.css"

export default function Evaluation(props : any) {
    const [value,setValue] = useState<String>(props.value? props.value : 0);

    return(
        <div id="evaluation">
            {value}
        </div>
    )
}