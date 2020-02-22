import React from 'react';
import { FormInput } from '../form-fields/input';
import { Grid } from '@material-ui/core';
import { formItemAttributes, inputCommonAttributes } from './common';

type Props = {
    disabledParam: boolean;
};

export const Max: React.FC<Props> = (props: Props) => {
    return (
        <>
            <Grid {...formItemAttributes}>
                <Grid item xs={6}>
                    <FormInput {...inputCommonAttributes} name={'max'} type={'number'} label={'max length'} />
                </Grid>
                <Grid item xs={6}>
                    <FormInput
                        {...inputCommonAttributes}
                        name={'maxParam'}
                        type={'text'}
                        label={'error message'}
                        disabled={props.disabledParam}
                    />
                </Grid>
            </Grid>
        </>
    );
};

export const MaxInitialValues = {
    max: '',
    maxParam: 'too long',
};
