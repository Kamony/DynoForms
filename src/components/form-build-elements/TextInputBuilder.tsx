import React from 'react';
import { FormElement } from '../../containers/form-element/FormElement';
import { EditOutlined } from '@material-ui/icons';
import { InputAttributes, TextInput, InputEdit } from '../form-fields/input';
import { useDialog } from '../../hooks/useDialog';
import { useTheme } from '@material-ui/core';
import { useStore } from '../../store';

type Props = {
    id: string;
    index: number;
};

export const TextInputBuilder: React.FC<Props> = (props: Props) => {
    const [elements] = useStore(s => s.elements);
    // const [textElement, setTextElement] = React.useState<InputAttributes>(textInputInitialValues);
    const { open, handleOpen, handleClose } = useDialog(false);
    const theme = useTheme();

    const element = elements.find(el => el.id === props.id);
    const attributes = element ? element.attributes : {};

    const handleSaveClick = (payload: InputAttributes) => {
        // setTextElement(payload);
        handleClose();
    };

    return (
        <div style={{ width: '100%', margin: 10 }}>
            <FormElement
                id={props.id}
                index={props.index}
                title={'Input field'}
                element={<TextInput {...attributes} />}
                actions={[
                    {
                        icon: <EditOutlined color={'action'} />,
                        name: 'Edit',
                        color: theme.palette.grey.A100,
                        onClick: handleOpen,
                    },
                ]}
            />
            <InputEdit open={open} onClose={handleClose} element={element!} />
        </div>
    );
};
