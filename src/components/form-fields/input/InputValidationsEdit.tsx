import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider } from '@material-ui/core';
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

    const getDefaultValues = () => {
        const validations: Validation[] = props.element.validations;
        if (!validations) {
            return {};
        }
        // const defaultValues = validations.map(validation => {
        //     let defaultValue;
        //     const param =
        //         validation.params.length === 0
        //             ? ''
        //             : validation.params.length > 1
        //             ? validation.params.pop()
        //             : validation.params[0];
        //     if (validation.type === 'required') {
        //         defaultValue = {
        //             [validation.type]: true,
        //             [`${validation.type}Param`]: param,
        //         };
        //         return defaultValue;
        //     }
        //     if (validation.type === 'email' || validation.type === 'url') {
        //         defaultValue = {
        //             type: validation.type,
        //             [`${validation.type}Param`]: param,
        //         };
        //         return defaultValue;
        //     }
        //     return {
        //         [validation.type]: validation.params[0],
        //         [`${validation.type}Param`]: param,
        //     };
        // });
        // console.log('default values: ', defaultValues);
        // return defaultValues;
    };

    const handleSave = (values: FormikValues) => {
        //todo: refactor
        console.log('values: ', values);

        //todo: refactor to map arguments on schema creation

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
                            <div style={{ display: 'flex', flexDirection: 'column', padding: 10 }}>
                                <Required disabledParam={!formProps.values.required} />
                                <Divider style={{ marginTop: 5, marginBottom: 5 }} />
                                <StringType disabledParam={formProps.values.type === 'text'} />
                                <Divider style={{ marginTop: 5, marginBottom: 5 }} />
                                <Max disabledParam={!formProps.values.max} />
                                <Divider style={{ marginTop: 5, marginBottom: 5 }} />
                                <Min disabledParam={!formProps.values.min} />
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
