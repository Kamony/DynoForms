import React from 'react';
import { FormInput } from '../form-fields/input';
import { Grid } from '@material-ui/core';
import { FormCheckBox } from '../form-fields/checkbox/FormCheckbox';
import { formItemAttributes } from './common';

type Props = {
    disabledParam: boolean;
};

export const Required: React.FC<Props> = (props: Props) => {
    return (
        <Grid {...formItemAttributes}>
            <Grid item xs={6}>
                <FormCheckBox name={'required'} label={'required'} size={'small'} />
            </Grid>
            <Grid item xs={6}>
                <FormInput
                    name={'requiredParam'}
                    type={'text'}
                    variant={'outlined'}
                    label={'error message'}
                    disabled={props.disabledParam}
                    margin={'dense'}
                />
            </Grid>
        </Grid>
    );
};

export const RequiredInitialValues = {
    required: true,
    requiredParam: 'field is required',
};
