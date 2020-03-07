import { ElementType, useStore } from '../../store';
import { Formik, FormikValues } from 'formik';
import { Button, createStyles, Grid, makeStyles, Paper, Theme, Typography } from '@material-ui/core';
import { TextInput } from '../../components/form-fields/input';
import { ValuesContextReporter } from '../../components/form-fields/ValuesContextReporter';
import React from 'react';
import { Attribute, getAttributeEditField } from '../../utils/createFieldAttributesEditFields';

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
};
export const AttributesEditField = (props: AttributesEditFieldProps) => {
    const [, actions] = useStore(
        s => s,
        a => a,
    );
    const [attrValues, setAttrValues] = React.useState(props.element.attributes);
    const [valuesSnapshot, setValuesSnapshot] = React.useState<FormikValues>();
    const [options, setOptions] = React.useState([]);
    const classes = useStyles();

    const handleSave = (attrValues: FormikValues) => {
        console.log(attrValues);
        actions.setFormElementAttributes(props.element.id, attrValues);
        actions.setFormElementOptions(props.element.id, options);
        setValuesSnapshot(attrValues);
    };

    const onValueChange = (values: FormikValues) => {
        setAttrValues(values);
    };

    const isValueEditing = () => valuesSnapshot !== attrValues;
    return (
        <>
            <Paper className={classes.previewContainer} color={'grey'} variant={'outlined'}>
                <Typography color={'textPrimary'}>Preview</Typography>
                <props.element.renderElement {...attrValues} />
            </Paper>
            <Formik initialValues={props.element.attributes} onSubmit={handleSave}>
                {formProps => (
                    <form onSubmit={formProps.handleSubmit} noValidate>
                        <Grid item container direction={'column'} spacing={1}>
                            {props.element.editAttrsSchema!.map((attribute: Attribute) => (
                                <Grid item key={attribute.name}>
                                    {getAttributeEditField(
                                        attribute,
                                        attribute.type === 'options'
                                            ? {
                                                  onOptions: (options: any) => {
                                                      setOptions(options);
                                                  },
                                              }
                                            : {},
                                    )}
                                </Grid>
                            ))}
                            <Grid item xs={12}>
                                <Button
                                    fullWidth={true}
                                    type={'submit'}
                                    color="secondary"
                                    variant={'outlined'}
                                    disabled={!isValueEditing()}
                                    data-cy={'apply-attributes-button'}
                                >
                                    {isValueEditing() ? 'Apply Attributes' : 'Applied!'}
                                </Button>
                            </Grid>
                        </Grid>
                        <ValuesContextReporter onValueChange={onValueChange} />
                    </form>
                )}
            </Formik>
        </>
    );
};
