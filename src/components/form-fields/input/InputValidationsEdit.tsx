import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Theme } from '@material-ui/core';
import { Formik, FormikValues } from 'formik';
import { ElementType, useStore } from '../../../store';
import { Max, MaxInitialValues } from '../../form-validations/Max';
import { Required, RequiredInitialValues } from '../../form-validations/Required';
import { StringType, StringTypeInitialValues } from '../../form-validations/StringType';
import { Min, MinInitialValues } from '../../form-validations/Min';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme: Theme) => ({
    formItem: {
        padding: theme.spacing(1),
    },
}));

type ActionProps = {
    open: boolean;
    onClose: () => void;
    element: ElementType;
};

export const InputValidationsEdit: React.FC<ActionProps> = (props: ActionProps) => {
    const [, setValidations] = useStore(s => s, a => a.setFormElementValidations);
    const classes = useStyles();

    const handleSave = (values: FormikValues) => {
        setValidations(props.element.id, values);
        props.onClose();
    };

    return (
        <Dialog open={props.open} onClose={props.onClose} aria-labelledby="edit-inputField-dialog">
            <DialogTitle id="form-dialog-title">Validations</DialogTitle>
            <Formik
                initialValues={{
                    ...MaxInitialValues,
                    ...RequiredInitialValues,
                    ...StringTypeInitialValues,
                    ...MinInitialValues,
                    ...props.element.validations,
                }}
                onSubmit={handleSave}
            >
                {formProps => (
                    <form onSubmit={formProps.handleSubmit} noValidate>
                        <DialogContent
                            dividers
                            style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}
                        >
                            <Grid container direction={'column'} spacing={1}>
                                <Grid item>
                                    <Required disabledParam={!formProps.values.required} />
                                </Grid>
                                <Grid item>
                                    <StringType disabledParam={formProps.values.type === 'text'} />
                                </Grid>
                                <Grid item>
                                    <Max disabledParam={!formProps.values.max} />
                                </Grid>
                                <Grid item>
                                    <Min disabledParam={!formProps.values.min} />
                                </Grid>
                            </Grid>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={props.onClose} color="primary">
                                Cancel
                            </Button>
                            <Button type={'submit'} color="primary">
                                Save
                            </Button>
                        </DialogActions>
                    </form>
                )}
            </Formik>
        </Dialog>
    );
};
