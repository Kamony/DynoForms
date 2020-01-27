import { ElementType, IState } from './store';
import { StoreActions } from 'react-simple-hook-store';
import { uuid } from '../utils/uuid';

export type IActions = {
    addFormElement: (element: ElementType) => void;
    addFormElementAtIndex: (element: ElementType, index: number) => void;
    removeFormElement: (id: string) => void;
    copyFormElement: (id: string) => void;
    swapFormElements: (elementIndex: number, newPositionIndex: number) => void;
};

export const actions: StoreActions<IState, IActions> = {
    addFormElement: (store, payload: ElementType) => {
        store.setState({
            elements: [...store.state.elements, payload],
        });
    },
    addFormElementAtIndex: (store, payload: ElementType, index: number) => {
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
};
