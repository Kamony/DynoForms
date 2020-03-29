import { ElementType, useStore } from '../../store';
import { Formik, FormikValues } from 'formik';
import { Button, createStyles, Grid, makeStyles, Paper, Theme, Typography } from '@material-ui/core';
import { ValuesContextReporter } from '../../components/form-fields/ValuesContextReporter';
import React from 'react';
import { Attribute, getAttributeEditField } from '../../utils/createFieldAttributesEditFields';
import { isEqual } from '../../utils/helpers';
import { useNameGenerator } from '../../hooks/useNameGenerator';

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
    const generateName = useNameGenerator();
    const classes = useStyles();

    const handleSave = async (attrValues: FormikValues) => {
        actions.setFormElementAttributes(props.element.id, attrValues);
        //generate human readable name
        if (attrValues.label) {
            actions.setFormElementAttribute(props.element.id, 'name', generateName(attrValues.label));
        }
        setValuesSnapshot(attrValues);
    };

    const onValueChange = (values: FormikValues) => {
        setAttrValues(values);
    };

    const isValueEditing = () => !isEqual(attrValues, valuesSnapshot);

    return (
        <>
            <Formik initialValues={props.element.attributes} onSubmit={handleSave}>
                {formProps => {
                    return (
                        <form onSubmit={formProps.handleSubmit} noValidate>
                            <Paper className={classes.previewContainer} color={'grey'} variant={'outlined'}>
                                <Typography color={'textPrimary'}>Preview</Typography>
                                <props.element.renderElement {...formProps.values} name={'options'} readOnly={true} />
                            </Paper>
                            <Grid item container direction={'column'} spacing={2}>
                                {props.element.editAttrsSchema!.map((attribute: Attribute) => (
                                    <Grid item key={attribute.name}>
                                        {getAttributeEditField(attribute)}
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
                    );
                }}
            </Formik>
        </>
    );
};
