import React from 'react';
import Markdown from '../../../utils/Markdown';
import { Grid, Typography } from '@material-ui/core';


function Previewer({title, description}) {
    return (
        <Grid item xs={12} md={6} >
         <h1>{title}</h1>
            <p style={{overflowWrap:'break-word'}}>
            <Markdown>
                {description}
            </Markdown>
         </p>
        </Grid>
    )
}

const style =
{

}

export default Previewer
