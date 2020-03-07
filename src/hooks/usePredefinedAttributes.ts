import { ElementTypes } from '../types/ElementTypes';
import { InputAttributes } from '../components/form-fields/input/Input';
import { Attributes } from '../utils/createFieldAttributesEditFields';

const inputAttributes: InputAttributes = {
    label: 'label',
    placeholder: 'placeholder',
    type: 'text',
    helperText: 'default helper text',
};
//
// const inputEditSchema: Attributes = [
//     { type: 'input', name: 'label', label: 'label' },
//     { type: 'input', name: 'placeholder', label: 'placeholder' },
//     { type: 'input', name: 'helperText', label: 'helperText' },
//     { type: 'select', name: 'type', label: 'type', options: ['text', 'password', 'email'] },
// ];
//todo: remove formElement from elementTypes
export const usePredefinedAttributes = () => {
    const attributes: Record<ElementTypes, object> = {
        [ElementTypes.INPUT]: inputAttributes,
        [ElementTypes.BUTTON]: {},
        [ElementTypes.FORMELEMENT]: {},
        [ElementTypes.CUSTOM]: {},
    };

    const editAttributes: Record<ElementTypes, Attributes> = {
        [ElementTypes.INPUT]: [],
        [ElementTypes.BUTTON]: [],
        [ElementTypes.FORMELEMENT]: [],
        [ElementTypes.CUSTOM]: [],
    };

    const getAttributesForType = (type: ElementTypes) => {
        return attributes[type];
    };

    const getEditSchemaForType = (type: ElementTypes) => {
        return editAttributes[type];
    };

    return { getAttributesForType, getEditSchemaForType };
};
