import React from 'react';
import { FormInput } from '../form-fields/input';
import { Grid } from '@material-ui/core';
import { formItemAttributes, inputCommonAttributes } from './common';

type Props = {
    disabledParam: boolean;
};

export const Min: React.FC<Props> = (props: Props) => {
    return (
        <>
            <Grid {...formItemAttributes}>
                <Grid item xs={6}>
                    <FormInput {...inputCommonAttributes} name={'min'} type={'number'} label={'min length'} />
                </Grid>
                <Grid item xs={6}>
                    <FormInput
                        {...inputCommonAttributes}
                        name={'minParam'}
                        type={'text'}
                        label={'error message'}
                        disabled={props.disabledParam}
                    />
                </Grid>
            </Grid>
        </>
    );
};

export const MinInitialValues = {
    min: '',
    minParam: 'too short',
};
