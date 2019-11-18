import React from 'react';
import { FormElement } from '../../containers/form-element/FormElement';
import { Delete, Edit, FileCopy } from '@material-ui/icons';
import { InputFields, TextInput, TextInputEditDialog } from '../form-fields/input';
import { useDialog } from '../../hooks/useDialog';
import {useStore} from "../../store";

type Props = {
    id: string;
};

export const TextInputBuilder: React.FC<Props> = (props: Props) => {
    const [textElement, setTextElement] = React.useState<InputFields>({
        label: 'default label',
        placeholder: 'default placeholder',
        required: false,
    });

    const [, storeActions] = useStore(undefined, a => a);

    const { open, handleOpen, handleClose } = useDialog(false);

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
                title={'Input field'}
                element={<TextInput {...textElement} />}
                actions={[
                    {
                        icon: <Delete color={'secondary'} />,
                        name: 'Delete',
                        onClick: handleDeleteClick,
                    },
                    {
                        icon: <FileCopy color={'secondary'} />,
                        name: 'Copy',
                        onClick: handleCopyClick,
                    },
                    { icon: <Edit color={'secondary'} />, name: 'Edit', onClick: handleOpen },
                ]}
            />
            <TextInputEditDialog open={open} onSave={handleSaveClick} onClose={handleClose} />
        </div>
    );
};
