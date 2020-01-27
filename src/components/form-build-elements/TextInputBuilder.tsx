import React from 'react';
import { FormElement } from '../../containers/form-element/FormElement';
import { EditOutlined } from '@material-ui/icons';
import { InputFields, TextInput, TextInputEditDialog } from '../form-fields/input';
import { useDialog } from '../../hooks/useDialog';
import { useTheme } from '@material-ui/core';

type Props = {
    id: string;
    index: number;
};

export const TextInputBuilder: React.FC<Props> = (props: Props) => {
    const [textElement, setTextElement] = React.useState<InputFields>({
        label: 'default label',
        placeholder: 'default placeholder',
        required: false,
    });
    const { open, handleOpen, handleClose } = useDialog(false);
    const theme = useTheme();

    const handleSaveClick = (payload: InputFields) => {
        setTextElement(payload);
        handleClose();
    };

    return (
        <div style={{ width: '100%', margin: 10 }}>
            <FormElement
                id={props.id}
                index={props.index}
                title={'Input field'}
                element={<TextInput {...textElement} />}
                actions={[
                    {
                        icon: <EditOutlined color={'action'} />,
                        name: 'Edit',
                        color: theme.palette.grey.A100,
                        onClick: handleOpen,
                    },
                ]}
            />
            <TextInputEditDialog open={open} onSave={handleSaveClick} onClose={handleClose} />
        </div>
    );
};
