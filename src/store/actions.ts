import { ElementType, IState } from './store';
import { StoreActions } from 'react-simple-hook-store';
import {uuid} from "../utils/uuid";

export type IActions = {
    addFormElement: (element: ElementType) => void;
    removeFormElement: (id: string) => void;
    copyFormElement: (id: string) => void;
};

export const actions: StoreActions<IState, IActions> = {
    addFormElement: (store, payload: ElementType) => {
        store.setState({
            elements: [...store.state.elements, payload],
        });
    },
    removeFormElement: (store, id) => {
        store.setState({
            elements: store.state.elements.filter(el => el.id !== id),
        });
    },
    copyFormElement: (store, id) => {
        const newElement: ElementType = {
            id: uuid(),
            type: store.state.elements.find(el => el.id === id)!.type,
        };
        actions.addFormElement(store, newElement);
    },
};
