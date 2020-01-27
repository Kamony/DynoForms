import { DragObjectWithType } from 'react-dnd';

export type ElementType = DragObjectWithType & {
    id: string;
};

export interface IState {
    elements: ElementType[];
}
