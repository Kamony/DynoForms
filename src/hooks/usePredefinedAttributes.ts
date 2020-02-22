import { ElementTypes } from '../types/ElementTypes';
import { InputAttributes } from '../components/form-fields/input/Input';

const inputAttributes: InputAttributes = {
    label: 'label',
    placeholder: 'placeholder',
    type: 'text',
    helperText: 'default helper text',
};

export const usePredefinedAttributes = () => {
    const attributes: Record<ElementTypes, object> = {
        [ElementTypes.INPUT]: inputAttributes,
        [ElementTypes.BUTTON]: {},
        [ElementTypes.FORMELEMENT]: {},
    };

    const getAttributesForType = (type: ElementTypes) => {
        return attributes[type];
    };

    return { getAttributesForType };
};
