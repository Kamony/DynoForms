import { ElementType, IState } from './store';
import { StoreActions } from 'react-simple-hook-store';
import { uuid } from '../utils/uuid';
import { FormikValues } from 'formik';

export type IActions = {
    addFormElement: (element: ElementType) => void;
    addFormElementAtIndex: (element: ElementType, index: number) => void;
    removeFormElement: (id: string) => void;
    copyFormElement: (id: string) => void;
    swapFormElements: (elementIndex: number, newPositionIndex: number) => void;
    setFormElementAttributes: (id: string, attrs: FormikValues) => void;
    setFormElementOptions: (id: string, options: any) => void;
    setFormElementValidations: (id: string, validations: FormikValues) => void;
    setFormElementValue: (id: string, value: any) => void;
    setFormElementAttribute: <T extends keyof ElementType>(id: string, attribute: T, value: ElementType[T]) => void;
    resetValidations: (id: string) => void;
};

export const actions: StoreActions<IState, IActions> = {
    addFormElement: (store, element) => {
        store.setState({
            elements: [...store.state.elements, element],
        });
    },
    addFormElementAtIndex: (store, payload, index) => {
        const elements = [...store.state.elements];
        elements.splice(index, 0, payload);
        store.setState({
            elements: elements,
        });
    },
    removeFormElement: (store, id) => {
        store.setState({
            elements: store.state.elements.filter(el => el.id !== id),
        });
    },
    copyFormElement: (store, id) => {
        const duplicateElement = store.state.elements.find(el => el.id === id);
        const index = store.state.elements.findIndex(el => el.id === id);
        if (duplicateElement) {
            const newElement: ElementType = {
                ...duplicateElement,
                id: uuid(),
            };
            actions.addFormElementAtIndex(store, newElement, index + 1);
        }
    },
    swapFormElements: (store, oldIndex, newIndex) => {
        const elements = [...store.state.elements];
        elements[oldIndex] = elements.splice(newIndex, 1, elements[oldIndex])[0];
        store.setState({
            elements: elements,
        });
    },
    setFormElementAttributes: (store, id, attrs) => {
        const elements = [...store.state.elements];
        const element = elements.find(el => el.id === id);
        const elementId = elements.findIndex(el => el.id === id);
        if (!element) {
            return null;
        }
        const updatedElement = {
            ...element,
            attributes: { ...attrs },
        };
        elements.splice(elementId, 1, updatedElement);
        store.setState({
            elements: elements,
        });
    },
    setFormElementOptions: (store, id, options) => {
        const elements = [...store.state.elements];
        const element = elements.find(el => el.id === id);
        const elementId = elements.findIndex(el => el.id === id);
        if (!element) {
            return null;
        }
        const updatedElement = {
            ...element,
            options: [...options],
        };
        elements.splice(elementId, 1, updatedElement);
        store.setState({
            elements: elements,
        });
    },
    setFormElementValidations: (store, id, validations) => {
        const elements = [...store.state.elements];
        const element = elements.find(el => el.id === id);
        const elementId = elements.findIndex(el => el.id === id);
        if (!element) {
            return null;
        }
        const updatedElement = {
            ...element,
            attributes: {
                ...element.attributes,
                ...{ required: validations.required },
            },
            validations: { ...validations },
        };
        elements.splice(elementId, 1, updatedElement);
        store.setState({
            elements: elements,
        });
    },
    setFormElementValue: (store, id, value) => {
        const elements = [...store.state.elements];
        const element = elements.find(el => el.id === id);
        const elementId = elements.findIndex(el => el.id === id);
        if (!element) {
            return null;
        }
        const updatedElement = {
            ...element,
            value: value,
        };
        elements.splice(elementId, 1, updatedElement);
        store.setState({
            elements: elements,
        });
    },
    setFormElementAttribute: (store, id, attribute, value) => {
        const elements = [...store.state.elements];
        const element = elements.find(el => el.id === id);
        const elementId = elements.findIndex(el => el.id === id);
        if (!element) {
            return null;
        }
        const updatedElement = {
            ...element,
            [attribute]: value,
        };
        elements.splice(elementId, 1, updatedElement);
        store.setState({
            elements: elements,
        });
    },
    resetValidations: (store, id) => {
        const element = store.state.elements.find(el => el.id === id);
        if (!element || !element.error) {
            return null;
        }
        actions.setFormElementAttribute(store, id, 'error', '');
    },
};
