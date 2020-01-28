import { useStore } from '../store';
import { ElementTypes } from '../types/ElementTypes';
import { uuid } from '../utils/uuid';
import { usePredefinedAttributes } from './usePredefinedAttributes';

export const useForm = () => {
    const [elements, actions] = useStore(s => s.elements, a => a);
    const { getAttributesForType } = usePredefinedAttributes();

    const handlePreviewSubmit = () => {
        console.log(elements);
    };

    const createFormElement = (type: ElementTypes) => {
        switch (type) {
            case ElementTypes.INPUT: {
                const id = uuid();
                actions.addFormElement({ id, type });
                actions.setFormElementAttributes(id, getAttributesForType(type));
                break;
            }
            default:
                return null;
        }
    };

    return { handlePreviewSubmit, createFormElement };
};
