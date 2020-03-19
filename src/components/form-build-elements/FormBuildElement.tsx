import React from 'react';
import { FormElement } from '../../containers/form-element/FormElement';
import { EditOutlined } from '@material-ui/icons';
import { useDialog } from '../../hooks/useDialog';
import { useTheme } from '@material-ui/core';
import { useStore } from '../../store';
import { ModalWithTabs } from '../../containers/modals/ModalWithTabs';
import { usePredefinedValidations } from '../../hooks/usePredefinedValidations';
import { FormikValues } from 'formik';

type Props = {
    id: string;
    index: number;
    attributes: FormikValues;
};

export const FormBuildElement: React.FC<Props> = (props: Props) => {
    const [elements] = useStore(s => s.elements);
    const { open, handleOpen, handleClose } = useDialog(false);
    const { getValidationSchemaForType } = usePredefinedValidations();
    const theme = useTheme();

    const element = elements.find(el => el.id === props.id);
    if (!element) {
        return null;
    }

    return (
        <div style={{ width: '100%', marginBottom: 10 }}>
            <FormElement
                id={props.id}
                index={props.index}
                title={element.label}
                element={<element.renderElement {...element.attributes} name={element.name} />}
                actions={
                    element.editable
                        ? [
                              {
                                  icon: <EditOutlined color={'action'} />,
                                  name: 'Edit',
                                  color: theme.palette.grey.A100,
                                  onClick: handleOpen,
                              },
                          ]
                        : undefined
                }
            />
            <ModalWithTabs
                open={open}
                onClose={handleClose}
                element={element}
                validations={getValidationSchemaForType(element.type)}
            />
        </div>
    );
};
