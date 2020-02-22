import React from 'react';
import { Grid } from '@material-ui/core';
import { FormInput } from '../form-fields/input';
import { formItemAttributes, inputCommonAttributes } from './common';
import { FormSelect } from '../form-fields/select/FormSelect';

type Props = {
    disabledParam: boolean;
};

export const StringType: React.FC<Props> = (props: Props) => {
    return (
        <Grid {...formItemAttributes}>
            <Grid item xs={6}>
                <FormSelect
                    {...inputCommonAttributes}
                    name={'type'}
                    label={'is type of'}
                    options={['text', 'url', 'email']}
                    fullWidth
                />
            </Grid>
            <Grid item xs={6}>
                <FormInput
                    {...inputCommonAttributes}
                    name={'typeParam'}
                    type={'text'}
                    label={'error message'}
                    disabled={props.disabledParam}
                />
            </Grid>
        </Grid>
    );
};

export const StringTypeInitialValues = {
    type: 'text',
    typeParam: '',
};
