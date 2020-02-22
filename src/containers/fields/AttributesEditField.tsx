import { ElementType, useStore } from '../../store';
import { Formik, FormikValues } from 'formik';
import { Button, createStyles, Grid, makeStyles, Theme, Box, Paper, Typography, Divider } from '@material-ui/core';
import { FormInput, TextInput } from '../../components/form-fields/input';
import { inputCommonAttributes } from '../../components/form-validations/common';
import { FormSelect } from '../../components/form-fields/select/FormSelect';
import { ValuesContextReporter } from '../../components/form-fields/ValuesContextReporter';
import React from 'react';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        previewContainer: {
            padding: theme.spacing(2),
            display: 'flex',
            height: '100%',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
        },
        divider: {
            marginBottom: theme.spacing(2),
        },
    }),
);

type AttributesEditFieldProps = {
    element: ElementType;
};
export const AttributesEditField = (props: AttributesEditFieldProps) => {
    const [, setAttrs] = useStore(s => s, a => a.setFormElementAttributes);
    const [attrValues, setAttrValues] = React.useState(props.element.attributes);
    const classes = useStyles();

    const handleSave = (attrValues: FormikValues) => {
        console.log(attrValues);
        setAttrs(props.element.id, attrValues);
    };

    const onValueChange = (values: FormikValues) => {
        setAttrValues(values);
    };

    return (
        <>
            <Paper className={classes.previewContainer} color={'grey'}>
                <Typography color={'textPrimary'}>Preview</Typography>
                <TextInput
                    {...attrValues}
                    InputLabelProps={{ shrink: true }}
                    InputProps={{
                        readOnly: true,
                    }}
                />
            </Paper>
            <Divider />
            <Formik initialValues={props.element.attributes} onSubmit={handleSave}>
                {formProps => (
                    <form onSubmit={formProps.handleSubmit} noValidate>
                        <Grid item container direction={'column'} spacing={1}>
                            <Grid item>
                                <FormInput {...inputCommonAttributes} name={'label'} label={'label'} fullWidth />
                            </Grid>
                            <Grid item>
                                <FormInput
                                    {...inputCommonAttributes}
                                    name={'placeholder'}
                                    label={'placeholder'}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item>
                                <FormSelect
                                    {...inputCommonAttributes}
                                    name={'type'}
                                    label={'type'}
                                    options={['text', 'password', 'email']}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item>
                                <FormInput
                                    {...inputCommonAttributes}
                                    name={'helperText'}
                                    label={'helper text'}
                                    fullWidth
                                />
                            </Grid>
                            <Button type={'submit'} color="primary">
                                Save Attributes
                            </Button>
                        </Grid>
                        <ValuesContextReporter onValueChange={onValueChange} />
                    </form>
                )}
            </Formik>
        </>
    );
};
