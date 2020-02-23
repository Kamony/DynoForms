import { ElementType, useStore } from '../../store';
import { Formik, FormikValues } from 'formik';
import { Button, createStyles, Grid, makeStyles, Paper, Theme, Typography } from '@material-ui/core';
import { TextInput } from '../../components/form-fields/input';
import { ValuesContextReporter } from '../../components/form-fields/ValuesContextReporter';
import React from 'react';
import { Attributes, getAttributeEditField } from '../../utils/createFieldAttributesEditFields';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        previewContainer: {
            padding: theme.spacing(2),
            marginBottom: theme.spacing(2),
            display: 'flex',
            height: '100%',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
        },
    }),
);

type AttributesEditFieldProps = {
    element: ElementType;
    attributes: Attributes;
};
export const AttributesEditField = (props: AttributesEditFieldProps) => {
    const [, setAttrs] = useStore(
        s => s,
        a => a.setFormElementAttributes,
    );
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
            <Formik initialValues={props.element.attributes} onSubmit={handleSave}>
                {formProps => (
                    <form onSubmit={formProps.handleSubmit} noValidate>
                        <Grid item container direction={'column'} spacing={1}>
                            {props.attributes.map(attribute => (
                                <Grid item key={attribute.name}>
                                    {getAttributeEditField(attribute)}
                                </Grid>
                            ))}
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
