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

export const InputEdit: React.FC<ActionProps> = (props: ActionProps) => {
    const [, setAttributes] = useStore(s => s, a => a.setFormElementAttributes);

    const handleSave = (attrValues: FormikValues) => {
        console.log(attrValues);
        setAttributes(props.element.id, attrValues);
        props.onClose();
    };
    return (
        <Dialog open={props.open} onClose={props.onClose} aria-labelledby="edit-inputField-dialog">
            <DialogTitle id="form-dialog-title">Edit input field</DialogTitle>
            <Formik initialValues={props.element.attributes} onSubmit={handleSave}>
                {formProps => (
                    <form onSubmit={formProps.handleSubmit} noValidate>
                        <DialogContent
                            dividers
                            style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
                        >
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
