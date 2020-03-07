import { useStore } from '../store';
import { ElementTypes, FormElement } from '../types/ElementTypes';
import { uuid } from '../utils/uuid';
import { usePredefinedAttributes } from './usePredefinedAttributes';
import { usePredefinedValidations } from './usePredefinedValidations';
import { createValidationFieldSchema } from '../utils/createValidationSchema';

export const useForm = () => {
    const [elements, actions] = useStore(
        s => s.elements,
        a => a,
    );
    const { getAttributesForType } = usePredefinedAttributes();
    const { getValidationsForType } = usePredefinedValidations();

    const handlePreviewSubmit = () => {
        console.log(elements);
    };

    const createFormElement = (formElement: FormElement) => {
        const id = uuid();
        actions.addFormElement({
            id,
            label: formElement.label,
            type: formElement.type,
            validationType: formElement.validationType,
            editAttrsSchema: formElement.attributes,
            editable: formElement.editable,
            value: '',
            renderElement: formElement.renderComponent,
        });

        console.log('attrs: ', formElement.attributes);
        const attrs = formElement.attributes.reduce((accumulator, attrObj) => {
            return {
                ...accumulator,
                [attrObj.label]: attrObj.default,
            };
        }, {});
        console.log('after attrs: ', attrs);
        actions.setFormElementAttributes(id, attrs);
        actions.setFormElementValidations(id, getValidationsForType(formElement.type));
        // switch (type) {
        //     case ElementTypes.INPUT: {
        //         const id = uuid();
        //         actions.addFormElement({
        //             id,
        //             type,
        //             value: '',
        //             validationType: 'string',
        //         });
        //         actions.setFormElementAttributes(id, getAttributesForType(type));
        //         actions.setFormElementValidations(id, getValidationsForType(type));
        //         break;
        //     }
        //     default:
        //         return null;
        // }
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

    const resetValidations = (id: string) => {
        actions.setFormElementAttribute(id, 'error', undefined);
    };

    const isElementValidated = (id: string) => {
        const element = elements.find(el => el.id === id);
        return !element || element.error;
    };

    return { handlePreviewSubmit, createFormElement, validateFormElement, resetValidations, isElementValidated };
};
