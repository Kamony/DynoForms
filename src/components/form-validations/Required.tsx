import React from 'react';
import { FormInput } from '../form-fields/input';
import { Box, FormLabel, Grid } from '@material-ui/core';
import { FormCheckBox } from '../form-fields/checkbox/FormCheckbox';

type Props = {};

export const Required: React.FC<Props> = (props: Props) => {
    return (
        <Grid direction={'row'} container spacing={2} style={{ paddingBottom: 10 }}>
            <Grid item xs={6}>
                <FormCheckBox name={'required'} label={'required'} />
            </Grid>
            <Grid item xs={6}>
                <FormInput name={'requiredParam'} type={'text'} variant={'outlined'} label={'error message'} />
            </Grid>
        </Grid>
    );
};

export const RequiredInitialValues = (required?: boolean, param?: string) => ({
    required: required,
    requiredParam: param || 'Is required',
});
