import React from 'react';
import { FormElement } from '../../containers/form-element/FormElement';
import { Delete, Edit, FileCopy } from '@material-ui/icons';
import { InputFields, TextInput, TextInputEditDialog } from '../form-fields/input';
import { useDialog } from '../../hooks/useDialog';

type Props = {};

export const TextInputBuilder: React.FC<Props> = (props: Props) => {
    const [textElement, setTextElement] = React.useState<InputFields>({
        label: 'default label',
        placeholder: 'default placeholder',
        required: false,
    });

    const { open, handleOpen, handleClose } = useDialog(false);

    const handleSaveClick = (payload: InputFields) => {
        setTextElement(payload);
        handleClose();
    };

    return (
        <div style={{ width: '100%', margin: 10 }}>
            <FormElement
                title={'Input field'}
                element={<TextInput {...textElement} />}
                actions={[
                    {
                        icon: <Delete color={'secondary'} />,
                        name: 'Delete',
                        onClick: () => console.log('delete click'),
                    },
                    {
                        icon: <FileCopy color={'secondary'} />,
                        name: 'Copy',
                        onClick: () => console.log('copy click'),
                    },
                    { icon: <Edit color={'secondary'} />, name: 'Edit', onClick: () => handleOpen() },
                ]}
            />
            <TextInputEditDialog open={open} onSave={handleSaveClick} onClose={handleClose} />
        </div>
    );
};
