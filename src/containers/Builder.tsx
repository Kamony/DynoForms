import * as React from 'react';
import { Grid } from '@material-ui/core';
import { FieldBox } from './field-box/FieldBox';
import { DropArea } from './drop-area/DropArea';

export const Builder = () => {
    return (
        <Grid container direction={'row'} spacing={2} justify={'center'}>
            <Grid item xs={3}>
                <FieldBox />
            </Grid>
            <Grid item xs={8}>
                <DropArea />
            </Grid>
        </Grid>
    );
};
