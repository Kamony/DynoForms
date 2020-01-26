import React from 'react';
import { FormElement } from '../../containers/form-element/FormElement';
import { DeleteOutlined, EditOutlined, FileCopyOutlined } from '@material-ui/icons';
import { InputFields, TextInput, TextInputEditDialog } from '../form-fields/input';
import { useDialog } from '../../hooks/useDialog';
import { useStore } from '../../store';
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

    const [, storeActions] = useStore(undefined, a => a);

    const { open, handleOpen, handleClose } = useDialog(false);
    const theme = useTheme();

    const handleSaveClick = (payload: InputFields) => {
        setTextElement(payload);
        handleClose();
    };

    const handleDeleteClick = () => {
        console.log('wanna delete', props.id);
        storeActions.removeFormElement(props.id);
    };

    const handleCopyClick = () => {
        storeActions.copyFormElement(props.id);
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
                    {
                        icon: <FileCopyOutlined color={'action'} />,
                        name: 'Copy',
                        color: theme.palette.grey.A100,
                        onClick: handleCopyClick,
                    },
                    {
                        icon: <DeleteOutlined color={'error'} />,
                        name: 'Delete',
                        color: theme.palette.error.main,
                        onClick: handleDeleteClick,
                    },
                ]}
            />
            <TextInputEditDialog open={open} onSave={handleSaveClick} onClose={handleClose} />
        </div>
    );
};
