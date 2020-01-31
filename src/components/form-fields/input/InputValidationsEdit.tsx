import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, FormLabel } from '@material-ui/core';
import { Formik, FormikValues } from 'formik';
import { ElementType, useStore } from '../../../store';
import { Max, MaxInitialValues } from '../../form-validations/Max';
import { Validation } from '../../../hooks/usePredefinedValidations';
import { Required, RequiredInitialValues } from '../../form-validations/Required';
import { StringType, StringTypeInitialValues } from '../../form-validations/StringType';
import { Min, MinInitialValues } from '../../form-validations/Min';

type ActionProps = {
    open: boolean;
    onClose: () => void;
    element: ElementType;
};

export const InputValidationsEdit: React.FC<ActionProps> = (props: ActionProps) => {
    const [, setValidations] = useStore(s => s, a => a.setFormElementValidations);
    const handleSave = (values: FormikValues) => {
        //todo: refactor
        console.log('values: ', values);
        let validations: Validation[] = [];
        Object.entries(values).forEach(([key, value]: [any, any]) => {
            if (!value) {
                return;
            }
            if (!key.includes('Param')) {
                let validation: Validation;
                if (key === 'type') {
                    validation = {
                        type: values[key],
                        params: [values[`${key}Param`]],
                    };
                } else {
                    validation = {
                        type: key,
                        params: [values[`${key}Param`]],
                    };
                    if (value && typeof value !== 'boolean') {
                        validation.params.unshift(value);
                    }
                }

                if (!(typeof value === 'boolean' && !value)) {
                    validations.push(validation);
                }
            }
        });
        setValidations(props.element.id, validations);
        props.onClose();
    };
    return (
        <Dialog open={props.open} onClose={props.onClose} aria-labelledby="edit-inputField-dialog">
            <DialogTitle id="form-dialog-title">Validations</DialogTitle>
            <Formik
                initialValues={{
                    ...MaxInitialValues(),
                    ...RequiredInitialValues(true),
                    ...StringTypeInitialValues(),
                    ...MinInitialValues(),
                    type: 'text',
                }}
                onSubmit={handleSave}
            >
                {formProps => (
                    <form onSubmit={formProps.handleSubmit} noValidate>
                        <DialogContent
                            dividers
                            style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}
                        >
                            <div style={{ display: 'flex', flexDirection: 'column', padding: 10 }}>
                                <Required />
                                <Divider style={{ marginTop: 5, marginBottom: 5 }} />
                                <StringType isErrorMessageDisabled={formProps.values.type === 'text'} />
                                <Divider style={{ marginTop: 5, marginBottom: 5 }} />
                                <Max />
                                <Divider style={{ marginTop: 5, marginBottom: 5 }} />
                                <Min />
                            </div>
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
