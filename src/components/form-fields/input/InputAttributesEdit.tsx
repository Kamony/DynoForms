import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import { Formik, FormikValues } from 'formik';
import { ElementType, useStore } from '../../../store';
import { FormInput } from './FormInput';
import { FormSelect } from '../select/FormSelect';

type ActionProps = {
    open: boolean;
    onClose: () => void;
    element: ElementType;
};

export const InputAttributesEdit: React.FC<ActionProps> = (props: ActionProps) => {
    const [, setAttrs] = useStore(s => s, a => a.setFormElementAttributes);

    const handleSave = (attrValues: FormikValues) => {
        console.log(attrValues);
        setAttrs(props.element.id, attrValues);
        props.onClose();
    };
    return (
        <Dialog open={props.open} onClose={props.onClose} aria-labelledby="edit-inputField-dialog">
            <DialogTitle id="form-dialog-title">Input field attributes</DialogTitle>
            <Formik initialValues={props.element.attributes} onSubmit={handleSave}>
                {formProps => (
                    <form onSubmit={formProps.handleSubmit} noValidate>
                        <DialogContent
                            dividers
                            style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}
                        >
                            <div style={{ display: 'flex', flexDirection: 'column', padding: 10 }}>
                                <FormInput
                                    name={'label'}
                                    variant={'outlined'}
                                    label={'label'}
                                    style={{ paddingBottom: 10 }}
                                />
                                <FormInput
                                    name={'placeholder'}
                                    variant={'outlined'}
                                    label={'placeholder'}
                                    style={{ paddingBottom: 10 }}
                                />
                                <FormSelect
                                    name={'type'}
                                    label={'type'}
                                    variant={'outlined'}
                                    value={props.element.attributes.type}
                                    options={['text', 'password', 'email']}
                                />
                                <FormInput
                                    name={'helperText'}
                                    label={'helper text'}
                                    variant={'outlined'}
                                    value={props.element.attributes.helperText}
                                />
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
