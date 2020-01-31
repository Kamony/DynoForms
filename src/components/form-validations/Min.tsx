import React from 'react';
import { FormInput } from '../form-fields/input';
import { Grid } from '@material-ui/core';

type Props = {};

export const Min: React.FC<Props> = (props: Props) => {
    return (
        <>
            <Grid direction={'row'} container spacing={2} style={{ paddingBottom: 10 }}>
                <Grid item xs={6}>
                    <FormInput name={'min'} type={'number'} variant={'outlined'} label={'min length'} />
                </Grid>
                <Grid item xs={6}>
                    <FormInput name={'minParam'} type={'text'} variant={'outlined'} label={'error message'} />
                </Grid>
            </Grid>
        </>
    );
};

export const MinInitialValues = (min?: number, param?: string) => ({
    min: min || '',
    minParam: param || 'Too short',
});
