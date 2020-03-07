import React from 'react';
import { FormElement } from '../../containers/form-element/FormElement';
import { EditOutlined } from '@material-ui/icons';
import { TextInput } from '../form-fields/input';
import { useDialog } from '../../hooks/useDialog';
import { useTheme } from '@material-ui/core';
import { useStore } from '../../store';
import { ModalWithTabs } from '../../containers/modals/ModalWithTabs';
import { usePredefinedAttributes } from '../../hooks/usePredefinedAttributes';
import { usePredefinedValidations } from '../../hooks/usePredefinedValidations';

type Props = {
    id: string;
    index: number;
};

export const FormBuildElement: React.FC<Props> = (props: Props) => {
    const [elements, setAttr] = useStore(
        s => s.elements,
        a => a.setFormElementValue,
    );
    const { open, handleOpen, handleClose } = useDialog(false);
    const { getEditSchemaForType } = usePredefinedAttributes();
    const { getValidationSchemaForType } = usePredefinedValidations();
    const theme = useTheme();

    const element = elements.find(el => el.id === props.id);
    if (!element) {
        return null;
    }

    const handleBlur = (event: any) => {
        console.log('provadim', event.target);
        setAttr(element.id, event.target.value);
    };

    return (
        <div style={{ width: '100%', margin: 10 }}>
            <FormElement
                id={props.id}
                index={props.index}
                title={element.label}
                element={
                    <element.renderElement {...element.attributes} onBlur={handleBlur} errorMessage={element.error} />
                }
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
