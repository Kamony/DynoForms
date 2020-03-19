import { ElementType, useStore } from '../store';
import { FormElement } from '../types/ElementTypes';
import { uuid } from '../utils/uuid';
import { usePredefinedValidations } from './usePredefinedValidations';
import { createValidationFieldSchema } from '../utils/createValidationSchema';
import { useNameGenerator } from './useNameGenerator';

export const useForm = () => {
    const [elements, actions] = useStore(
        s => s.elements,
        a => a,
    );
    const { getValidationsForType } = usePredefinedValidations();
    const generateName = useNameGenerator();
    const handlePreviewSubmit = () => {
        console.log(elements);
    };

    const createFormElement = (formElement: FormElement) => {
        const id = uuid();
        actions.addFormElement({
            id,
            label: formElement.label,
            name: generateName(formElement.label),
            initialValue: formElement.initialValue,
            type: formElement.type,
            validationType: formElement.validationType,
            editAttrsSchema: formElement.attributes,
            editable: formElement.editable,
            renderElement: formElement.renderComponent,
        });

        const attrs = formElement.attributes.reduce((accumulator, attrObj) => {
            return {
                ...accumulator,
                [attrObj.name]: attrObj.default,
            };
        }, {});

        actions.setFormElementAttributes(id, attrs);
        actions.setFormElementValidations(id, getValidationsForType(formElement.type));
    };

    const getFormElementInitialValues = (formElement: FormElement | ElementType) => {
        const initialAttrs = formElement.attributes.reduce((accumulator: any, attrObj: any) => {
            return {
                ...accumulator,
                [attrObj.name]: attrObj.default,
            };
        }, {});
        return initialAttrs;
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

    return {
        handlePreviewSubmit,
        createFormElement,
        validateFormElement,
        resetValidations,
        isElementValidated,
        getFormElementInitialValues,
    };
};
