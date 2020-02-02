import React from 'react';
import { FormElement } from '../../containers/form-element/FormElement';
import { EditOutlined, TuneOutlined } from '@material-ui/icons';
import { InputAttributesEdit, TextInput } from '../form-fields/input';
import { useDialog } from '../../hooks/useDialog';
import { useTheme } from '@material-ui/core';
import { useStore } from '../../store';
import { InputValidationsEdit } from '../form-fields/input/InputValidationsEdit';

type Props = {
    id: string;
    index: number;
};

export const TextInputBuilder: React.FC<Props> = (props: Props) => {
    const [elements, setAttr] = useStore(s => s.elements, a => a.setFormElementValue);
    const { open, handleOpen, handleClose } = useDialog(false);
    const { open: openValidations, handleOpen: handleOpenValidations, handleClose: handleCloseValidations } = useDialog(
        false,
    );
    const theme = useTheme();

    const element = elements.find(el => el.id === props.id);

    if (!element) {
        return null;
    }

    const attributes = element.attributes;

    const handleBlur = (value: string) => {
        setAttr(element.id, value);
    };

    return (
        <div style={{ width: '100%', margin: 10 }}>
            <FormElement
                id={props.id}
                index={props.index}
                title={'Input field'}
                element={<TextInput {...attributes} onBlur={handleBlur} errorMessage={element.error} />}
                actions={[
                    {
                        icon: <TuneOutlined color={'action'} />,
                        name: 'Set Validations',
                        color: theme.palette.grey.A100,
                        onClick: handleOpenValidations,
                    },
                    {
                        icon: <EditOutlined color={'action'} />,
                        name: 'Edit Attributes',
                        color: theme.palette.grey.A100,
                        onClick: handleOpen,
                    },
                ]}
            />
            <InputAttributesEdit open={open} onClose={handleClose} element={element!} />
            <InputValidationsEdit open={openValidations} onClose={handleCloseValidations} element={element!} />
        </div>
    );
};
