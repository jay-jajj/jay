import React from 'react';
import Markdown from '../../../utils/Markdown';
import { Grid } from '@material-ui/core';


function Previewer({title, description}) {
    return (
        <Grid item xs={12} md={6} >
         <h1>{title}</h1>
            <Markdown style={{overflowWrap:'break-word'}}>
                {description}
            </Markdown>
        </Grid>
    )
}

const style =
{

}

export default Previewer
