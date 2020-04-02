import { useStore } from '../store';
import { FormElement } from '../types/ElementTypes';
import { uuid } from '../utils/uuid';
import { usePredefinedValidations } from './usePredefinedValidations';
import { createValidationFieldSchema, createValidationSchemaFromObject } from '../utils/createValidationSchema';
import { useNameGenerator } from './useNameGenerator';
import { Attribute } from '../utils/createFieldAttributesEditFields';
import { object } from 'yup';

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

        const attributeInitial = formElement.attributes.find((attr: Attribute) => attr.isInitial);

        const attrs = formElement.attributes.reduce((accumulator, attrObj) => {
            return {
                ...accumulator,
                [attrObj.name]: attrObj.default,
            };
        }, {});

        actions.addFormElement({
            id,
            label: formElement.label,
            name: generateName(formElement.label),
            type: formElement.type,
            validationType: formElement.validationType,
            editAttrsSchema: formElement.attributes,
            initialValue: (attributeInitial && attributeInitial.name) || '',
            editable: formElement.editable,
            renderElement: formElement.renderComponent,
            attributes: attrs,
            validationsSchema: formElement.validationSchema,
        });
    };

    const getInitialValues = () => {
        return elements.reduce((accumulator, element) => {
            return {
                ...accumulator,
                [element.name]: element.initialValue !== '' ? element.attributes[element.initialValue] : '',
            };
        }, {});
    };

    const getValidationSchema = () => {
        let validations: any = {};
        elements.forEach(el => {
            validations = { ...validations, [el.name]: { values: el.validations, type: el.validationType } };
        });
        console.log({ validations });
        let schemaObject = {};
        // validations.forEach((validation: any) => {
        //     console.log('each ', validation);
        //     schemaObject = {
        //         ...schemaObject,
        //         ...createValidationFieldSchema(validation.values, validation.type),
        //     };
        // });
        console.log('object entries: ', Object.entries(validations));
        Object.entries(validations).forEach((entry: any) => {
            schemaObject = {
                ...schemaObject,
                [entry[0]]: createValidationFieldSchema(entry[1].values, entry[1].type),
            };
        });
        console.log({ schemaObject });
        return createValidationSchemaFromObject(schemaObject);
    };

    const validateFormElement = async (id: string) => {
        const element = elements.find(el => el.id === id);
        if (!element) {
            return;
        }
        const schema = createValidationFieldSchema(element.validations, element.validationType);
        if (!schema) {
            return;
        }
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
        getInitialValues,
        getValidationSchema,
    };
};
