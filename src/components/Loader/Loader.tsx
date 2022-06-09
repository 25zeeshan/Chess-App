import React from 'react'
import {GridLoader} from "react-spinners";

const Loader = ({ loading , message, css, size } : any) => {

    if (size === undefined)
        size = 40;

    return loading ? (
        
        <GridLoader
            size={10}
            css={css}
            color={"#fff"}
            loading={loading}
        />
            
    ) : null
};

export default Loader;