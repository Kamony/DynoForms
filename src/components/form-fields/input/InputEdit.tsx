import React from 'react';
import {
    Button,
    Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControlLabel,
    TextField,
} from '@material-ui/core';
import { InputFields } from './Input';
import { Divider } from '../../Divider';

type ActionProps = {
    open: boolean;
    onClose: () => void;
    onSave: (payload: InputFields) => void;
};

export const TextInputEditDialog: React.FC<ActionProps> = (props: ActionProps) => {
    const [values, setValues] = React.useState<InputFields>({
        label: 'label',
        placeholder: 'placeholder',
        required: false,
    });

    const handleChange = (name: keyof InputFields) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setValues({ ...values, [name]: event.target.value });
    };

    const handleSave = () => {
        props.onSave(values);
    };

    const renderTextEdit = ({
        label,
        value,
        handler,
    }: {
        label: string;
        value: string;
        handler: ReturnType<typeof handleChange>;
    }) => {
        return (
            <TextField
                id="edit-label"
                label={label}
                variant={'outlined'}
                value={value}
                onChange={handler}
                onFocus={event => {
                    event.target.select();
                }}
            />
        );
    };

    const renderCheckboxEdit = ({
        label,
        value,
        handler,
    }: {
        label: string;
        value: boolean;
        handler: ReturnType<typeof handleChange>;
    }) => {
        return (
            <FormControlLabel
                control={<Checkbox color="primary" value={value} onChange={handler} />}
                label={label}
                labelPlacement="end"
            />
        );
    };

    return (
        <Dialog open={props.open} onClose={props.onClose} aria-labelledby="edit-inputField-dialog">
            <DialogTitle id="form-dialog-title">Edit input field</DialogTitle>
            <DialogContent dividers style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                {renderTextEdit({
                    handler: handleChange('label'),
                    label: 'Input label',
                    value: values.label,
                })}
                <Divider spacing={10} />
                {renderTextEdit({
                    handler: handleChange('placeholder'),
                    label: 'Input placeholder',
                    value: values.placeholder,
                })}
                <Divider spacing={10} />
                {renderCheckboxEdit({
                    handler: handleChange('required'),
                    label: 'Required field',
                    value: values.required,
                })}
            </DialogContent>
            <DialogActions>
                <Button onClick={props.onClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleSave} color="primary">
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
};
