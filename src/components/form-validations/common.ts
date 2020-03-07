import { TextFieldProps } from '@material-ui/core/TextField';
import { GridProps } from '@material-ui/core/Grid';

export const inputCommonAttributes: TextFieldProps = {
    margin: 'dense',
    InputLabelProps: {
        shrink: true,
    },
    variant: 'outlined',
    fullWidth: true,
};

export const formItemAttributes: GridProps = {
    direction: 'row',
    container: true,
    spacing: 3,
    justify: 'center',
};
