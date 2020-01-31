import { useStore } from '../store';
import { ElementTypes } from '../types/ElementTypes';
import { uuid } from '../utils/uuid';
import { usePredefinedAttributes } from './usePredefinedAttributes';
import { usePredefinedValidations } from './usePredefinedValidations';
import { createValidationFieldSchema } from '../utils/createValidationSchema';

export const useForm = () => {
    const [elements, actions] = useStore(s => s.elements, a => a);
    const { getAttributesForType } = usePredefinedAttributes();
    const { getValidationsForType } = usePredefinedValidations();

    const handlePreviewSubmit = () => {
        console.log(elements);
    };

    const createFormElement = (type: ElementTypes) => {
        switch (type) {
            case ElementTypes.INPUT: {
                const id = uuid();
                actions.addFormElement({ id, type, value: '', validationType: 'string' });
                actions.setFormElementAttributes(id, getAttributesForType(type));
                actions.setFormElementValidations(id, getValidationsForType(type));
                break;
            }
            default:
                return null;
        }
    };

    const validateFormElement = async (id: string) => {
        const element = elements.find(el => el.id === id);
        if (!element) {
            return;
        }
        const schema = createValidationFieldSchema(element.validations, element.validationType);
        const isValid = await schema.isValid(element.value);
        const errors = await schema.validate(element.value).catch((e: Error) => e.message);

        actions.setFormElementAttribute(id, 'error', isValid ? undefined : errors);
    };

    //todo: validate whole form - for review

    return { handlePreviewSubmit, createFormElement, validateFormElement };
};
