import React from 'react';
import { FormLabel, Grid } from '@material-ui/core';
import { FormRadioGroup } from '../form-fields/radios/FormRadioGroup';
import { FormInput } from '../form-fields/input';

type Props = {
    isErrorMessageDisabled: boolean;
};

export const StringType: React.FC<Props> = (props: Props) => {
    return (
        <>
            <FormLabel component={'legend'}>Is type of</FormLabel>
            <Grid direction={'row'} container spacing={2} style={{ paddingBottom: 10 }}>
                <Grid item xs={6}>
                    <FormRadioGroup name={'type'} options={['text', 'url', 'email']} row />
                </Grid>
                <Grid item xs={6}>
                    <FormInput
                        name={'typeParam'}
                        type={'text'}
                        variant={'outlined'}
                        label={'error message'}
                        disabled={props.isErrorMessageDisabled}
                    />
                </Grid>
            </Grid>
        </>
    );
};

export const StringTypeInitialValues = (type?: number, param?: string) => ({
    type: type || 'text',
    typeParam: param || '',
});
