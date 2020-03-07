import * as React from 'react';
import { CheckBoxProps } from './form-fields/checkbox/Checkbox';
import { Button, Grid, IconButton, Input, Tooltip, Typography } from '@material-ui/core';
import { CheckBoxOutlineBlank, Clear } from '@material-ui/icons';
import { uuid } from '../utils/uuid';

type Props = {
    onOptions: (options: CheckBoxProps[]) => void;
    OptionIcon?: React.ReactElement;
};

export const OptionsBuilder = ({ OptionIcon = <CheckBoxOutlineBlank />, onOptions }: Props) => {
    const [options, setOptions] = React.useState<CheckBoxProps[]>([]);
    const addOption = (option: CheckBoxProps) => {
        setOptions([...options, option]);
    };

    const deleteOption = (id?: string) => {
        if (!id) return;
        setOptions(options.filter(el => el.id !== id));
        handleDataDelivery();
    };

    const addEmptyOption = () => {
        const option: CheckBoxProps = { id: uuid(), label: '', name: '' };
        addOption(option);
    };

    const handleOptionSetting = (event: any, option: CheckBoxProps) => {
        if (!option.id) return;
        const newOptions = [...options];
        const elemId = options.findIndex(el => el.id === option.id);
        if (elemId === -1) return;
        const updatedElement = {
            id: option.id,
            label: event.target.value,
            name: event.target.value + '-' + option.id,
        };
        newOptions.splice(elemId, 1, updatedElement);
        setOptions(newOptions);
    };

    const addOtherOption = () => {
        const option: CheckBoxProps = {
            id: uuid(),
            label: 'Other',
            name: 'Other',
        };

        if (!options.find(el => el.name === 'Other')) {
            setOptions([...options, option]);
        }
        handleDataDelivery();
    };

    const handleKeyPressed = (event: any) => {
        event.preventDefault();
        if (event.key === 'Enter') {
            addEmptyOption();
        }
    };

    const handleDataDelivery = () => {
        onOptions(options.filter(opt => opt.label));
    };

    return (
        <>
            <Typography>VYSLEDEK</Typography>
            <Grid container>
                {options.map((option, index) => (
                    <Grid item container direction={'row'} alignItems={'center'} spacing={2} key={index}>
                        <Grid item>{OptionIcon}</Grid>
                        <Grid item>
                            <Input
                                placeholder={`Option ${index}`}
                                inputProps={{ 'aria-label': 'add-option' }}
                                onKeyUp={handleKeyPressed}
                                autoFocus={true}
                                onChange={event => handleOptionSetting(event, option)}
                                value={option.label}
                                onBlur={handleDataDelivery}
                                fullWidth={true}
                                onFocus={event => {
                                    event.target.select();
                                }}
                            />
                        </Grid>
                        <Grid item>
                            <Tooltip title="Remove option" aria-label="remove-option" enterDelay={500}>
                                <IconButton aria-label="delete" onClick={() => deleteOption(option.id)}>
                                    <Clear />
                                </IconButton>
                            </Tooltip>
                        </Grid>
                    </Grid>
                ))}
            </Grid>
            <Grid container>
                <Grid item container direction={'row'} alignItems={'center'} spacing={2}>
                    <Grid item>{React.cloneElement(OptionIcon, { color: 'disabled' })}</Grid>
                    <Grid item>
                        <Input
                            readOnly={true}
                            defaultValue="Add option"
                            inputProps={{ 'aria-label': 'add-option', color: 'red' }}
                            onClick={addEmptyOption}
                        />
                    </Grid>
                    <Grid item> or </Grid>
                    <Grid item>
                        <Button onClick={addOtherOption} color={'primary'}>
                            add "Other" option
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
};
