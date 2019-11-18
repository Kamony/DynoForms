import { DragObjectWithType } from 'react-dnd';
import { createStore } from 'react-simple-hook-store';

type ElementType = {
    id: string;
    type: DragObjectWithType;
};

type FormStoreType = {
    elements: ElementType[];
};

type FormActionsType = {
    addFormElement: (payload: ElementType) => void;
};

export const { useStore, store } = createStore<FormStoreType, FormActionsType>(
    {
        elements: [],
    },
    {
        addFormElement: (store, payload: ElementType) => {
            store.setState({
                elements: [...store.state.elements, payload],
            });
        },
    },
);
