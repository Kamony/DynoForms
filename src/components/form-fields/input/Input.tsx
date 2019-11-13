import React from 'react';
import { TextField } from '@material-ui/core';

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

//
// type ActionProps = {
//     open: boolean;
//     onClose: () => void;
//     onSave: (payload: InputFields) => void;
// };
//
// export const TextInputEditDialog: React.FC<ActionProps> = (props: ActionProps) => {
//     const [values, setValues] = React.useState<InputFields>({
//         label: 'label',
//         placeholder: 'placeholder',
//         required: false,
//     });
//
//     const handleChange = (name: keyof InputFields) => (event: React.ChangeEvent<HTMLInputElement>) => {
//         setValues({ ...values, [name]: event.target.value });
//     };
//
//     const handleSave = () => {
//         props.onSave(values);
//     };
//
//     const renderTextEdit = ({
//         label,
//         value,
//         handler,
//     }: {
//         label: string;
//         value: string;
//         handler: ReturnType<typeof handleChange>;
//     }) => {
//         return (
//             <TextField
//                 id="edit-label"
//                 label={label}
//                 variant={'outlined'}
//                 value={value}
//                 onChange={handler}
//                 onFocus={event => {
//                     event.target.select();
//                 }}
//             />
//         );
//     };
//
//     const renderCheckboxEdit = ({
//         label,
//         value,
//         handler,
//     }: {
//         label: string;
//         value: boolean;
//         handler: ReturnType<typeof handleChange>;
//     }) => {
//         return (
//             <FormControlLabel
//                 control={<Checkbox color="primary" value={value} onChange={handler} />}
//                 label={label}
//                 labelPlacement="start"
//             />
//         );
//     };
//
//     return (
//         <Dialog open={props.open} onClose={props.onClose} aria-labelledby="edit-inputField-dialog">
//             <DialogTitle id="form-dialog-title">Edit input field</DialogTitle>
//             <DialogContent dividers>
//                 {renderTextEdit({
//                     handler: handleChange('label'),
//                     label: 'Input label',
//                     value: values.label,
//                 })}
//                 {renderTextEdit({
//                     handler: handleChange('placeholder'),
//                     label: 'Input placeholder',
//                     value: values.placeholder,
//                 })}
//                 {renderCheckboxEdit({
//                     handler: handleChange('required'),
//                     label: 'Required field',
//                     value: values.required,
//                 })}
//             </DialogContent>
//             <DialogActions>
//                 <Button onClick={props.onClose} color="primary">
//                     Cancel
//                 </Button>
//                 <Button onClick={handleSave} color="primary">
//                     Save
//                 </Button>
//             </DialogActions>
//         </Dialog>
//     );
// };
