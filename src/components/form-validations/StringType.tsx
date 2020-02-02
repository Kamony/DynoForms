import React from 'react';
import { FormLabel, Grid } from '@material-ui/core';
import { FormRadioGroup } from '../form-fields/radios/FormRadioGroup';
import { FormInput } from '../form-fields/input';
import { formItemAttributes } from './common';

type Props = {
    disabledParam: boolean;
};

export const StringType: React.FC<Props> = (props: Props) => {
    return (
        <>
            <FormLabel component={'legend'}>Is type of</FormLabel>
            <Grid {...formItemAttributes}>
                <Grid item xs={6}>
                    <FormRadioGroup name={'type'} options={['text', 'url', 'email']} row />
                </Grid>
                <Grid item xs={6}>
                    <FormInput
                        name={'typeParam'}
                        type={'text'}
                        variant={'outlined'}
                        label={'error message'}
                        disabled={props.disabledParam}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        margin={'dense'}
                    />
                </Grid>
            </Grid>
        </>
    );
};

export const StringTypeInitialValues = {
    type: 'text',
    typeParam: '',
};
