import * as React from 'react';
import { CheckBox, CheckBoxProps } from './form-fields/checkbox/Checkbox';
import { Button, Grid } from '@material-ui/core';
import { FormInput, TextInput } from './form-fields/input';

export const OptionsBuilder = () => {
    const [options, setOptions] = React.useState<CheckBoxProps[]>([{ label: 'first', name: 'first' }]);
    const addOption = (option: CheckBoxProps) => {
        setOptions([...options, option]);
    };
    return (
        <>
            <CheckBox label={'options'} options={options} />
            <Grid container>
                <Grid item container direction={'row'}>
                    <Grid item>
                        <TextInput value={'label1'} onChange={() => {}} />
                    </Grid>
                    <Grid item>
                        <Button onClick={() => addOption({ label: 'first', name: 'first' })}>Plus</Button>
                    </Grid>
                    <Grid item>
                        <Button onClick={() => addOption({ label: 'first', name: 'first' })}>Minus</Button>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
};
