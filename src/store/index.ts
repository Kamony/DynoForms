import { IState } from './store';
import { createStore } from 'react-simple-hook-store';
import { actions } from './actions';

const initialState: IState = {
    elements: [],
};

export const { useStore, store } = createStore(initialState, actions);

export * from './actions';
export * from './store';
