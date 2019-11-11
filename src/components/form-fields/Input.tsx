import React from 'react';
import {
    Button, Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControlLabel,
    TextField
} from '@material-ui/core';

export type InputFields = {
    label: string;
    placeholder: string;
    required: boolean;
};

export const TextInput: React.FC<InputFields> = (props: InputFields) => {
    return (
        <TextField
            id="standard-basic"
            label={props.label}
            placeholder={props.placeholder}
            required={props.required}
            fullWidth={true}
            margin="none"
        />
    );
};

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

    return (
        <Dialog open={props.open} onClose={props.onClose} aria-labelledby="edit-inputField-dialog">
            <DialogTitle id="form-dialog-title">Edit input field</DialogTitle>
            <DialogContent>
                <TextField
                    id="edit-label"
                    label={'Input Label'}
                    variant={'outlined'}
                    value={values.label}
                    onChange={handleChange('label')}
                />
                <TextField
                    id="edit-label"
                    label={'Input Placeholder'}
                    variant={'outlined'}
                    value={values.placeholder}
                    onChange={handleChange('placeholder')}
                />
                <FormControlLabel
                    control={<Checkbox color="primary" value={values.required} onChange={handleChange('required')} />}
                    label="Required"
                    labelPlacement="start"
                />
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
