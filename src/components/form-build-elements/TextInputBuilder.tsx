import React from 'react';
import { FormElement } from '../../containers/form-element/FormElement';
import { EditOutlined, TuneOutlined } from '@material-ui/icons';
import { TextInput } from '../form-fields/input';
import { useDialog } from '../../hooks/useDialog';
import { useTheme } from '@material-ui/core';
import { useStore } from '../../store';
import { ModalWithTabs } from '../../containers/modals/ModalWithTabs';

type Props = {
    id: string;
    index: number;
};

export const TextInputBuilder: React.FC<Props> = (props: Props) => {
    const [elements, setAttr] = useStore(s => s.elements, a => a.setFormElementValue);
    const { open, handleOpen, handleClose } = useDialog(false);

    const theme = useTheme();

    const element = elements.find(el => el.id === props.id);

    if (!element) {
        return null;
    }

    const attributes = element.attributes;

    const handleBlur = (event: any) => {
        setAttr(element.id, event.target.value);
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
                        icon: <EditOutlined color={'action'} />,
                        name: 'Edit Field',
                        color: theme.palette.grey.A100,
                        onClick: handleOpen,
                    },
                ]}
            />
            <ModalWithTabs open={open} onClose={handleClose} element={element} />
        </div>
    );
};
